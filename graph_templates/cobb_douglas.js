window.graphTemplates = window.graphTemplates || {};
window.graphTemplates.cobb_douglas = {
    name: 'Cobb-Douglas & Optimization',
    xaxis: 'Labor (L)', yaxis: 'Capital (K)',
    generateHTML: () => `
        <div class="control-group">
            <div class="control-group-title">Prod. Func: Q = A·L<sup>α</sup>·K<sup>β</sup></div>
            <div class="input-row"><label>A:</label><input type="number" class="param" data-param="a" value="10" step="1"></div>
            <div class="input-row"><label>α (alpha):</label><input type="number" class="param" data-param="alpha" value="0.5" step="0.1"></div>
            <div class="input-row"><label>β (beta):</label><input type="number" class="param" data-param="beta" value="0.5" step="0.1"></div>
        </div>
        <div class="control-group">
            <div class="control-group-title">Budget: C = wL + rK</div>
            <div class="input-row"><label>Cost (C):</label><input type="number" class="param" data-param="cost" value="1000"></div>
            <div class="input-row"><label>Wage (w):</label><input type="number" class="param" data-param="w" value="20"></div>
            <div class="input-row"><label>Rate (r):</label><input type="number" class="param" data-param="r" value="30"></div>
        </div>
        <div class="control-group"><div class="output-div" id="cd-output"></div></div>`,
    plot: (params, outputEl) => {
        const { a, alpha, beta, cost, w, r } = params;
        if (!a || !alpha || !beta || !cost || !w || !r || alpha + beta === 0) {
            outputEl.innerHTML = `<b>Invalid parameters.</b> All values must be non-zero.`;
            return [];
        }
        const traces = [];

        const l_opt = (cost / w) * (alpha / (alpha + beta));
        const k_opt = (cost / r) * (beta / (alpha + beta));
        const q_opt = a * Math.pow(l_opt, alpha) * Math.pow(k_opt, beta);

        const max_l = (cost / w) * 1.2;
        const max_k = (cost / r) * 1.2;
        const l_values = Array.from({length: 50}, (_, i) => max_l * i / 49);
        const k_values = Array.from({length: 50}, (_, i) => max_k * i / 49);
        
        const z_grid = k_values.map(k => l_values.map(l => (l>0 && k>0) ? a * Math.pow(l, alpha) * Math.pow(k, beta) : 0));
        
        traces.push({
            x: l_values, y: k_values, z: z_grid,
            type: 'contour',
            colorscale: 'Cividis',
            showscale: false,
            name: 'Isoquants',
            contours: { coloring: 'lines', start: q_opt / 4, end: q_opt * 1.5, size: q_opt / 4, labelfont: { color: 'white' } }
        });

        traces.push({
            x: [0, cost/w], y: [cost/r, 0],
            mode: 'lines', name: 'Isocost', line: { color: '#D62728', width: 2.5 }
        });

        if (l_opt > 0 && k_opt > 0) {
            traces.push({
                x: [l_opt], y: [k_opt], mode: 'markers', name: 'Optimal Bundle',
                marker: { size: 14, color: '#76FF03', symbol: 'star' }
            });
            outputEl.innerHTML = `<b>Optimal Bundle (Lagrange Solution):</b><br>Labor (L*): ${l_opt.toFixed(2)}<br>Capital (K*): ${k_opt.toFixed(2)}<br>Max Quantity (Q*): ${q_opt.toFixed(2)}`;
        } else {
            outputEl.innerHTML = `<b>No valid optimum found.</b>`;
        }

        return traces;
    }
};
