import mongoose from 'mongoose';

export const happyBirthDaySchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    invitados: {type: Number, required: true},
    codigo: {type: String, required: true},
    confirmado: {type: Number, required: true},
    buzonDeseos: {type: String, required: true},
    listaDeseos: {type: String, required: true},
});

// export default happyBirthDaySchema
// module.exports = {
//     happyBirthDaySchema
// }