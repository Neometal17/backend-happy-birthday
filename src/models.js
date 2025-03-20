const mongoose = require('mongoose')
const happyBirthDaySchema = require('./schemas.js')

const uri = "mongodb+srv://minineo:tivoli@happy-birthday-test-clu.ntqpc.mongodb.net/happy-birth-day-app"

const happyBirthDayModel = mongoose.model('guests', happyBirthDaySchema)

mongoose.connect(uri, {}).then(() => {
    console.log('Connection success')
}).catch(error => {
    console.error('Connection fail', error)
})

module.exports = happyBirthDayModel