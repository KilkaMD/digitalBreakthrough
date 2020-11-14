const express = require('express');
const path = require('path');

const app = express();
const modelUrl = 'someurl';

const PORT = process.env.PORT || 4001;

app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname, 'build'),
        headers: {
            'Content-Security-Policy': "script-src 'self' http://localhos:4001 'nonce-Nc3n83cnSAd3wc3Sasdfn939hc3'"
            //"script-src 'sha256-ZmI5MzlhYzAxNDNiOTk5YWJiNWEzMjE2YmRiZDU2NzA2NjhiNjE5MDhlNWI0N2FjYTJkMTJmODhhNWMxOWJhZA==' "
        }
    }
    res.sendFile('index.html',options);
});

app.post('/model', (req, res) => {
    res.redirect(modelUrl);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
