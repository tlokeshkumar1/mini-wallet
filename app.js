const express = require("express")
const collection = require("./mongo")
const transaction = require("./db")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
    const {email,password} = req.body
    
    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json('not exist')
        }
    }
    catch(e){
        res.json("not exist")
    }
})

app.post("/signup",async(req,res)=>{
    const {email,password,username} = req.body
    
    const data={
        username:username,
        email:email,
        password:password
    }
    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json('not exist')
            await collection.insertMany([data])
        }
    }
    catch(e){
        res.json("not exist")
    }
})

app.post("/home",async(req,res)=>{
    const {infuraApiKey,senderName,privateKey,receiverName,recipientAddress,amountToSend,transactionHash} = req.body
    
    const data={
        infuraApiKey:infuraApiKey,
        senderName:senderName,
        privateKey:privateKey,
        receiverName:receiverName,
        recipientAddress:recipientAddress,
        amountToSend:amountToSend,
        transactionHash:transactionHash
    }
    try{
        await transaction.insertMany([data])
    }
    catch(e){
        res.json("Not pushed in Database")
    }
})

app.listen(8000,()=>{
    console.log("port is connected");
})