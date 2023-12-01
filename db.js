const express = require("express");
const mongoose=require("mongoose");
const app = express();
const uri="mongodb+srv://root:root@cluster0.ssf0zfu.mongodb.net/?retryWrites=true&w=majority"
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("connection successful to transaction database");
    }
    catch(e){
        console.log("connection failed");
    }
}
connect();

const newTransaction = new mongoose.Schema({
    infuraApiKey:{
        type: String,
        required: true
    },
    senderName:{
        type: String,
        required: true
    },
    privateKey:{
        type: String,
        required: true
    },
    receiverName:{
        type: String,
        required: true
    },
    recipientAddress:{
        type: String,
        required: true
    },
    amountToSend:{
        type: String,
        required: true
    },
    transactionHash:{
        type: String,
        required: true
    }
});

const transaction = mongoose.model("Transaction", newTransaction);

module.exports = transaction