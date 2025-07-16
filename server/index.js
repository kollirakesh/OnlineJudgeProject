const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const { DBConnection } = require('./database/db');
const User = require('./models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executeC } = require('./executeC');
const { executePython } = require('./executePython');
const { executeJava } = require('./executeJava');

dotenv.config();
DBConnection();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to home route!");
});

// Online Compiler route
app.post("/run", async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(400).json({ success: false, message: "Empty code body!" });
    }

    try {
        const filePath = await generateFile(language, code);
        let output;
        if (language === 'cpp') {
            output = await executeCpp(filePath);
        } else if (language === 'c') {
            output = await executeC(filePath);
        } else if (language === 'python') {
            output = await executePython(filePath);
        } else if (language === 'java') {
            output = await executeJava(filePath);
        } else {
            return res.status(400).json({ success: false, message: "Unsupported language!" });
        }
        res.json({ filePath, output });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Register route
app.post("/register", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the required fields!");
        }
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).send("User already exists!");
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        user.token = token;
        user.password = undefined;
        res.status(201).json({
            message: "You have successfully registered",
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed", error: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Please fill all the fields");
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid Credentials");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        user.password = undefined;
        return res.status(200).json({
            message: "Login Sucessful",
            user, 
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Internal error"
        });
    }
});

// Token verification endpoint
app.post('/verify-token', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ valid: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        res.json({ valid: true, user: decoded });
    } catch (err) {
        res.status(401).json({ valid: false, message: 'Invalid or expired token' });
    }
});

//Listening Port
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});