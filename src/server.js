// import http from 'http'

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});

//     res.write('<h1>Hello, Node.js HTTP Server!</h1>');
//     res.end();
// })

// const port = 3000;

// server.listen(port, () =>{
//   console.log(`Node.js HTTP server is running on port ${port}`)  
// });

import express from 'express'
import mongoose, { Schema } from 'mongoose';
// import { happyBirthDayModel } from "./models.js"

const app = express();
const port = 3000;
const uri = "mongodb+srv://minineo:tivoli@happy-birthday-test-clu.ntqpc.mongodb.net/happy-birth-day-app";

const IS_FINE = "Is Fine";
const IS_NOT_FINE = "Is Not Fine";


const happyBirthDaySchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    invitados: {type: Number, required: true},
    codigo: {type: String, required: true},
    confirmado: {type: Number, required: true},
    buzonDeseos: {type: String, required: true},
    listaDeseos: {type: String, required: true},
});

const happyBirthDayModel = mongoose.model('guests', happyBirthDaySchema);

app.use(express.json())

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection success');
    app.listen(port, () => {
        console.log(`Server Listen on http://localhost:${port}`);
    });
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
app.post('/guests', async (req, res) => {

    const { nombre, invitados, codigo, confirmado, buzonDeseos, listaDeseos } = req.body;
    
    try {

        const happyBirthDay = new happyBirthDayModel({
            nombre: nombre,
            invitados: invitados,
            codigo: codigo,
            confirmado: confirmado,
            buzonDeseos: buzonDeseos,
            listaDeseos: listaDeseos
        });

        const saveHappy = happyBirthDay.save();
        
        res.status(201).json({message: IS_FINE});
    } catch (error) {
        res.status(500).json({message: IS_NOT_FINE});
    }
});

app.get("/guests", async (req, res) => {
    try {
        const hbdAll = await happyBirthDayModel.find({}).exec();
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

app.put("/guests", async (req, res) => {
    console.log("Method Put")
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