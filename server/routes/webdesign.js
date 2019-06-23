const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const scheme = require('../schema/schema');
const User = mongoose.model("User", scheme.schema);
const TWeb = mongoose.model("Webdesign", scheme.schemaW);

router.get('/getEligibles', function(req, res) {
    User.find({"events.webdesign": true}, function(err, data){
        console.log("Retrieved Webdesign Participants");
        res.status(200).send(data);
    });
});

router.get('/getTeams', function(req, res) {
    TWeb.find({}, function(err, data){
        console.log("Retrieved Webdesign Teams");
        res.status(200).send(data);
    });
});

router.post('/addTeam', function(req, res) {
    res.status(200).send({'POST':'webdesign team'});
    var myData = new TWeb(req.body);
    myData.save().then(item => { console.log("Saved");  })
    .catch(err => { console.log("Error:"+err);  });
});

router.post('/addTeamMem', function(req, res) {
    res.status(200).send({'POST':'webdesign add member'});
    console.log("datas: ",req.body);
    if(req.body.emptyMember == "mem2")
    TWeb.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem2": req.body.value}}).then(item => {
        console.log("Saved member 2");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});

router.post('/delTeamMem', function(req, res) {
    res.status(200).send({'POST':'webdesign remove member'});
    console.log("datas: ",req.body);
    TWeb.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem1": req.body.m1, "members.mem2": req.body.m2}}).then(item => {
        console.log("Removed member");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});

router.post('/delTeam', function(req, res) {
    res.status(200).send({'POST':'webdesign delete team'});
    console.log("datas: ",req.body);
    TWeb.findOneAndDelete({"_id": req.body.id}).then(
        item => {
            console.log("Deleted webdesign Team");
        })
        .catch(err => {
            console.log("Error:"+err);
        }
    );
});

module.exports = router;