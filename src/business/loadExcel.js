const { Readable } = require('stream');
const happyBirthDayModel = require('../models')
const crypto = require('crypto')
const Utils = require('../utils/utils')
const csv = require('csv-parser')

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/<public-id>/pub?output=csv' //Esto se va a un archivo de entorno
const SHEET_ID = '2PACX-1vQ1A8EXQXuBh-c-PBZzXpLsmeHFTFjNrv2XHUh5bbk3qnX-bW3DtLROLzagYczkOnHHzyB85UCsEjLr'

const loadExcel = async (req, res) => {

    try {
        const sheetUrl = SHEET_URL.replaceAll('<public-id>', SHEET_ID)
    
        // Descargar el archivo CSV usando fetch
        const response = await fetch(sheetUrl);
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const body = await response.text(); // Convertir la respuesta a texto
    
        // Convertir el texto en un stream legible para csv-parser
        const stream = Readable.from(body);
    
        const results = [];
    
        // Procesar el archivo CSV con csv-parser
        stream
          .pipe(csv())
          .on('data', (row) => {
            results.push(row); // Agregar cada fila como un objeto JSON
          })
          .on('end', async () => {

            for(const newGuest of results) {
                // console.log(`Nombre: ${newGuest.nombre_invitado}`)]
                const codigoHash = crypto.randomBytes(16).toString("hex")

                const happyBirthDay = new happyBirthDayModel({
                    nombre: newGuest.nombre_invitado,
                    invitados: newGuest.numero_invitados,
                    codigo: codigoHash,
                    confirmado: Utils.GUEST_NOT_CONFIRMED,
                    buzonDeseos: ' ',
                    listaDeseos: ' '
                });
                await happyBirthDay.save();
            }

            res.status(200).json({ message: 'Data loaded successfully', data: results });
          })
          .on('error', (error) => {
            console.error('Error parsing CSV:', error);
            res.status(500).json({ error: 'Failed to parse CSV' });
          });
      } catch (error) {
        console.error('Error loading data:', error);
        res.status(500).json({ error: 'Failed to load data' });
      }
}

module.exports = loadExcel