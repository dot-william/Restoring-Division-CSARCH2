const dotenv = require(`dotenv`);
const express = require('express');
const bodyParser = require('body-parser');
const path = require(`path`);
const exphbs  = require('express-handlebars');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();
var port = process.env.PORT;
var hostname = process.env.HOSTNAME;

// Static Files
app.use(express.static('public'));

const hbs = exphbs.create({
    extname: '.hbs'
});

app.engine('hbs', hbs.engine)
app.set('view engine', '.hbs')

app.get("/", function(req, res) {
    res.render('restoring-division', {
        layout:false
    });
});

app.listen(port, hostname, function() {
    console.log("Server running at: ");
    console.log("http://" + hostname + ":" + port);
});