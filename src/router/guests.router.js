const { Router } = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto')

const r = Router();
const port = 3000;
const uri = "mongodb+srv://minineo:tivoli@happy-birthday-test-clu.ntqpc.mongodb.net/happy-birth-day-app";

const IS_FINE = "Is Fine";
const IS_NOT_FINE = "Is Not Fine";

const CONFIRMED = ""
const NOT_CONFIRMED = ""

const happyBirthDaySchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    invitados: {type: Number, required: true},
    codigo: {type: String, required: true},
    confirmado: {type: Number, required: true},
    buzonDeseos: {type: String, required: true},
    listaDeseos: {type: String, required: true},
});

const happyBirthDayModel = mongoose.model('guests', happyBirthDaySchema);

mongoose.connect(uri, {}).then(() => {
    console.log('Connection success');
}).catch(error => {
    console.error('Connection fail', error);
});


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
r.post('/', async (req, res) => {

    const { nombre, invitados, confirmado, buzonDeseos, listaDeseos } = req.body;

    if (!nombre || !invitados || confirmado === undefined || !buzonDeseos || !listaDeseos ) {
        return res.status(400).json({message: 'Faltan Parametros en la solicitud'});
    }

    try {

        const codigoHash = crypto.randomBytes(16).toString("hex")

        // console.log(`Codigo: ${codigoHash}`)

        const happyBirthDay = new happyBirthDayModel({
            nombre: nombre,
            invitados: invitados,
            codigo: codigoHash,
            confirmado: NOT_CONFIRMED,
            buzonDeseos: buzonDeseos,
            listaDeseos: listaDeseos
        });

        const saveHappy = happyBirthDay.save();
        
        return res.status(201).json({message: IS_FINE});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: IS_NOT_FINE});
    }
});

r.get("/", async (req, res) => {
    try {
        const hbdAll = (await happyBirthDayModel.find({}).exec())
            .map(item => {
                return {
                    nombre: item.nombre,
                    invitados: item.invitados,
                    codigo: item.codigo,
                    confirmado: item.confirmado,
                    buzonDeseos: item.buzonDeseos,
                    listaDeseos: item.listaDeseos
                }
            });

        res.status(200).json(hbdAll);
    } catch (error) {
        res.status(500).json({message: IS_NOT_FINE, errorMSG: error});
    }
});

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

r.put("/", async (req, res) => {
    try {
        const {id_temp, nombre, invitados, confirmado} = req.body;

        console.log(`${id_temp} - ${nombre} - ${invitados} - ${confirmado}`);

        // const hbdOne = await happyBirthDayModel.find({_id: id_temp}).exec();
        // console.log(JSON.stringify(hbdOne));

        await happyBirthDayModel.updateOne({_id: id_temp}, {nombre, invitados, confirmado})

        res.status(200).json({message: IS_FINE});
    } catch (error) {
        res.status(500).json({message: IS_NOT_FINE, errorMSG: error});
    }
});

/**
 * Se actualizacion del estado de la confirmacion por medio de "Codigo" 
 * 
 *  {
    "codigo": "67b63481d21e9f366651543d"
    "confirmado": 1
    }
    * 
    */

r.put("/confirmedGuest", async (req, res) => {
    try {
        const {codigo} = req.body;
        const confirmado = 1;

        console.log(`${codigo}`);

        await happyBirthDayModel.updateOne({_id: codigo}, {confirmado})

        res.status(200).json({message: IS_FINE});
    } catch (error) {
        res.status(500).json({message: IS_NOT_FINE, errorMSG: error});
    }
});

r.get("/confirmedGuests", async (req, res)=>{

    try {
        const guestsCode = req.query.code;

        await happyBirthDayModel.updateOne({codigo: guestsCode}, {confirmado: 0}).exec();

        res.status(200).json({message: IS_FINE});
    } catch (error) {
        res.status(500).json({message: IS_NOT_FINE, errorMSG: error});
    }
 
});

r.get("/searchCode", async (req, res)=>{

    try {
        const guestsCode = req.query.code;

        const hbdOne = await happyBirthDayModel.find({codigo: guestsCode}).exec();

        res.status(200).json(hbdOne[0]);
    } catch (error) {
        res.status(500).json({message: IS_NOT_FINE, errorMSG: error});
    }

});

module.exports = r