const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const session = require("express-session")
const auth = require("../auth")
const app = express();

app.use(cors);
app.use(express.json());
app.use(
    session({
        secret: "supersecretkey",
        resave: false,
        saveUninitialized: true,
        cookie: {secure:false},
    })
);
app.use("/auth",auth);
app.get("/",(req,res)=>{
    res.send("API is working");
});
app.use(express.static("public"));
const port = process.env.PORT;

//signup
app.post("/signup",(req,res)=>{
            
});
//login
app.post("/signup",(req,res)=>{
            
});
//connecting the database
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
})
.then(()=>console.log("mongoDB connected"))
.catch(()=>console.log("mongoDB connection error",err));

// protected /dashbord route
app.get("/dashbard",(req,res)=>{
            if(req.session.user){
                res.send("welcome back"+ req.session.user.id);
}
    else{
        res.status(401);
        res.send("Unauthorized");
    }
});

app.listen(port,(req,res)=>{
    console.log( `server running at ${port}`);
    
})