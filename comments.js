// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Import functions
const { getComments, addComment } = require('./comments.js');

// Create web application
const app = express();

// Set view engine
app.set('view engine', 'ejs');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create route
app.get('/', (req, res) => {
    getComments((err, comments) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            res.render('index', { comments });
        }
    });
});

app.post('/', (req, res) => {
    const { name, comment } = req.body;
    addComment(name, comment, (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            res.redirect('/');
        }
    });
});

// Start web server
app.listen(3000, () => {
    console.log('Web server running on port 3000');
});
