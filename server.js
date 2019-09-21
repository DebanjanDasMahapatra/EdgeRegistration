const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//const uri = "mongodb://localhost/test";
const uri = "mongodb+srv://debanjan_01:debanjan@firstcluster-yy6sf.mongodb.net/test?retryWrites=true";
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.on('open', () => {
    console.log("Connected to the Data Base");
});
mongoose.connection.on('error', () => {
    console.log("Error connecting to the Data Base");
});

const user = require("./routes/user");
const flawless = require("./routes/flawless");
const bughunt = require("./routes/bughunt");
const cryptoquest = require("./routes/cryptoquest");
const webdesign = require("./routes/webdesign");
const admin = require("./routes/admin");

const logRequestStart = (req, res, next) => {
    console.info(req.method + ' ' + req.originalUrl + ' ' + res.statusCode);
    next();
};

const PORT = 3400;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '\\public'));
app.use(logRequestStart);

app.use('/user', user);
app.use('/flawless', flawless);
app.use('/bughunt', bughunt);
app.use('/cryptoquest', cryptoquest);
app.use('/webdesign', webdesign);
app.use('/admin', admin);

app.get('*', (req, res) => {
    if(fs.existsSync(__dirname + '/public/index.html'))
        res.sendFile(__dirname + '/public/index.html');
    else
        res.sendFile(__dirname + '/error_pages/index.html');
});

app.listen(PORT, function () {
    console.log("Server is running on port " + PORT);
});