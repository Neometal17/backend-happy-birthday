import happyBirthDayModel from '../models.js'
import crypto from 'crypto'
import Utils from '../utils/utils.js'

const saveGuest = async (req, res) => {

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
        
        return res.status(201).json({message: Utils.RESPONSE_IS_FINE});
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: Utils.RESPONSE_IS_NOT_FINE});
    }
}

export default saveGuest