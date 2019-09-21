const mongoose = require("mongoose");
module.exports = { schema: nameSchema = new mongoose.Schema({
    name: String,
    rcid: String,
    college: String,
    stream: String,
    contact: Number,
	emaill: String,
	year: String,
    events: {flawless: Boolean, bughunt: Boolean, cryptoquest: Boolean, webdesign: Boolean}
   }),
   schemaF: flawlessSchema = new mongoose.Schema({
    name: String,
    password: String,
    members: {mem1: String, mem2: String, mem3: String}
   }),
   schemaB: bughuntSchema = new mongoose.Schema({
    name: String,
    password: String,
    members: {mem1: String, mem2: String}
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
   }),
   schemaA: adminSchema = new mongoose.Schema({
    name: String,
    emaill: String,
    password: String
   })
};