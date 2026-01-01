window.graphTemplates = window.graphTemplates || {};
window.graphTemplates.supply_demand = {
    name: 'Supply & Demand Model',
    xaxis: 'Quantity (Q)', yaxis: 'Price (P)',
    generateHTML: () => `
        <div class="control-group">
            <div class="control-group-title">Demand: P = a - bQ</div>
            <div class="input-row"><label>Intercept (a):</label><input type="number" class="param" data-param="a" value="100"></div>
            <div class="input-row"><label>Slope (b):</label><input type="number" class="param" data-param="b" value="1" step="0.1"></div>
        </div>
        <div class="control-group">
             <div class="control-group-title">Supply: P = c + dQ</div>
            <div class="input-row"><label>Intercept (c):</label><input type="number" class="param" data-param="c" value="20"></div>
            <div class="input-row"><label>Slope (d):</label><input type="number" class="param" data-param="d" value="1" step="0.1"></div>
        </div>
        <div class="control-group"><div class="output-div" id="sd-output"></div></div>`,
    plot: (params, outputEl) => {
        const { a, b, c, d } = params;
        const traces = [];
        const q_eq = (b + d) > 0 ? (a - c) / (b + d) : 0;
        const p_eq = a - b * q_eq;
        const max_q = Math.max(q_eq * 1.8, (a/b) * 1.2 , 20);
        const q_values = Array.from({ length: 101 }, (_, i) => max_q * i / 100);

        traces.push({ x: q_values, y: q_values.map(q => a - b * q).map(p => p < 0 ? NaN : p), mode: 'lines', name: 'Demand', line: { color: '#17BECF', width: 2.5 }});
        traces.push({ x: q_values, y: q_values.map(q => c + d * q), mode: 'lines', name: 'Supply', line: { color: '#E377C2', width: 2.5 }});
        
        if (q_eq > 0 && p_eq > 0) {
            traces.push({ x: [q_eq], y: [p_eq], mode: 'markers', name: 'Equilibrium', marker: { size: 12, color: '#76FF03', symbol: 'star' }});
            outputEl.innerHTML = `<b>Equilibrium:</b><br>Quantity (Q*): ${q_eq.toFixed(2)}<br>Price (P*): ${p_eq.toFixed(2)}`;
        } else {
            outputEl.innerHTML = '<b>No valid equilibrium point found.</b>';
        }
        return traces;
    }
};
