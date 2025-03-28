import happyBirthDayModel from '../models.js'
import Utils from '../utils/utils.js'

const updateGiftList = async (req, res) => {
    try {
        const {giftList, codigo} = req.body;

        console.log(`Codigo: ${codigo} - wishList: ${giftList}`);

        await happyBirthDayModel.updateOne({codigo: codigo}, {buzonDeseos: giftList})

        res.status(200).json({message: Utils.RESPONSE_IS_FINE});
    } catch (error) {
        res.status(500).json({message: Utils.RESPONSE_IS_NOT_FINE, errorMSG: error});
    }
}

export default updateGiftList