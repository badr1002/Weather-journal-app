// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { env } = require('process');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`running on localhost${port}`)
});
// Initialize all route with a callback function
app.get('/all', (req, res) => {
    res.send(projectData);
});
// Post Route
app.post('/api', (req, res) => {
    veiwData = {
        city: req.body.city,
        temp: req.body.temp,
        date: req.body.date,
        usrFeelings: req.body.usrFeelings
    };
    projectData.unshift(veiwData);
    res.end();
});