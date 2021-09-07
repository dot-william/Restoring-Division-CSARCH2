const dotenv = require(`dotenv`);
const express = require('express');


const app = express();

dotenv.config();
var port = process.env.PORT;
var hostname = process.env.HOSTNAME;

app.get(`/`, function (req, res) {
    res.send("Hello world.");
});


app.listen(port, hostname, function() {
    console.log("Server running at: ");
    console.log("http://" + hostname + ":" + port);
});