window.graphTemplates = window.graphTemplates || {};
window.graphTemplates.profit_max_setter = {
    name: 'Profit Maximization (Price Setter)',
    xaxis: 'Quantity (Q)', yaxis: 'Price (P)',
    generateHTML: () => `
        <div class="control-group">
            <div class="control-group-title">Demand: P = a - bQ</div>
            <div class="input-row"><label>Intercept (a):</label><input type="number" class="param" data-param="a" value="100"></div>
            <div class="input-row"><label>Slope (b):</label><input type="number" class="param" data-param="b" value="1" step="0.1"></div>
        </div>
        <div class="control-group">
            <div class="control-group-title">Cost: TC = cQ² + dQ + e</div>
            <div class="input-row"><label>c:</label><input type="number" class="param" data-param="c" value="0.2" step="0.1"></div>
            <div class="input-row"><label>d:</label><input type="number" class="param" data-param="d" value="5"></div>
            <div class="input-row"><label>Fixed Cost (e):</label><input type="number" class="param" data-param="e" value="100"></div>
        </div>
        <div class="control-group"><div class="output-div" id="pms-output"></div></div>`,
    plot: (params, outputEl) => {
        const { a, b, c, d, e } = params;
        const traces = [];
        const q_opt = (b + c > 0 && 2 * (b + c) != 0) ? (a - d) / (2 * (b + c)) : 0;
        const p_opt = a - b * q_opt;
        const max_q = q_opt * 2 > 10 ? q_opt * 2 : (a/b);
        const q_values = Array.from({ length: 101 }, (_, i) => max_q * i / 100).filter(q => q > 0.01);

        const demand = q => a - b * q;
        const mr = q => a - 2 * b * q;
        const mc = q => 2 * c * q + d;
        const atc = q => c * q + d + e / q;

        traces.push({ x: q_values, y: q_values.map(demand).map(p => p < 0 ? NaN : p), mode: 'lines', name: 'Demand', line: { color: '#17BECF', width: 2.5 }});
        traces.push({ x: q_values, y: q_values.map(mr).map(p => p < 0 ? NaN : p), mode: 'lines', name: 'MR', line: { color: '#9467BD', width: 2.5, dash: 'dash' }});
        traces.push({ x: q_values, y: q_values.map(mc), mode: 'lines', name: 'MC', line: {color: '#FF7F0E', width: 2.5}});
        traces.push({ x: q_values, y: q_values.map(atc), mode: 'lines', name: 'ATC', line: {color: '#2CA02C', width: 2.5}});

        if (q_opt > 0 && p_opt > 0) {
            const atc_opt = atc(q_opt);
            const profit = (p_opt - atc_opt) * q_opt;
            traces.push({ x: [q_opt], y: [p_opt], mode: 'markers', name: 'Optimum (P*, Q*)', marker: { size: 12, color: '#76FF03' }});
            outputEl.innerHTML = `<b>Optimal Point:</b><br>Quantity (Q*): ${q_opt.toFixed(2)}<br>Price (P*): ${p_opt.toFixed(2)}<br>Profit: ${profit.toFixed(2)}`;
        } else {
             outputEl.innerHTML = `<b>No valid optimum found.</b>`;
        }
        return traces;
    }
};
