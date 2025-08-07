const { ExpressAuth } = require("@auth/express");
const GitHub = require("@auth/core/providers/github").default;
const Credentials = require("@auth/core/providers/credentials").default;

const User = require("./backend/models/User"); // your mongoose user model

const auth = ExpressAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isMatch = user.password === credentials.password; // You should hash passwords in production!
        if (!isMatch) return null;

        return {
          id: user._id.toString(),
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: "supersecretkey", // move to .env for production
});

module.exports = auth;
