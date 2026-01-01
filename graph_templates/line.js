window.graphTemplates = window.graphTemplates || {};
window.graphTemplates.line = {
    name: 'Line Plot',
    xaxis: 'x', yaxis: 'y',
    generateHTML: () => `
        <div class="control-group">
            <div class="control-group-title">Line: y = kx + c</div>
            <div class="input-row"><label>Slope (k):</label><input type="number" class="param" data-param="k" value="2" step="0.1"></div>
            <div class="input-row"><label>Y-Intercept (c):</label><input type="number" class="param" data-param="c" value="5" step="0.1"></div>
        </div>`,
    plot: (params) => {
        const { k, c } = params;
        const x = Array.from({ length: 201 }, (_, i) => -10 + i * 0.1);
        const y = x.map(val => k * val + c);
        return [{ x, y, mode: 'lines', name: `y = ${k}x + ${c}` }];
    }
};
