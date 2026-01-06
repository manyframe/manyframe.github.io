document.addEventListener('DOMContentLoaded', () => {
    const sidebarList = document.querySelector('.sidebar ul');
    const contentGrid = document.querySelector('.card-grid');
    const categoryTitle = document.querySelector('.content h1');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const mobileNavTitle = document.querySelector('.mobile-nav-title');

    let data;

    // Fetch data and initialize the app
    async function initializeApp() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            data = await response.json();
            
            populateSidebar(data.categories);
            // Load the first category by default
            if (data.categories.length > 0) {
                loadCategory(data.categories[0]);
                updateActiveLink(data.categories[0].name);
            }
        } catch (error) {
            console.error("Could not load data:", error);
            contentGrid.innerHTML = '<p>Error loading content. Please try again later.</p>';
        }
    }

    // Populate the sidebar with categories
    function populateSidebar(categories) {
        sidebarList.innerHTML = ''; // Clear existing items
        categories.forEach(category => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = category.name;
            a.href = '#';
            a.dataset.category = category.name;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                loadCategory(category);
                updateActiveLink(category.name);
                if (sidebar.classList.contains('open')) {
                    sidebar.classList.remove('open');
                }
            });
            li.appendChild(a);
            sidebarList.appendChild(li);
        });
    }

    // Load items for a specific category
    function loadCategory(category) {
        categoryTitle.textContent = category.name;
        mobileNavTitle.textContent = category.name;
        contentGrid.innerHTML = ''; // Clear existing cards

        if (category.items.length === 0) {
            contentGrid.innerHTML = '<p>No items in this category.</p>';
            return;
        }

        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            // Add size class if specified
            if (item.size && item.size > 1 && item.size <= 3) {
                card.classList.add(`size-${item.size}`);
            }

            card.style.backgroundImage = `url('${item.image}')`;

            const info = document.createElement('div');
            info.className = 'card-info';

            const title = document.createElement('span');
            title.className = 'card-title';
            title.textContent = item.title;

            const button = document.createElement('a');
            button.className = 'card-button';
            button.textContent = 'View';
            button.href = item.href;

            info.appendChild(title);
            info.appendChild(button);
            card.appendChild(info);
            contentGrid.appendChild(card);
        });
    }
    
    // Update active link in sidebar
    function updateActiveLink(categoryName) {
        document.querySelectorAll('.sidebar a').forEach(link => {
            link.classList.remove('active');
            if(link.dataset.category === categoryName) {
                link.classList.add('active');
            }
        });
    }

    // Toggle mobile menu
    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Initialize
    initializeApp();
});