const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const cors = require('cors'); //
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
//in order to frontend work
app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

// middleware
app.use(cors());

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//new contacts route 
const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);


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

//Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//CORS
const corsOptions = {
  origin: ['https://cse341-2-35kz.onrender.com', 'https://cse341-contacts-frontend.netlify.app/', 'http://localhost:8080'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

//swagger depencies 
//npm install swagger-ui-express swagger-autogen
//nodemon
//npm install -g nodemon
//npm install --save-dev nodemon
