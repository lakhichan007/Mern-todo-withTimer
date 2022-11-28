const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://lakhichan007:12345@cluster0.9mpfz32.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
        console.log("connnected to  Task Database")
    })
    .catch(err => {
        console.log(err)
    })
const schema = mongoose.Schema
const taskSchema = new schema({
    activity: { type: String },
    status: { type: String },
    time: { type: String },
    action: { type: String },
    timetaken: { type: String },
    ref: { type: String }
})

let Task = mongoose.model("todotask1", taskSchema);
module.exports = Task