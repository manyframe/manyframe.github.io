window.graphTemplates = window.graphTemplates || {};
window.graphTemplates.parabola = {
    name: 'Parabola Plot',
    xaxis: 'x', yaxis: 'y',
    generateHTML: () => `
        <div class="control-group">
            <div class="control-group-title">Parabola: y = ax² + bx + c</div>
            <div class="input-row"><label>a:</label><input type="number" class="param" data-param="a" value="1" step="0.1"></div>
            <div class="input-row"><label>b:</label><input type="number" class="param" data-param="b" value="-5" step="0.1"></div>
            <div class="input-row"><label>c:</label><input type="number" class="param" data-param="c" value="6" step="0.1"></div>
        </div>`,
    plot: (params) => {
        const { a, b, c } = params;
        const x = Array.from({ length: 201 }, (_, i) => -10 + i * 0.1);
        const y = x.map(val => a * val * val + b * val + c);
        return [{ x, y, mode: 'lines', name: `y = ${a}x² + ${b}x + ${c}` }];
    }
};
