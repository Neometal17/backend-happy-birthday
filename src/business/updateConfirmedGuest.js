import happyBirthDayModel from '../models.js'
import Utils from '../utils/utils.js'

const updateConfirmedGuest = async (req, res) => {
    try {
        const {codigo} = req.body;

        console.log(`Codigo: ${codigo}`);

        await happyBirthDayModel.updateOne({codigo: codigo}, {confirmado: Utils.GUEST_CONFIRMED})

        res.status(200).json({message: Utils.RESPONSE_IS_FINE});
    } catch (error) {
        res.status(500).json({message: Utils.RESPONSE_IS_NOT_FINE, errorMSG: error});
    }
}

export default updateConfirmedGuest