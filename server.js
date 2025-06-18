const express = require('express');
const app = express();
const { getStockPrices } = require('./mock_data');
const { computeAverage, computeCorrelation } = require('./utils');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Stock Price Aggregation Microservice is running!" });
});


app.get('/stocks/:ticker', (req, res) => {
    const ticker = req.params.ticker;
    const minutes = parseInt(req.query.minutes);
    const aggregation = req.query.aggregation || 'average';

    const prices = getStockPrices(ticker, minutes);

    if (aggregation === 'average') {
        const avg = computeAverage(prices);
        return res.json({
            averageStockPrice: avg,
            priceHistory: prices
        });
    }

    return res.status(400).json({ error: "Unsupported aggregation" });
});


app.get('/stockcorrelation', (req, res) => {
    const minutes = parseInt(req.query.minutes);
    const tickers = req.query.ticker;

    if (!tickers || tickers.length !== 2) {
        return res.status(400).json({ error: "Exactly 2 tickers required" });
    }

    const [t1, t2] = tickers;
    const prices1 = getStockPrices(t1, minutes);
    const prices2 = getStockPrices(t2, minutes);

    const corr = computeCorrelation(prices1, prices2);
    const avg1 = computeAverage(prices1);
    const avg2 = computeAverage(prices2);

    return res.json({
        correlation: corr,
        stocks: {
            [t1]: { averagePrice: avg1, priceHistory: prices1 },
            [t2]: { averagePrice: avg2, priceHistory: prices2 }
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
