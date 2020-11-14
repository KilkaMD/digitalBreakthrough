const express = require('express');
const path = require('path');

const app = express();
const modelUrl = 'someurl';

const PORT = process.env.PORT || 4001;

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname, 'build'),
        headers: {
            'Content-Security-Policy': "script-src 'self' http://localhost:4001 'nonce-ZmI5MzlhYzAxNDNiOTk5YWJiNWEzMjE2YmRiZDU2NzA2NjhiNjE5MDhlNWI0N2FjYTJkMTJmODhhNWMxOWJhZA=='"
            //"script-src 'sha256-ZmI5MzlhYzAxNDNiOTk5YWJiNWEzMjE2YmRiZDU2NzA2NjhiNjE5MDhlNWI0N2FjYTJkMTJmODhhNWMxOWJhZA==' "
        }
    }
    res.sendFile('index.html',options);
});

app.get('/model', (req, res) => {
    console.log('it is working')
    res.redirect(modelUrl);
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
