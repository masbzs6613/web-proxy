const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/fetch', async (req, res) => {
    let url = req.query.url;
    if (!url) return res.status(400).send('Missing url');
    try {
        let r = await fetch(url);
        let html = await r.text();
        res.send(html);
    } catch(e) {
        res.status(500).send('Error: ' + e.message);
    }
});

app.listen(3000, () => console.log('Proxy on 3000'));
