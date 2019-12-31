let express = require('express');

let app = express();
let friendListRoute = require('./routes/friendList');
let requestRoute = require('./routes/request');
let path = require('path');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let database = require('../db');

database.connect();

app.use(bodyParser.json());

// Middleware to show logs of every call
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    next();
});

app.use(friendListRoute);
app.use(requestRoute);

app.use(express.static('public'));

// Handler for 404 - Resource not found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost!');
});

// Handler for error 500
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.sendFile(path.join(__dirname, '../public/500.html'));
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));

module.exports = app;