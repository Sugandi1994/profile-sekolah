const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const schoolProfilePath = path.join(__dirname, '../public/school-profile.html');

// Helper function to read HTML file
function readHTMLFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        return null;
    }
}

// Helper function to write HTML file
function writeHTMLFile(filePath, content) {
    fs.writeFileSync(filePath, content, 'utf8');
}

// Get current school profile content
router.get('/content', (req, res) => {
    const content = readHTMLFile(schoolProfilePath);
    if (content) {
        res.status(200).send(content);
    } else {
        res.status(500).json({ message: 'Failed to read school profile content!' });
    }
});

// Update school profile content
router.post('/update', (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ message: 'Content is required!' });
    }

    try {
        writeHTMLFile(schoolProfilePath, content);
        res.status(200).json({ message: 'School profile updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update school profile!' });
    }
});

// Get specific sections for editing
router.get('/sections', (req, res) => {
    const content = readHTMLFile(schoolProfilePath);
    if (!content) {
        return res.status(500).json({ message: 'Failed to read school profile content!' });
    }

    // Extract sections using regex (simplified approach)
    const schoolInfoMatch = content.match(/<section class="school-info">([\s\S]*?)<\/section>/);
    const visionMissionMatch = content.match(/<section class="vision-mission">([\s\S]*?)<\/section>/);
    const facilitiesMatch = content.match(/<section class="facilities">([\s\S]*?)<\/section>/);

    const sections = {
        schoolInfo: schoolInfoMatch ? schoolInfoMatch[0] : '',
        visionMission: visionMissionMatch ? visionMissionMatch[0] : '',
        facilities: facilitiesMatch ? facilitiesMatch[0] : ''
    };

    res.status(200).json(sections);
});

// Update specific section
router.post('/update-section', (req, res) => {
    const { sectionName, sectionContent } = req.body;
    if (!sectionName || !sectionContent) {
        return res.status(400).json({ message: 'Section name and content are required!' });
    }

    const content = readHTMLFile(schoolProfilePath);
    if (!content) {
        return res.status(500).json({ message: 'Failed to read school profile content!' });
    }

    try {
        // Replace the specific section with new content
        const updatedContent = content.replace(
            new RegExp(`<section class="${sectionName}">[\\s\\S]*?<\\/section>`),
            sectionContent
        );

        writeHTMLFile(schoolProfilePath, updatedContent);
        res.status(200).json({ message: 'Section updated successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update section!' });
    }
});

module.exports = router;
