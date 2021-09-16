const dotenv = require(`dotenv`);
const express = require('express');
const bodyParser = require('body-parser');
const path = require(`path`);
const exphbs  = require('express-handlebars');

const app = express(); //express api

app.use(bodyParser.urlencoded({ extended: false }));

//Setting up dotenv
dotenv.config();
var port = process.env.PORT;
var hostname = process.env.HOSTNAME;

// Static Files
app.use(express.static('public'));

//Setting up HBS
const hbs = exphbs.create({
    extname: '.hbs'
});
app.engine('hbs', hbs.engine)
app.set('view engine', '.hbs')

// Default home page
app.get('/', function(req, res) {
    res.render('restoring-division', {
        layout:false
    });
});

//When user requests for  page that doesn't exist
app.use(function(req, res) {
    res.status(404).send("Invalid access, please return back to the home page");
});

app.listen(port, hostname, function() {
    console.log("Server running at: ");
    console.log("http://" + hostname + ":" + port);
});