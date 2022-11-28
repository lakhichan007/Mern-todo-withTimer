require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const jwt =require("jsonwebtoken")
const bcrypt= require("bcryptjs")
app.use(express.json())
app.use(cors())
const User = require("../models/userSchema")
const Task =require("../models/todoschema")
const port = process.env.PORT || 4001

app.post("/logIn", async (req, res) => {
    const { email, password } = req.body;
    try {
        const isUser = await User.findOne({ email })
        if (!isUser) {
            res.json({
                message: "Invalid User"
            })
        }
        else {
            const isPassword= await bcrypt.compare(password,isUser.password)
            if (isPassword) {

             let token= jwt.sign({email:isUser.email},process.env.secretkey)
                res.json({
                    message: "success",
                    token:token,
                    email:isUser.email
                })
            }
            else {
                res.json({
                    message: "Invalid User"
                })
            }
        }

    }
    catch (err) {
        res.json({
            message: err.message
        })
    }

})
app.post("/signUp", async (req, res) => {
    const { email, password } = req.body
    try {
       
        let isUser = await User.findOne({ email })
        if (!isUser) {

            bcrypt.hash(password,10,async(err,hashed)=>{

                await User.create({ email, password:hashed})
            })
            

            res.json({
                message: "Registration Sucessfully!"
            })
        }
        else {
            res.json({
                message: "User already Exist!"
            })
        }
    }

    catch (err) {
        res.json({
            message: err.message
        })
    }
})


app.post("/addTasks",async(req,res)=>{

var {user,data}=req.body
try{
    if(data.activity){
       await Task.create({
    activity: data.activity,
    status:data.status,
    time:data.time,
    action: data.action,
    timetaken: data.timetaken,
    ref: user
       })
    }
    const allData=await Task.find({ref:user})
    res.json({
        message:allData
    })
}
catch (err) {
    res.json({
        message: err.message
    })
}
})

app.post("/updateToStart", async(req,res)=>{
    const {id}= req.body
    try{
        const currentTask= await Task.updateOne({_id:id},{$set:{action:"Ongoing",status:"Ongoing"}})
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
})

app.post("/updateToComplete", async(req,res)=>{
    const {id}= req.body
    try{
        const currentTask= await Task.updateOne({_id:id},{$set:{action:"complete",status:"completed"}})
        console.log("task complete")
    }
    catch (err) {
        res.json({
            message: err.message
        })
    }
})
app.listen(port, () => {
    console.log(`server is running at ${port}`)
})

