const mongoose = require("mongoose");
module.exports = { schema: nameSchema = new mongoose.Schema({
    name: String,
    college: String,
    stream: String,
    contact: Number,
    events: {flawless: Boolean, bughunt: Boolean, cryptoquest: Boolean, webdesign: Boolean}
   }),
   schemaF: flawlessSchema = new mongoose.Schema({
    name: String,
    password: String,
    members: {mem1: String, mem2: String, mem3: String}
   }),
   schemaC: cryptoquestSchema = new mongoose.Schema({
    name: String,
    password: String,
    members: {mem1: String, mem2: String}
   }),
   schemaW: webdesignSchema = new mongoose.Schema({
    name: String,
    password: String,
    members: {mem1: String, mem2: String}
   })
};