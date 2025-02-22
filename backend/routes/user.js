//  start writing your code from here
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const userRouter = express.Router();

// Signup
userRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    console.log("Request body:", req.body);

    try {
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error });
    }
});

// Signin
userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token:token, id:user._id });
    } catch (error) {
        res.status(500).json({ message: "Error signing in", error });
    }
});

module.exports = userRouter;
