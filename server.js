const express = require('express');
const fetch = require('node-fetch');
const https = require('https');

const app = express();

app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Content-Security-Policy', "frame-ancestors *");
    next();
});

app.get('/fetch', async (req, res) => {
    let targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('Missing ?url=');
    }
    
    try {
        // Create custom agent to ignore certificate errors (for development)
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        
        const response = await fetch(targetUrl, {
            agent: targetUrl.startsWith('https') ? agent : undefined
        });
        
        const html = await response.text();
        res.send(html);
    } catch(err) {
        res.status(500).send('Error loading site: ' + err.message);
    }
});

app.listen(3000, () => console.log('Proxy running on port 3000'));
