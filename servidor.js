const http = require("http");
const express = require("express");
const app = express();
var path = require('path');

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/assets/css/main.css');
    res.sendFile(__dirname + 'images/9132pawprint.ico');
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));
