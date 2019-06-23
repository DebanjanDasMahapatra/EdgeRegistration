const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const scheme = require('../schema/schema');
const User = mongoose.model("User", scheme.schema);
const TFlaw = mongoose.model("Flawless", scheme.schemaF);

router.get('/getEligibles', (req, res) => {
    User.find({ "events.flawless": true }, (err, data) => {
        if (data) {
            console.log("Retrieved Flawless Participants");
            res.status(200).json({ status: true, data: data });
        }
        if (err) {
            console.log("Problem Retrieving Flawless Participants");
            res.status(200).json({ status: false, data: err });
        }
    });
});

router.get('/getTeams', (req, res) => {
    TFlaw.find({}, (err, data) => {
        if (data) {
            console.log("Retrieved Flawless Teams");
            res.status(200).json({ status: true, data: data });
        }
        if (err) {
            console.log("Problem Retrieving Flawless Teams");
            res.status(200).json({ status: false, data: err });
        }
    });
});

router.post('/addTeam', (req, res) => {
    var myData = new TFlaw(req.body);
    myData.save().then(item => {
        res.status(200).json({ status: true });
        console.log("Saved");
    })
        .catch(err => {
            console.log("Error:" + err);
            res.status(200).json({ status: false });
        });
});

router.post('/addTeamMem', (req, res) => {
    if (req.body.emptyMember == "mem2")
        TFlaw.findOneAndUpdate({ "_id": req.body.id }, { $set: { "members.mem2": req.body.value } }).then(item => {
            res.status(200).json({ status: true });
            console.log("Saved member 2");
        })
            .catch(err => {
                res.status(200).json({ status: false });
                console.log("Error:" + err);
            });
    if (req.body.emptyMember == "mem3")
        TFlaw.findOneAndUpdate({ "_id": req.body.id }, { $set: { "members.mem3": req.body.value } }).then(item => {
            res.status(200).json({ status: true });
            console.log("Saved member 3");
        })
            .catch(err => {
                res.status(200).json({ status: false });
                console.log("Error:" + err);
            });
});

router.post('/delTeamMem', (req, res) => {
    TFlaw.findOneAndUpdate({ "_id": req.body.id }, { $set: { "members.mem1": req.body.m1, "members.mem2": req.body.m2, "members.mem3": req.body.m3 } }).then(item => {
        res.status(200).json({ status: true });
        console.log("Removed member");
    })
        .catch(err => {
            res.status(200).json({ status: false });
            console.log("Error:" + err);
        });
});

router.post('/delTeam', (req, res) => {
    TFlaw.findOneAndDelete({ "_id": req.body.id }).then(item => {
        res.status(200).json({ status: true });
        console.log("Deleted Flawless Team");
    })
        .catch(err => {
            res.status(200).json({ status: false });
            console.log("Error:" + err);
        });
});

module.exports = router;