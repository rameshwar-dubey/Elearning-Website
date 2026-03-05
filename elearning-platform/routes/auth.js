const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "mysecretkey";

        //register
router.get("/register", (req, res) => {
    res.render("register");
});

            //rehister login
router.post("/register", async (req, res) => {

 const { name, email, password } = req.body;

 const existingUser = await User.findOne({ email });

 if (existingUser) {
  return res.send("User already exists");
 }

 const hashedPassword = await bcrypt.hash(password, 10);

 const user = await User.create({
  name,
  email,
  password: hashedPassword
 });

 // JWT token generate
 const token = jwt.sign(
  { id: user._id },
  "mysecretkey",
  { expiresIn: "1d" }
 );

 // cookie set
 res.cookie("token", token, { httpOnly: true });

 // dashboard pe redirect
 res.redirect("/dashboard");

});

            // login
router.get("/login", (req, res) => {
    res.render("login");
    //  res.send("Please login first");
});

// login logic
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.send("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.send("Invalid credentials");
    }

    const token = jwt.sign(
        { id: user._id },
        JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
});

//  Dashboard
router.get("/dashboard", async (req, res) => {
    const subjects = await require("../models/Subject").find();
    res.render("dashboard", { subjects });
    // res.json(subjects);
});

// logout
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

module.exports = router;