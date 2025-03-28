import happyBirthDayModel from '../models.js'
import Utils from '../utils/utils.js'

const updateWishList = async (req, res) => {
    try {
        const {wishList, codigo} = req.body;

        console.log(`Codigo: ${codigo} - wishList: ${wishList}`);

        await happyBirthDayModel.updateOne({codigo: codigo}, {listaDeseos: wishList})

        res.status(200).json({message: Utils.RESPONSE_IS_FINE});
    } catch (error) {
        res.status(500).json({message: Utils.RESPONSE_IS_NOT_FINE, errorMSG: error});
    }
}

export default updateWishList