const http = require("http");
const express = require("express");
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb+srv://Miguel:1602*p@cluster0-a0mqt.gcp.mongodb.net/test?retryWrites=true&w=majority"
const app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));
// http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + '/index.html');
//     //res.sendFile(__dirname + '/assets/css/main.css');
//     //res.sendFile(__dirname + '/images/9132pawprint.ico');
// });

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('Cluster0')
    
    app.listen(3000, function(){
        console.log("Servidor rodando com sucesso! | porta: 3000!")
    })
  })

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
    // let cursor = db.collection('data').find()
})

app.get("/cadastro", function(req, res) {
    res.render('cadastro.ejs')
    let cursor = db.collection('data').find()
});

app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('index.ejs' /*'show.ejs', { data: results }*/)

    })
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log("Dados salvos no no banco de dados!")
        res.redirect('/show')
        db.collection('data').find().toArray((err, results) => {
            console.log(results)
        })
    })
})

app.get("/login", function(req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.get("/cuidados", function(req, res) {
    res.sendFile(__dirname + '/cuidados.html');
});