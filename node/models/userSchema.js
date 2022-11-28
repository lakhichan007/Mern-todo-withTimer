const mongoose =require("mongoose")

mongoose.connect("mongodb+srv://lakhichan007:12345@cluster0.9mpfz32.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("connnected to User Database")
})
.catch(err=>{
    console.log(err)
})
const schema = mongoose.Schema
const userSchema= new schema({
    email:{type:String},
    password:{type:String}
})

let USer=mongoose.model("todoUser1",userSchema);
module.exports=USer