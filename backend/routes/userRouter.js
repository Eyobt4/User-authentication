const express = require("express");
const { signup,login,secret } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
// router.route("/login",protect).post(login);
router.get("/secret",protect,secret);

module.exports = router;