import { Router } from 'express'
import guests from './guests.router.js'

const r = Router();

r.use('/guests', guests)

r.get('/', (req, res) => res.status(200).json('Guests Base App'));

export default r