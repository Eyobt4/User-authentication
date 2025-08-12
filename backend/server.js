const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const app = express();
const cookieParser =require( "cookie-parser");
const userRouter = require("./routes/userRouter");
const auth = require("./auth");
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

app.get("/",(req,res)=>{
    res.send("API is working");
});
// app.use("/api/auth",userRouter);

//protected route /dashboard
app.get("/signup",(req,res)=>{
    res.status(200);
    res.json({message:"signup sucessful"})       
    
});


//server listen
app.listen(port,(req,res)=>{
    console.log( "server running at" +port);
    
});