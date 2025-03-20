const { Router } = require('express');

const getAllGuests = require('../business/getAllGuests')
const saveGuest = require('../business/saveGuest')
const updateGuest = require('../business/updateGuest')
const updateConfirmedGuest = require('../business/updateConfirmedGuest')
const getGuestForCode = require('../business/getGuestForCode')
const loadExcel = require('../business/loadExcel')

const r = Router();
const port = 3000;


r.get("/", getAllGuests);

r.get("/searchCode", getGuestForCode);

/**
 * Este endpoint crear invitados (guests) con el siguiente JSON
 *  {
    "nombre": "Juana Vitalvi",
    "invitados": 4,
    "codigo": "032713JNLSHFLSDF",
    "confirmado": 0,
    "buzonDeseos": "Te deseo lo mejor",
    "listaDeseos": "Quiero todo el dinero de la fiesta"
    }
 */
r.post('/', saveGuest);

/**
 * Este para la Actualizacion de los invitados, este seria el JSON
 * 
 *  {
    "id_temp": "67b63481d21e9f366651543d",
    "nombre": "Juana Vitalvi V0",
    "invitados": 6,
    "confirmado": 1
    }
    * 
    */
r.put("/", updateGuest);

/**
 * Se actualizacion del estado de la confirmacion por medio de "Codigo" 
 * 
 *  {
    "codigo": "67b63481d21e9f366651543d"
    }
    * 
    */
r.put("/confirmedGuest", updateConfirmedGuest);


/**
 * Piloto para leer Excel desde Google Scheets y realizar la carga de los Invitados
 * para pasarlos a la BD Mongo
 */
r.get("/loadExcel", loadExcel)

module.exports = r