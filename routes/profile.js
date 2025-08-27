const express = require('express');
const router = express.Router();
const { createProfile, getProfile, updateProfile } = require('../models/user');

// Create profile route
router.post('/create', (req, res) => {
    const { username, ...profileData } = req.body;
    const result = createProfile(username, profileData);
    res.status(201).json(result);
});

// Get profile route
router.get('/:username', (req, res) => {
    const { username } = req.params;
    const profile = getProfile(username);
    if (profile) {
        res.status(200).json(profile);
    } else {
        res.status(404).json({ message: 'Profile not found!' });
    }
});

// Update profile route
router.put('/:username', (req, res) => {
    const { username } = req.params;
    const updatedData = req.body;
    const result = updateProfile(username, updatedData);
    res.status(200).json(result);
});

module.exports = router;
