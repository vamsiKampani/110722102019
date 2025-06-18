const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.end('hello world!');
});

const WINDOW_SIZE = 10;
let window = [];


const API = {
    p: 'https://www.randomnumberapi.com/api/v1.0/random?min=2&max=100&count=10', 
    f: 'https://us-central1-hylomorph-308509.cloudfunctions.net/fibonacci?n=10', 
    e: 'https://www.randomnumberapi.com/api/v1.0/random?min=2&max=100&count=10', 
    r: 'https://www.randomnumberapi.com/api/v1.0/random?min=1&max=100&count=10'  
};

app.get('/numbers/:numberid', async (req, res) => {
    const num = req.params.numberid;

    if (!API[num]) {
        return res.status(400).json({ error: "Invalid numbers ID. Please use 'p', 'f', 'e', or 'r'." });
    }

    try {
        const response = await fetch(API[num]);
        const data = await response.json();

        
        let newNum;

        if (num === 'f') {
           
            newNum = data.result || [];
        } else {
            
            newNum = data || [];
        }

        const preWindow = [...window];
        window = [...window, ...newNum];

        if (window.length > WINDOW_SIZE) {
            window = window.slice(window.length - WINDOW_SIZE);
        }

        const average = window.reduce((sum, val) => sum + val, 0) / window.length;

        res.json({
            windowPreState: preWindow,
            windowCurrState: window,
            average: average.toFixed(2)
        });
    } catch (error) {
        console.error("Fetch error:", error.message);
        res.status(500).json({ error: 'Failed to fetch numbers from the external server.' });
    }
});

const port = 9876;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
