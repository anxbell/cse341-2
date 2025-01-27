const express = require('express');
const path = require('path');
const fs = require('fs'); // Add fs module to read files
const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'frontend' folder
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

// API for professional data
app.get('/professional', (req, res) => {
    const filePath = path.join(__dirname, 'professionals.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.listen(8080, () => {
  console.log(`Server is running on port ${port}`);
});
