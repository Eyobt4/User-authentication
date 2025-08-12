// import { betterAuth } from "better-auth";
// import { MongoDBAdapter } from "@better-auth/mongodb";
// import mongoose from "mongoose";

// await mongoose.connect(process.env.MONGO_URI);

// export const auth = betterAuth({
//   adapter: MongoDBAdapter({
//     uri: process.env.MONGO_URI,
//     databaseName: "myAuthDB", // optional, default is from URI
//   }),
//   secret: process.env.AUTH_SECRET,
// });
const { betterAuth } = require("better-auth");
const { MongoClient } = require("mongodb");
const { mongodbAdapter } = require("better-auth/adapters/mongodb");
 
const client = new MongoClient("mongodb+srv://eyobtesfaye838:eyob838@auth-cluster.cffb4ie.mongodb.net/");
const db = client.db();
 
const auth = betterAuth({
  database: mongodbAdapter(db),
});

module.exports = auth;
// const { betterAuth } = require("better-auth");
// const bcrypt = require("bcrypt");
// const User = require("./models/User");
// const Session = require("./models/Session");

// const auth = betterAuth({
//   emailAndPassword: { enabled: true },

//   createUser: async ({ email, password }) => {
//     const passwordHash = await bcrypt.hash(password, 10);
//     return await User.create({ email, passwordHash });
//   },

//   findUserByEmail: async (email) => {
//     return await User.findOne({ email });
//   },

//   createSession: async ({ userId, token, expiresAt }) => {
//     return await Session.create({ userId, token, expiresAt });
//   },

//   findSession: async (token) => {
//     return await Session.findOne({ token });
//   },

//   deleteSession: async (token) => {
//     return await Session.deleteOne({ token });
//   },
// });

// module.exports = auth;
