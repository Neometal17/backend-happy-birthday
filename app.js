const express = require('express');
const cors = require('cors');
const guests = require('./src/router');

const app = express();
const port = 3000;

const corsOption = {
    origin: "*",
    optionsSuccessStatus: 200
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use('/', cors(corsOption), guests);

app.all('*', (req, res) => res.status(404).json({message: "route not found"}));

app.listen(port, () => {
    console.log(`Server Listen on http://localhost:${port}`);
});

module.exports = app;