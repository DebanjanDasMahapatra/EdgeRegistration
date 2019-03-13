const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const JSAlert = require("js-alert");
mongoose.Promise = global.Promise;
t = mongoose.connect("mongodb://localhost:27017/test",{ useNewUrlParser: true });
var nameSchema = new mongoose.Schema({
    name: String,
    college: String,
    stream: String,
    contact: Number,
   });
var User = mongoose.model("User", nameSchema);
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
app.get('/fetch', function(req, res) {
    //res.send(req.body);
    //res.status(200).send({'message':'Data received'});
    JSAlert.alert('Data received !!!');
    User.find({}, function(err, data){
        console.log(">>>> " + data );
        res.status(200).send(data);
    });
});
app.listen(PORT, function() {
    console.log("Server is running on port "+PORT);
});