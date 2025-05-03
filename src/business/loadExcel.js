import { Readable } from 'stream'
import crypto from 'crypto'
import csv from 'csv-parser'
import happyBirthDayModel from '../models.js'
import Utils from '../utils/utils.js'

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/<public-id>/pub?output=csv' //Esto se va a un archivo de entorno
const SHEET_ID = '2PACX-1vSOK-4U32qX77JEQqQoQrzjmQJ9lqjVNAO9EYsPpC0ajONV5wkRrTfvMrUtQleKNg'

const loadExcel = async (req, res) => {
    try {
        const sheetUrl = SHEET_URL.replaceAll('<public-id>', SHEET_ID)
        const response = await fetch(sheetUrl);
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const body = await response.text();
        const stream = Readable.from(body);
        const results = [];
    
        // Procesar el archivo CSV con csv-parser
        await new Promise((resolve, reject) => {
            stream
                .pipe(csv())
                .on('data', (row) => results.push(row))
                .on('end', resolve)
                .on('error', reject);
        });

        // Preparar los documentos para inserción masiva
        const bulkDocs = results.map(newGuest => ({
            nombre: newGuest.nombre_invitado,
            invitados: newGuest.numero_invitados,
            codigo: crypto.randomBytes(16).toString("hex"),
            confirmado: Utils.GUEST_NOT_CONFIRMED,
            buzonDeseos: ' ',
            listaDeseos: ' '
        }));

        // Realizar inserción masiva
        await happyBirthDayModel.insertMany(bulkDocs, { ordered: false });
        
        res.status(200).json({ 
            message: 'Data loaded successfully', 
            count: results.length 
        });

    } catch (error) {
        console.error('Error loading data:', error);
        res.status(500).json({ error: 'Failed to load data' });
    }
}

export default loadExcel