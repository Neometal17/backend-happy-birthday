const happyBirthDayModel = require('../models')
const Utils = require('../utils/utils')

const getAllGuests = async (req, res) => {
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
        res.status(500).json({message: Utils.RESPONSE_IS_NOT_FINE, errorMSG: error});
    }
}

module.exports = getAllGuests