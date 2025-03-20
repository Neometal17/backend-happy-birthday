const mongoose = require("mongoose")

const happyBirthDaySchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    invitados: {type: Number, required: true},
    codigo: {type: String, required: true},
    confirmado: {type: Number, required: true},
    buzonDeseos: {type: String, required: true},
    listaDeseos: {type: String, required: true},
})

module.exports = happyBirthDaySchema