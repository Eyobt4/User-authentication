const express = require("express");
const cors = require("cors");
require("dotenv").config();

// server.ts
import { express } from "express"
import { ExpressAuth } from "@auth/express"
import GitHub from "@auth/express/providers/github"
app.use("/auth/*", ExpressAuth({ providers: [GitHub] }))

const app = express();

app.use(cors);
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API is working");
});

app.listen(port,(req,res)=>{
    console.log( `server running at ${port}`);
    
})