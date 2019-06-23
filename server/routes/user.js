const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const scheme = require('../schema/schema');
const User = mongoose.model("User", scheme.schema);
const TFlaw = mongoose.model("Flawless", scheme.schemaF);
const TBug = mongoose.model("Bughunt", scheme.schemaB);
const TCrypt = mongoose.model("Cryptoquest", scheme.schemaC);
const TWeb = mongoose.model("Webdesign", scheme.schemaW);

router.get('/fetch', function(req, res) {
    User.find({}, function(err, data){
        console.log("Retrieved Users");
        res.status(200).send(data);
    });
});

router.post('/enroll', function(req, res) {
    var myData = new User(req.body);
    myData.save().then(item => {
        res.status(200).send({'POST':'registration'});
        console.log("Saved");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});

router.post('/change', function(req, res) {
    res.status(200).send({'POST':'User Update'});
    var myData = new User(req.body.prev);
    User.updateOne({"_id": req.body.id},{$set: {"name": myData.name, "college": myData.college, "stream": myData.stream, "contact": myData.contact,
"events.flawless": myData.events.flawless,"events.bughunt": myData.events.bughunt,"events.cryptoquest": myData.events.cryptoquest,"events.webdesign": myData.events.webdesign}}).then(
        item => {
            console.log("Saved");
        })
        .catch(err => {
            console.log("Error:"+err);
        }
    );
});

router.post('/delete', function(req, res) {
    res.status(200).send({'POST':'User Delete'});
    console.log(req.body.id);
    User.findOne({"_id": req.body.id}, function(err, data){
        console.log("Retrieved Flawless Participants");
        TFlaw.findOneAndDelete({$or:[{"members.mem1": data.name},{"members.mem2": data.name},{"members.mem3": data.name}]}).then(
            item => { console.log("Deleted Flawless Team(s)"); })
            .catch(err => { console.log("Error:"+err); }
        );
        TBug.findOneAndDelete({$or:[{"members.mem1": data.name},{"members.mem2": data.name}]}).then(
            item => { console.log("Deleted Bughunt Team(s)"); })
            .catch(err => { console.log("Error:"+err); }
        );
        TCrypt.findOneAndDelete({$or:[{"members.mem1": data.name},{"members.mem2": data.name}]}).then(
            item => { console.log("Deleted Cryptoquest Team(s)"); })
            .catch(err => { console.log("Error:"+err); }
        );
        TWeb.findOneAndDelete({$or:[{"members.mem1": data.name},{"members.mem2": data.name}]}).then(
            item => { console.log("Deleted Webdesign Team(s)"); })
            .catch(err => { console.log("Error:"+err); }
        );
    });
    User.findOneAndDelete({"_id": req.body.id}).then(
        item => {
            console.log("Deleted User");
        })
        .catch(err => {
            console.log("Error:"+err);
        }
    );
});

module.exports = router;