import mongoose from "mongoose";
import { happyBirthDaySchema } from "./schemas.js"


const happyBirthDayModel = mongoose.model('HappyBirthDay', happyBirthDaySchema);

// export default happyBirthDayModel;
module.exports = {
    happyBirthDayModel
}