const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const scheme = require('../schema/schema');
const User = mongoose.model("User", scheme.schema);
const TFlaw = mongoose.model("Flawless", scheme.schemaF);
const TBug = mongoose.model("Bughunt", scheme.schemaB);
const TCrypt = mongoose.model("Cryptoquest", scheme.schemaC);
const TWeb = mongoose.model("Webdesign", scheme.schemaW);

router.get('/fetch', (req, res) => {
    User.find({}, (err, data) => {
        if (data) {
            console.log("Retrieved Users");
            res.status(200).json({ status: true, data: data });
        }
        if (err) {
            console.log("Problem Retrieving Users");
            res.status(200).json({ status: false, data: err });
        }
    });
});

router.post('/enroll', (req, res) => {
    var myData = new User(req.body);
    myData.save().then(item => {
        res.status(200).json({ status: true });
        console.log("Saved");
    })
        .catch(err => {
            res.status(200).json({ status: false });
            console.log("Error:" + err);
        });
});

router.post('/change', (req, res) => {
    var myData = new User(req.body.prev);
    User.updateOne({ "_id": req.body.id }, {
        $set: {
            "college": myData.college, "stream": myData.stream, "contact": myData.contact, "emaill": myData.emaill, "year": myData.year,
            "events.flawless": myData.events.flawless, "events.bughunt": myData.events.bughunt, "events.cryptoquest": myData.events.cryptoquest, "events.webdesign": myData.events.webdesign
        }
    }).then(
        item => {
            res.status(200).json({ status: true });
            console.log("Saved");
        })
        .catch(err => {
            res.status(200).json({ status: false });
            console.log("Error:" + err);
        });
});

router.post('/delete', (req, res) => {
    User.findOne({ "_id": req.body.id }, (err, data) => {
        if (data) {
            TFlaw.findOneAndDelete({ $or: [{ "members.mem1": data.name+'_'+data.rcid }, { "members.mem2": data.name+'_'+data.rcid }, { "members.mem3": data.name+'_'+data.rcid }] }).then(
                item => {
                    console.log("Deleted Flawless Team(s)");
                    TBug.findOneAndDelete({ $or: [{ "members.mem1": data.name+'_'+data.rcid }, { "members.mem2": data.name+'_'+data.rcid }] }).then(
                        item => {
                            console.log("Deleted Bughunt Team(s)");
                            TCrypt.findOneAndDelete({ $or: [{ "members.mem1": data.name+'_'+data.rcid }, { "members.mem2": data.name+'_'+data.rcid }] }).then(
                                item => {
                                    console.log("Deleted Cryptoquest Team(s)");
                                    TWeb.findOneAndDelete({ $or: [{ "members.mem1": data.name+'_'+data.rcid }, { "members.mem2": data.name+'_'+data.rcid }] }).then(
                                        item => {
                                            console.log("Deleted Webdesign Team(s)");
                                            User.findOneAndDelete({ "_id": req.body.id }).then(
                                                item => {
                                                    res.status(200).json({ status: true });
                                                    console.log("Deleted User");
                                                })
                                                .catch(err => {
                                                    res.status(200).json({ status: false });
                                                    console.log("Error:" + err);
                                                });
                                        })
                                        .catch(err => {
                                            res.status(200).json({ status: false });
                                            console.log("Error:" + err);
                                        });
                                })
                                .catch(err => {
                                    res.status(200).json({ status: false });
                                    console.log("Error:" + err);
                                });
                        })
                        .catch(err => {
                            res.status(200).json({ status: false });
                            console.log("Error:" + err);
                        });
                })
                .catch(err => {
                    res.status(200).json({ status: false });
                    console.log("Error:" + err);
                });
        }
        if (err) {
            res.status(200).json({ status: false });
            console.log("Error:" + err);
        }
    });
});

module.exports = router;