"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var app = express();
// Middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
// File options
var OPTIONS = {
    root: path.join(__dirname, 'public'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};
// Home page
app.get('/', function (req, res, next) {
    console.log('Request for Home page started!');
    res.sendFile('/pages/index.html', OPTIONS, function (error) {
        if (error)
            next(error);
    });
});
// About page
app.get('/about', function (req, res, next) {
    console.log('Request for About page started!');
    res.sendFile('/pages/about.html', OPTIONS, function (error) {
        if (error)
            next(error);
    });
});
// Contact page
app.get('/contact-me', function (req, res, next) {
    console.log('Request for Contacts page started!');
    res.sendFile('/pages/contact-me.html', OPTIONS, function (error) {
        if (error)
            next(error);
    });
});
// Error handler
app.get('*', function (req, res, next) {
    console.log('Request for 404 page started!');
    res.sendFile('/pages/404.html', OPTIONS, function (error) {
        if (error)
            next(error);
    });
});
// Starting code
app.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});
