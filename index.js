const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes - defined before static files to take precedence
// Serve the school profile page as the default landing page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/school-profile.html');
});

// Serve the login page for admin access
app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Import API routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Static files - should come after specific routes
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
