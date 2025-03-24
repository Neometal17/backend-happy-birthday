import dotenv from 'dotenv'
import { dirname, resolve, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const env = process.env.NODE_ENV || 'development'

// Una Forma de realizarla tambien
// const envPath = resolve(__dirname, `.env.${env}`)

const envPath = join(__dirname, '..', '..', 'enviroment', `.env.${env}`)

console.log('Loading environment from:', envPath)
dotenv.config({path: envPath})

const envUtils = {
    MESSAGE_V1: process.env.MESSAGE_V1
}

export default envUtils