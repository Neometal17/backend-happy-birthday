const { Router } = require('express');
const guests = require('./guests.router');

const r = Router();

r.use('/guests', guests)

r.get('/', (req, res) => res.status(200).json('Guests Base App'));

module.exports = r;