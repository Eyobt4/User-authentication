const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session")
const User = require("./models/User");
const connectDB = require("./config/connectDB");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const { authRouter } =require("./auth");
const userRouter = require("./routes/userRouter")

const port = process.env.PORT;

connectDB();
app.get("/",(req,res)=>{
    res.send("API is working");
});
app.use("/api/auth",userRouter);
// app.use("/api/auth", authRouter);

//protected route /dashboard
app.get("/dashbard",(req,res)=>{
            if(req.session.user){
                res.send("welcome back"+ req.session.user.id);
}
    else{
        res.status(401);
        res.send("Unauthorized route");
    }
});

app.listen(port,(req,res)=>{
    console.log( "server running at" +port);
    
});