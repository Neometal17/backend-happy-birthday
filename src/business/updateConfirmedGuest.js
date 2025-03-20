const happyBirthDayModel = require('../models')
const Utils = require('../utils/utils')

const updateConfirmedGuest = async (req, res) => {
    try {
        const {codigo} = req.body;

        console.log(`${codigo}`);

        await happyBirthDayModel.updateOne({codigo: codigo}, {CONFIRMED})

        res.status(200).json({message: Utils.RESPONSE_IS_FINE});
    } catch (error) {
        res.status(500).json({message: Utils.RESPONSE_IS_NOT_FINE, errorMSG: error});
    }
}

module.exports = updateConfirmedGuest