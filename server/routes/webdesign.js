const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const scheme = require('../schema/schema');
const User = mongoose.model("User", scheme.schema);
const TWeb = mongoose.model("Webdesign", scheme.schemaW);

router.get('/getEligibles', (req, res) => {
    User.find({ "events.webdesign": true }, (err, data) => {
        if (data) {
            console.log("Retrieved Webdesign Participants");
            res.status(200).json({ status: true, data: data });
        }
        if (err) {
            console.log("Problem Retrieving Webdesign Participants");
            res.status(200).json({ status: false, data: err });
        }
    });
});

router.get('/getTeams', (req, res) => {
    TWeb.find({}, (err, data) => {
        if (data) {
            console.log("Retrieved Webdesign Teams");
            res.status(200).json({ status: true, data: data });
        }
        if (err) {
            console.log("Problem Retrieving Webdesign Teams");
            res.status(200).json({ status: false, data: err });
        }
    });
});

router.post('/addTeam', (req, res) => {
    var myData = new TWeb(req.body);
    myData.save().then(item => {
        console.log("Saved");
        res.status(200).json({ status: true });
    })
        .catch(err => {
            console.log("Error:" + err);
            res.status(200).json({ status: false });
        });
});

router.post('/addTeamMem', (req, res) => {
    if (req.body.emptyMember == "mem2")
        TWeb.findOneAndUpdate({ "_id": req.body.id }, { $set: { "members.mem2": req.body.value } }).then(item => {
            res.status(200).json({ status: true });
            console.log("Saved member 2");
        })
            .catch(err => {
                res.status(200).json({ status: false });
                console.log("Error:" + err);
            });
});

router.post('/delTeamMem', (req, res) => {
    TWeb.findOneAndUpdate({ "_id": req.body.id }, { $set: { "members.mem1": req.body.m1, "members.mem2": req.body.m2 } }).then(item => {
        res.status(200).json({ status: true });
        console.log("Removed member");
    })
        .catch(err => {
            res.status(200).json({ status: false });
            console.log("Error:" + err);
        });
});

router.post('/delTeam', (req, res) => {
    TWeb.findOneAndDelete({ "_id": req.body.id }).then(item => {
        res.status(200).json({ status: true });
        console.log("Deleted webdesign Team");
    })
        .catch(err => {
            res.status(200).json({ status: false });
            console.log("Error:" + err);
        });
});

module.exports = router;