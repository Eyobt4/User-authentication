import express from "express";
import {ExpressAuth} from "@auth/express";
import Credentials from "@auth/express/providers/credentials";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // Your MongoDB User model

export const authRouter = express.Router();

authRouter.use(
  ExpressAuth({
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const { email, password } = credentials;

          // Find user in MongoDB
          const user = await User.findOne({ email });
          if (!user) throw new Error("User not found");

          // Compare password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) throw new Error("Invalid password");

          // Return user object (without password)
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        },
      }),
    ],
    session: { strategy: "jwt" }, // Or "database" if you store sessions
    secret: process.env.AUTH_SECRET, // Add this in .env
    csrf: false,
  })
);
export default authRouter;