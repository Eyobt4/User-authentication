const mongoose = require("mongoose");

const connectDB = ()=>{
    try{
        const connect = mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoDB connected`);
    }
    catch(err){
        console.log("mongoDB connection error"+err);
        
    }
};

module.exports = connectDB;