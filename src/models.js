import mongoose from 'mongoose'
import happyBirthDaySchema from './schemas.js'

const uri = "mongodb+srv://minineo:tivoli@happy-birthday-test-clu.ntqpc.mongodb.net/happy-birth-day-app"

const happyBirthDayModel = mongoose.model('guests', happyBirthDaySchema)

mongoose.connect(uri, {}).then(() => {
    console.log('Connection success')
}).catch(error => {
    console.error('Connection fail', error)
})

export default happyBirthDayModel