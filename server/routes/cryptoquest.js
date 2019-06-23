const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const scheme = require('../schema/schema');
const User = mongoose.model("User", scheme.schema);
const TCrypt = mongoose.model("Cryptoquest", scheme.schemaC);

router.get('/getEligibles', function(req, res) {
    User.find({"events.cryptoquest": true}, function(err, data){
        console.log("Retrieved Cryptoquest Participants");
        res.status(200).send(data);
    });
});

router.get('/getTeams', function(req, res) {
    TCrypt.find({}, function(err, data){
        console.log("Retrieved Cryptoquest Teams");
        res.status(200).send(data);
    });
});

router.post('/addTeam', function(req, res) {
    res.status(200).send({'POST':'cryptoquest team'});
    var myData = new TCrypt(req.body);
    myData.save().then(item => { console.log("Saved");  })
    .catch(err => { console.log("Error:"+err);  });
});

router.post('/addTeamMem', function(req, res) {
    res.status(200).send({'POST':'cryptoquest add member'});
    console.log("datas: ",req.body);
    if(req.body.emptyMember == "mem2")
    TCrypt.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem2": req.body.value}}).then(item => {
        console.log("Saved member 2");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});

router.post('/delTeamMem', function(req, res) {
    res.status(200).send({'POST':'cryptoquest remove member'});
    console.log("datas: ",req.body);
    TCrypt.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem1": req.body.m1, "members.mem2": req.body.m2}}).then(item => {
        console.log("Removed member");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});

router.post('/delTeam', function(req, res) {
    res.status(200).send({'POST':'cryptoquest delete team'});
    console.log("datas: ",req.body);
    TCrypt.findOneAndDelete({"_id": req.body.id}).then(
        item => {
            console.log("Deleted cryptoquest Team");
        })
        .catch(err => {
            console.log("Error:"+err);
        }
    );
});

module.exports = router;