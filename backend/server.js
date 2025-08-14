const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const connectDB = require("./config/connectDB");
const app = express();
const cookieParser =require( "cookie-parser");
const userRouter = require("./routes/userRouter");
const auth = require("./auth");
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connectionDb = () => {
    try{
    const connect = mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
    
}
catch(error){
    console.log(error);
    
}
};

connectionDb();

const newSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{
timestamp:true
}
);


app.get("/",(req,res)=>{
    res.send("API is working");
});

//protected route /dashboard
app.post("/signup",async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!password){
        res.status(404).send("all fields required");
    };
    const available = await newSchema.findOne({email});
    if(available){
        res.status(404).send("user already exist");
    };

    const hashPassword = bcrypt.hash(password,10);
    const newUser = newSchema.create({
        username,
        email,
        hashPassword
    })
    newUser.save();
    console.log(newUser);
    
    try{
        const newUser = new User({username,email,password})
        await newUser.save();
        console.log("newUser is:",newUser);
        
    }
    catch(error){

    }
    
});

app.post("/login",async (req,res)=>{
    const{email,password}= req.body;

    if(!username||!password){
        res.status(404).send("all fields required");
    };
    const available = await newSchema.findOne({email});
    if(available){
        const userLogin = await bcrypt.compare(available.password = password);

    }
    const accessToken = jwt.sign({},{JWT_SECRET},{expiresIn:2m});
    const refreshToken = jwt.sign({},{JWT_SECRET},{expiresIn:7d});

});




















//server listen
app.listen(port,(req,res)=>{
    console.log( "server running at" +port);
    
});