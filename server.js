const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

// Define the Professional model outside the route
const professionalSchema = new mongoose.Schema({
    professionalName: String,
    base64Image: String,
    primaryDescription: String,
    workDescription1: String,
    workDescription2: String,
    nameLink: {
        firstName: String,
        url: String
    },
    linkTitleText: String,
    linkedInLink: {
        text: String,
        link: String
    },
    githubLink: {
        text: String,
        link: String
    }
});

const Professional = mongoose.model('Professional', professionalSchema);

// Serve static files from the 'frontend' folder
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

// API for professional data
app.get('/professional', async (req, res) => {
    try {
        const professionalData = await Professional.findOne(); // Retrieve the first document in the collection
        res.json(professionalData);
    } catch (err) {
        res.status(500).send('Error fetching data from MongoDB');
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
