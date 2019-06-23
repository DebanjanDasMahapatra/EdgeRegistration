const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const scheme = require('../schema/schema');
const User = mongoose.model("User", scheme.schema);
const TBug = mongoose.model("Bughunt", scheme.schemaB);

router.get('/getEligibles', (req, res) => {
    User.find({ "events.bughunt": true }, (err, data) => {
        if (data) {
            console.log("Retrieved Bughunt Participants");
            res.status(200).send(data);
        }
        if (err) {
            console.log("Problem Retrieving Bughunt Participants");
            res.status(200).send(err);
        }
    });
});

router.get('/getTeams', (req, res) => {
    TBug.find({}, (err, data) => {
        if (data) {
            console.log("Retrieved Bughunt Teams");
            res.status(200).send(data);
        }
        if (err) {
            console.log("Problem Retrieving Bughunt Teams");
            res.status(200).send(err);
        }
    });
});

router.post('/addTeam', (req, res) => {
    res.status(200).send({ 'POST': 'bughunt team' });
    var myData = new TBug(req.body);
    myData.save().then(item => { console.log("Saved"); })
        .catch(err => { console.log("Error:" + err); });
});

router.post('/addTeamMem', (req, res) => {
    res.status(200).send({ 'POST': 'bughunt add member' });
    console.log("datas: ", req.body);
    if (req.body.emptyMember == "mem2")
        TBug.findOneAndUpdate({ "_id": req.body.id }, { $set: { "members.mem2": req.body.value } }).then(item => {
            console.log("Saved member 2");
        })
            .catch(err => {
                console.log("Error:" + err);
            });
});

router.post('/delTeamMem', (req, res) => {
    res.status(200).send({ 'POST': 'bughunt remove member' });
    console.log("datas: ", req.body);
    TBug.findOneAndUpdate({ "_id": req.body.id }, { $set: { "members.mem1": req.body.m1, "members.mem2": req.body.m2 } }).then(item => {
        console.log("Removed member");
    })
        .catch(err => {
            console.log("Error:" + err);
        });
});

router.post('/delTeam', (req, res) => {
    res.status(200).send({ 'POST': 'bughunt delete team' });
    console.log("datas: ", req.body);
    TBug.findOneAndDelete({ "_id": req.body.id }).then(
        item => {
            console.log("Deleted bughunt Team");
        })
        .catch(err => {
            console.log("Error:" + err);
        }
        );
});

module.exports = router;