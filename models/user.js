const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/users.json');
const profilesFilePath = path.join(__dirname, '../database/profiles.json');

// Helper function to read JSON file
function readJSONFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write JSON file
function writeJSONFile(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// User authentication functions
function registerUser(username, password) {
    const users = readJSONFile(usersFilePath);
    users.push({ username, password });
    writeJSONFile(usersFilePath, users);
    return { message: 'User registered successfully!' };
}

function loginUser(username, password) {
    const users = readJSONFile(usersFilePath);
    const user = users.find(u => u.username === username && u.password === password);
    return user ? { message: 'Login successful!' } : null;
}

// User profile functions
function createProfile(username, profileData) {
    const profiles = readJSONFile(profilesFilePath);
    profiles.push({ username, ...profileData });
    writeJSONFile(profilesFilePath, profiles);
    return { message: 'Profile created successfully!' };
}

function getProfile(username) {
    const profiles = readJSONFile(profilesFilePath);
    return profiles.find(profile => profile.username === username);
}

function updateProfile(username, updatedData) {
    const profiles = readJSONFile(profilesFilePath);
    const index = profiles.findIndex(profile => profile.username === username);
    if (index !== -1) {
        profiles[index] = { ...profiles[index], ...updatedData };
        writeJSONFile(profilesFilePath, profiles);
        return { message: 'Profile updated successfully!' };
    }
    return { message: 'Profile not found!' };
}

module.exports = {
    registerUser,
    loginUser,
    createProfile,
    getProfile,
    updateProfile
};
