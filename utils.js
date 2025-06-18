function computeAverage(prices) {
    if (prices.length === 0) return 0;
    const sum = prices.reduce((acc, obj) => acc + obj.price, 0);
    return +(sum / prices.length).toFixed(5);
}

function computeCorrelation(prices1, prices2) {
    if (prices1.length !== prices2.length) return 0;

    const n = prices1.length;
    const mean1 = computeAverage(prices1);
    const mean2 = computeAverage(prices2);

    let numerator = 0;
    let denom1 = 0;
    let denom2 = 0;

    for (let i = 0; i < n; i++) {
        const x = prices1[i].price - mean1;
        const y = prices2[i].price - mean2;
        numerator += x * y;
        denom1 += x * x;
        denom2 += y * y;
    }

    const denominator = Math.sqrt(denom1 * denom2);
    if (denominator === 0) return 0;
    return +(numerator / denominator).toFixed(5);
}

module.exports = { computeAverage, computeCorrelation };
