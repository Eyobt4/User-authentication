const bcrypt = require("bcrypt");
const User = require("../models/User");

//signup user
const signup =  async (req,res)=>{
    //recive the req
    const {username,email,password} = req.body;
    console.log(req.body);
    
    //check if the fields are empty
    if(!username||!email||!password){
        res.status(400);
        res.send("all fields manadatory");
    };
    //check if the email available
    const isAvailable = await User.findOne({email});
    if (isAvailable){
        res.status(400);
        res.send("user already exist");
    };
    //hash password
    const hashPassword = await bcrypt.hash(password,10);
    //create the user
    const newUser = await User.create({
        username,
        email,
        password:hashPassword,
    });
    newUser.save();
    res.status(201).send("user succesfuly created");
    console.log("user succesfuly created");
};

//login user
const login  = async(req,res)=>{
    const {email,password} = req.body;

    if(!email||!password){
        res.status(400).send("error");
    }

    const isAvailable = await User.findOne({email});
    if (!isAvailable){
         res.status(400).send("user not available");
    }
    const user = await bcrypt.compare(password,isAvailable.password);
    if(user){
        res.status(201).send("user succesfuly logged in");
        console.log("user succesfuly logged in");
    }
    else{
        res.status(401).send("invalid credential");
        console.log("invalid credential");
    }
};

module.exports = {signup,login};