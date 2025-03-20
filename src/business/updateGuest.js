const happyBirthDayModel = require('../models')
const Utils = require('../utils/utils')

const updateGuest = async (req, res) => {
    try {
        const {id_temp, nombre, invitados, confirmado} = req.body;

        console.log(`${id_temp} - ${nombre} - ${invitados} - ${confirmado}`);

        // const hbdOne = await happyBirthDayModel.find({_id: id_temp}).exec();
        // console.log(JSON.stringify(hbdOne));

        await happyBirthDayModel.updateOne({_id: id_temp}, {nombre, invitados, confirmado})

        res.status(200).json({message: Utils.RESPONSE_IS_FINE});
    } catch (error) {
        res.status(500).json({message: Utils.RESPONSE_IS_NOT_FINE, errorMSG: error});
    }
}

module.exports = updateGuest