const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const connectDB = require("./config/connectDB");
const app = express();
// const cookieParser =require( "cookie-parser");
const userRouter = require("./routes/userRouter");
const auth = require("./auth");
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const protect = require("./middleware/authMiddleware");

// database connection
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

//moongose db schema
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
},);

const postSchema = mongoose.Schema({
    post:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});


const newModel = mongoose.model("Model",newSchema);
const newPost  = mongoose.model("postModel",postSchema);


app.get("/",(req,res)=>{
    res.send("API is working");
});

// signup route
app.post("/signup",async (req,res)=>{
    const {username,email,password} = req.body;
    console.log(req.body);

    if(!username||!password){
        return res.status(404).send("all fields required");
    };
    const available = await newModel.findOne({email});
    if(available){
        return res.status(404).send("user already exist");
    };
    console.log(req.body);
    
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = await newModel.create({
        username,
        email,
        password:hashPassword,
    });
    newUser.save();
    console.log(newUser);
    return res.status(200).send("account successfuly created");
    
});

// login route
app.post("/login",async (req,res)=>{
    const{email,password}= req.body;

    if(!email||!password){
        res.status(404).send("all fields required");
    };
    const available = await newModel.findOne({email});
    if(!available){
        
        res.status(404).json("Invalid Email or Password");
        
        // console.log("workkkking");
    };
    const userLogin = await bcrypt.compare(password,available.password);
    if(userLogin){

        const accessToken = jwt.sign({id:userLogin},process.env.JWT_SECRET,{expiresIn:'5m'});
        const refreshToken = jwt.sign({id:userLogin},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).json({message:"Login successful"});
        
    }
    else{
        res.status(404).send("Invalid Credential");
    }

});

// protected route
app.get("/protected",protect,(req,res)=>{
    try{
        
        console.log("you are in protected page");
        return res.status(200).send("you are in protected page")
    }
    catch(error){
        console.log("error"+ error)
    }
});

//create post
app.post("/createblog",async(req,res)=>{
    const{post,author} = req.body;
    const postUser  = await newPost.create({
        post,
        author,
    });
    postUser.save();
    return res.status(200).json({message:"blog posted"});
});

// get posts
app.get("/blogs",async(req,res)=>{
 
    // const blog = await newPost.findOne({}); for single blog
    const blog = await newPost.find({});
    console.log(blog);

    if(blog){
        return res.status(200).json(blog);
    }
    else{
        return res.status(400).json({message:"can't get the post"});
    }
});

// Update post
app.patch("/editBlog",async(req,res)=>{
 
    // const blog = await newPost.findOne({}); for single blog
    const blog = await newPost.find({});
    console.log(blog);

    if(blog){
        return res.status(200).json(blog);
    }
    else{
        return res.status(400).json({message:"can't get the post"});
    }
});




// Delete post


// logout route
app.post("/logout",protect,(req,res)=>{
    
    console.log(req.username + "Logged out");
    res.status(200).send("Logged out")
});


//server listen
app.listen(port,(req,res)=>{
    console.log( "server running at" +port);
    
});