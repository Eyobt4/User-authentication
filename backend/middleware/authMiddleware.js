const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "yoursecret";

const protect = (req, res, next) => {
  // const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  const head = req.header("Authorization");
  console.log(head);
  if(!head.startsWith("Bearer")){
    
    return res.status(401).json({ message: "No token, authorization denied" });
  } 
  const token = head.replace("Bearer ","");
  console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Tokennn is not valid" });
  }
};
module.exports = protect;