const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const fs = require("fs");
mongoose.Promise = global.Promise;
const localuri = "mongodb://10.10.101.187/test";
const uri = "mongodb+srv://debanjan_01:debanjan@firstcluster-yy6sf.mongodb.net/test?retryWrites=true";
mongoose.connect(uri,{ useNewUrlParser: true });
mongoose.connection.on('open', () => {
    console.log("Connected to the Data Base");
});
mongoose.connection.on('error', () => {
    console.log("Error connecting to the Data Base");
});
const scheme = require('./schema/schema');
var User = mongoose.model("User", scheme.schema);
var TFlaw = mongoose.model("Flawless", scheme.schemaF);
var TBug = mongoose.model("Bughunt", scheme.schemaB);
var TCrypt = mongoose.model("Cryptoquest", scheme.schemaC);
var TWeb = mongoose.model("Webdesign", scheme.schemaW);

const PORT = 80;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '\\public'));

app.post('/user/enroll', function(req, res) {
    var myData = new User(req.body);
    myData.save().then(item => {
        res.status(200).send({'POST':'registration'});
        console.log("Saved");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});

app.post('/user/change', function(req, res) {
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
app.post('/user/delete', function(req, res) {
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
app.post('/flawless/addTeam', function(req, res) {
    res.status(200).send({'POST':'flawless team'});
    var myData = new TFlaw(req.body);
    myData.save().then(item => { console.log("Saved");  })
    .catch(err => { console.log("Error:"+err);  });
});
app.post('/flawless/addTeamMem', function(req, res) {
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
app.post('/flawless/delTeamMem', function(req, res) {
    res.status(200).send({'POST':'flawless remove member'});
    console.log("datas: ",req.body);
    TFlaw.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem1": req.body.m1, "members.mem2": req.body.m2, "members.mem3": req.body.m3}}).then(item => {
        console.log("Removed member");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});
app.post('/flawless/delTeam', function(req, res) {
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

app.post('/bughunt/addTeam', function(req, res) {
    res.status(200).send({'POST':'bughunt team'});
    var myData = new TBug(req.body);
    myData.save().then(item => { console.log("Saved");  })
    .catch(err => { console.log("Error:"+err);  });
});
app.post('/bughunt/addTeamMem', function(req, res) {
    res.status(200).send({'POST':'bughunt add member'});
    console.log("datas: ",req.body);
    if(req.body.emptyMember == "mem2")
    TBug.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem2": req.body.value}}).then(item => {
        console.log("Saved member 2");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});
app.post('/bughunt/delTeamMem', function(req, res) {
    res.status(200).send({'POST':'bughunt remove member'});
    console.log("datas: ",req.body);
    TBug.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem1": req.body.m1, "members.mem2": req.body.m2}}).then(item => {
        console.log("Removed member");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});
app.post('/bughunt/delTeam', function(req, res) {
    res.status(200).send({'POST':'bughunt delete team'});
    console.log("datas: ",req.body);
    TBug.findOneAndDelete({"_id": req.body.id}).then(
        item => {
            console.log("Deleted bughunt Team");
        })
        .catch(err => {
            console.log("Error:"+err);
        }
    );
});

app.post('/cryptoquest/addTeam', function(req, res) {
    res.status(200).send({'POST':'cryptoquest team'});
    var myData = new TCrypt(req.body);
    myData.save().then(item => { console.log("Saved");  })
    .catch(err => { console.log("Error:"+err);  });
});
app.post('/cryptoquest/addTeamMem', function(req, res) {
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
app.post('/cryptoquest/delTeamMem', function(req, res) {
    res.status(200).send({'POST':'cryptoquest remove member'});
    console.log("datas: ",req.body);
    TCrypt.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem1": req.body.m1, "members.mem2": req.body.m2}}).then(item => {
        console.log("Removed member");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});
app.post('/cryptoquest/delTeam', function(req, res) {
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

app.post('/webdesign/addTeam', function(req, res) {
    res.status(200).send({'POST':'webdesign team'});
    var myData = new TWeb(req.body);
    myData.save().then(item => { console.log("Saved");  })
    .catch(err => { console.log("Error:"+err);  });
});
app.post('/webdesign/addTeamMem', function(req, res) {
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
app.post('/webdesign/delTeamMem', function(req, res) {
    res.status(200).send({'POST':'webdesign remove member'});
    console.log("datas: ",req.body);
    TWeb.findOneAndUpdate({"_id": req.body.id},{$set: {"members.mem1": req.body.m1, "members.mem2": req.body.m2}}).then(item => {
        console.log("Removed member");
    })
    .catch(err => {
        console.log("Error:"+err);
    });
});
app.post('/webdesign/delTeam', function(req, res) {
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
app.get('/user/fetch', function(req, res) {
    User.find({}, function(err, data){
        console.log("Retrieved Users");
        res.status(200).send(data);
    });
});
app.get('/flawless/getEligibles', function(req, res) {
    User.find({"events.flawless": true}, function(err, data){
        console.log("Retrieved Flawless Participants");
        res.status(200).send(data);
    });
});
app.get('/flawless/getTeams', function(req, res) {
    TFlaw.find({}, function(err, data){
        console.log("Retrieved Flawless Teams");
        res.status(200).send(data);
    });
});
app.get('/bughunt/getEligibles', function(req, res) {
    User.find({"events.bughunt": true}, function(err, data){
        console.log("Retrieved Bghunt Participants");
        res.status(200).send(data);
    });
});
app.get('/bughunt/getTeams', function(req, res) {
    TBug.find({}, function(err, data){
        console.log("Retrieved Bughunt Teams");
        res.status(200).send(data);
    });
});
app.get('/cryptoquest/getEligibles', function(req, res) {
    User.find({"events.cryptoquest": true}, function(err, data){
        console.log("Retrieved Cryptoquest Participants");
        res.status(200).send(data);
    });
});
app.get('/cryptoquest/getTeams', function(req, res) {
    TCrypt.find({}, function(err, data){
        console.log("Retrieved Cryptoquest Teams");
        res.status(200).send(data);
    });
});
app.get('/webdesign/getEligibles', function(req, res) {
    User.find({"events.webdesign": true}, function(err, data){
        console.log("Retrieved Webdesign Participants");
        res.status(200).send(data);
    });
});
app.get('/webdesign/getTeams', function(req, res) {
    TWeb.find({}, function(err, data){
        console.log("Retrieved Webdesign Teams");
        res.status(200).send(data);
    });
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, function() {
    console.log("Server is running on port "+PORT);
});