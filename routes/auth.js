const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../models/user');

// Registration route
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const result = registerUser(username, password);
    res.status(201).json(result);
});

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const result = loginUser(username, password);
    if (result) {
        res.status(200).json(result);
    } else {
        res.status(401).json({ message: 'Invalid credentials!' });
    }
});

module.exports = router;
