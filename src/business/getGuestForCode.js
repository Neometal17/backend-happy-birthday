const happyBirthDayModel = require('../models')
const Utils = require('../utils/utils')

const getGuestForCode = async (req, res)=>{

    try {
        const guestsCode = req.query.code;

        const hbdOne = await happyBirthDayModel.find({codigo: guestsCode}).exec();

        res.status(200).json(hbdOne[0]);
    } catch (error) {
        res.status(500).json({message: Utils.RESPONSE_IS_NOT_FINE, errorMSG: error});
    }

}

module.exports = getGuestForCode