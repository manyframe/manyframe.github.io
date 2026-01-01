window.graphTemplates = window.graphTemplates || {};
window.graphTemplates.profit_max_taker = {
    name: 'Profit Maximization (Price Taker)',
    xaxis: 'Quantity (Q)', yaxis: 'Price (P)',
    generateHTML: () => `
        <div class="control-group">
            <div class="control-group-title">Cost: TC = aQ² + bQ + c</div>
            <div class="input-row"><label>a:</label><input type="number" class="param" data-param="a" value="0.1" step="0.01"></div>
            <div class="input-row"><label>b:</label><input type="number" class="param" data-param="b" value="2"></div>
            <div class="input-row"><label>Fixed Cost (c):</label><input type="number" class="param" data-param="c" value="50"></div>
        </div>
        <div class="control-group">
            <div class="control-group-title">Market</div>
            <div class="input-row"><label>Price (P):</label><input type="number" class="param" data-param="p" value="20"></div>
        </div>
        <div class="control-group"><div class="output-div" id="pmt-output"></div></div>`,
    plot: (params, outputEl) => {
        const { a, b, c, p } = params;
        const traces = [];
        const q_opt = (a > 0) ? (p - b) / (2 * a) : 0;
        const max_q = q_opt * 2 > 10 ? q_opt * 2 : 20;
        const q_values = Array.from({ length: 101 }, (_, i) => max_q * i / 100).filter(q => q > 0.01);

        const mc = q => 2 * a * q + b;
        const atc = q => a * q + b + c / q;

        traces.push({ x: q_values, y: q_values.map(mc), mode: 'lines', name: 'MC', line: {color: '#FF7F0E', width: 2.5}});
        traces.push({ x: q_values, y: q_values.map(atc), mode: 'lines', name: 'ATC', line: {color: '#2CA02C', width: 2.5}});
        traces.push({ x: [0, max_q], y: [p, p], mode: 'lines', name: 'Price (D=MR=AR)', line: {color: '#9467BD', width: 2.5, dash: 'dot'}});

        if (q_opt > 0) {
            const atc_opt = atc(q_opt);
            const profit = (p - atc_opt) * q_opt;
            traces.push({ x: [q_opt], y: [p], mode: 'markers', name: 'Optimal Q*', marker: { size: 12, color: '#76FF03' }});
            outputEl.innerHTML = `<b>Optimal Point:</b><br>Quantity (Q*): ${q_opt.toFixed(2)}<br>Profit: ${profit.toFixed(2)}`;
        } else {
            outputEl.innerHTML = `<b>No valid optimum found.</b> Check if P > min(MC).`;
        }
        return traces;
    }
};
