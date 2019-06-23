const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const scheme = require('../schema/schema');
const User = mongoose.model("User", scheme.schema);
const TFlaw = mongoose.model("Flawless", scheme.schemaF);

router.get('/getEligibles', function(req, res) {
    User.find({"events.flawless": true}, function(err, data){
        console.log("Retrieved Flawless Participants");
        res.status(200).send(data);
    });
});

router.get('/getTeams', function(req, res) {
    TFlaw.find({}, function(err, data){
        console.log("Retrieved Flawless Teams");
        res.status(200).send(data);
    });
});

router.post('/addTeam', function(req, res) {
    res.status(200).send({'POST':'flawless team'});
    var myData = new TFlaw(req.body);
    myData.save().then(item => { console.log("Saved");  })
    .catch(err => { console.log("Error:"+err);  });
});

router.post('/addTeamMem', function(req, res) {
    res.status(200).send({'POST':'flawless add member'});
    console.log("datas: ",req.body);
    if(req.body.emptyMember == "mem2")
    TFlaw.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem2": req.body.value}}).then(item => {
        console.log("Saved member 2");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
    if(req.body.emptyMember == "mem3")
    TFlaw.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem3": req.body.value}}).then(item => {
        console.log("Saved member 3");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});

router.post('/delTeamMem', function(req, res) {
    res.status(200).send({'POST':'flawless remove member'});
    console.log("datas: ",req.body);
    TFlaw.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem1": req.body.m1, "members.mem2": req.body.m2, "members.mem3": req.body.m3}}).then(item => {
        console.log("Removed member");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});

router.post('/delTeam', function(req, res) {
    res.status(200).send({'POST':'flawless delete team'});
    console.log("datas: ",req.body);
    TFlaw.findOneAndDelete({"_id": req.body.id}).then(
        item => {
            console.log("Deleted Flawless Team");
        })
        .catch(err => {
            console.log("Error:"+err);
        }
    );
});

module.exports = router;