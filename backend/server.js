const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session")
// const auth = require("../auth");
const User = require("./models/User");
const app = express();

//session
// app.use(cors);
// app.use(express.json());
// app.use(
//     session({
//         secret: "supersecretkey",
//         resave: false,
//         saveUninitialized: true,
//         cookie: {secure:false},
//     })
// );
// app.use("/auth",auth);
// app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.send("API is working");
});
const port = process.env.PORT;

//signup user
app.post("/signup",(req,res)=>{
    //recive the req
    const {username,email,password} = req.body;
    //check if the fields are empty
    if(!username||!email||!password){
        res.status(400);
        res.send("all fields manadatory");
    };
    //check if the email available
    const isAvailable = User.findOne({email});
    if (isAvailable){
        res.status(400);
        res.send("user already exist");
    };
    //hash password
    const hashPassword = bcrypt.hash(password,10);
    //create the user
    const newUser = User.create({
        username,
        email,
        hashPassword,
    });
    newUser.save();
    res.status(201).send("user succesfuly created");
    console.log("user succesfuly created");
});

//login user
app.post("/login",(req,res)=>{
    
});
//update user
//delete user
//connecting the database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
.then(()=>console.log("mongoDB connected"+ connect.connection.name))
.catch(()=>console.log("mongoDB connection error"));

// protected /dashbord route
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