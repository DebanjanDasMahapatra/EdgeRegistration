const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const JSAlert = require("js-alert");
mongoose.Promise = global.Promise;
t = mongoose.connect("mongodb://localhost:27017/test",{ useNewUrlParser: true });
const scheme = require('./schema/schema');
var User = mongoose.model("User", scheme.schema);
var TFlaw = mongoose.model("Flawless", scheme.schemaF);
var TCrypt = mongoose.model("Cryptoquest", scheme.schemaC);
var TWeb = mongoose.model("Webdesign", scheme.schemaW);
console.log(t);

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get('/', function(req, res) {
    res.send("Hello and welcome to Express server !!!");
});
app.post('/enroll', function(req, res) {
    //res.send(req.body);
    res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    var myData = new User(req.body);
    myData.save().then(item => {
        console.log("Item saved to database"+item);
    })
    .catch(err => {
        console.log("unable to save to database"+err);
    });
});
app.post('/teamFlawless', function(req, res) {
    //res.send(req.body);
    res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    var myData = new TFlaw(req.body);
    myData.save().then(item => {
        console.log("Item saved to database"+item);
    })
    .catch(err => {
        console.log("unable to save to database"+err);
    });
});
app.post('/teamCryptoquest', function(req, res) {
    //res.send(req.body);
    res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    var myData = new TCrypt(req.body);
    myData.save().then(item => {
        console.log("Item saved to database"+item);
    })
    .catch(err => {
        console.log("unable to save to database"+err);
    });
});
app.post('/teamWebdesign', function(req, res) {
    //res.send(req.body);
    res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    var myData = new TWeb(req.body);
    myData.save().then(item => {
        console.log("Item saved to database"+item);
    })
    .catch(err => {
        console.log("unable to save to database"+err);
    });
});
app.get('/fetch', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    User.find({}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.get('/fetchFlawless', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    User.find({"events.flawless": true}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.get('/fetchFlawlessTeam', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    TFlaw.find({}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.get('/fetchBughunt', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    User.find({"events.bughunt": true}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.get('/fetchCryptoquest', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    User.find({"events.cryptoquest": true}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.get('/fetchCryptoquestTeam', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    TCrypt.find({}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.get('/fetchWebdesign', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    User.find({"events.webdesign": true}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.get('/fetchWebdesignTeam', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    TWeb.find({}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.listen(PORT, function() {
    console.log("Server is running on port "+PORT);
});