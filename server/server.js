const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const localuri = "mongodb://10.10.101.187/test";
mongoose.connect(localuri,{ useNewUrlParser: true });
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

const logRequestStart = (req, res, next) => {
    console.info(req.method+' '+req.originalUrl+' '+res.statusCode);
    next();
};

const PORT = 80;
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

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function() {
    console.log("Server is running on port "+PORT);
});