const { randomUUID } = require('crypto');

function getStockPrices(ticker, minutes) {
    const now = new Date();
    const prices = [];

    for (let i = 0; i < 10; i++) {
        const minutesAgo = Math.random() * minutes;
        const date = new Date(now.getTime() - minutesAgo * 60000);
        const price = +(Math.random() * (1000 - 100) + 100).toFixed(5);

        prices.push({
            price,
            lastUpdatedAt: date.toISOString()
        });
    }

    prices.sort((a, b) => new Date(a.lastUpdatedAt) - new Date(b.lastUpdatedAt));
    return prices;
}

module.exports = { getStockPrices };
