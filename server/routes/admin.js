const express = require('express');
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const router = express.Router();
const scheme = require('../schema/schema');
const Admin = mongoose.model("Admin", scheme.schemaA);

router.post('/register', (req, res) => {
    var myData = new Admin(req.body);
    myData.save().then(item => {
        res.status(200).json({ status: true });
        console.log("Saved Admin");
    }).catch(err => {
        res.status(502).json({ status: false });
        console.log("Error:" + err);
    });
})

router.post('/login', (req, res) => {
    Admin.findOne({ password: req.body.password, emaill: req.body.emaill }).then(item => {
        res.status(200).json({ status: true, admin: item });
        console.log("Admin Logged In" + item);
    }).catch(err => {
        res.status(502).json({ status: false });
        console.log("Error:" + err);
    });
})

router.post('/sendMail', (req, res) => {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: req.body.adminEmailId,
            pass: req.body.adminEmailPassword
        }
    });
    let mailOptions;
    if (req.body.type == 'html')
        mailOptions = {
            from: 'Compute@id - EDGE <' + req.body.adminEmailId + '>',
            to: req.body.users,
            subject: req.body.subject,
            html: req.body.message
        };
    if (req.body.type == 'text')
        mailOptions = {
            from: 'Compute@id - EDGE <' + req.body.adminEmailId + '>',
            to: req.body.users,
            subject: req.body.subject,
            text: req.body.message
        };
    /*transporter.sendMail(mailOptions).then(info => {
        console.log("Success: " + info);
        res.status(200).json({ status: true });
    }).catch(err => {
        console.log("Error: " + err);
        res.status(200).json({ status: false });
    });*/

});

module.exports = router;