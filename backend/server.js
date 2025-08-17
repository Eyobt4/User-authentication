const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const connectDB = require("./config/connectDB");
const app = express();
const cookieParser =require( "cookie-parser");
const userRouter = require("./routes/userRouter");
const auth = require("./auth");
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const protect = require("./middleware/authMiddleware");

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
},
);

const newModel = mongoose.model("Model",newSchema);


app.get("/",(req,res)=>{
    res.send("API is working");
});

//protected route /dashboard
app.post("/signup",async (req,res)=>{
    const {username,email,password} = req.body;
    if(!username||!password){
        res.status(404).send("all fields required");
    };
    const available = await newModel.findOne({email});
    if(available){
        res.status(404).send("user already exist");
    };
    console.log(req.body);
    
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await newModel.create({
        username,
        email,
        password:hashPassword,
    });
    newUser.save();
    res.status(200).send("account successfuly created");
    console.log(newUser);
    console.log(hashPassword);
    
    // try{
    //     const newUser = new User({username,email,password})
    //     await newUser.save();
    //     console.log("newUser is:",newUser);
        
    // }
    // catch(error){
    // }
    
});

app.post("/login",async (req,res)=>{
    const{email,password}= req.body;

    if(!email||!password){
        res.status(404).send("all fields required");
    };
    const available = await newModel.findOne({email});
    if(!available){
        
        res.status(404).send("all fields required");
        
        // console.log("workkkking");
    };
    const userLogin = await bcrypt.compare(password,available.password);
    if(userLogin){

        const accessToken = jwt.sign({id:userLogin},"yourStrongSecretHere",{expiresIn:5});
        const refreshToken = jwt.sign({id:userLogin},"yourStrongSecretHere",{expiresIn:7});
        res.status(200).send("Login successful");
        console.log(accessToken);
        console.log(refreshToken);
        
    }
    else{
        res.status(404).send("Invalid Credential");
    }

});

app.get("/protected",protect,(req,res)=>{
    res.status(200).send("you are in protected page")
    console.log("you are in protected page");
});















//server listen
app.listen(port,(req,res)=>{
    console.log( "server running at" +port);
    
});