const mongoose = require("mongoose");
module.exports = { schema: nameSchema = new mongoose.Schema({
    name: String,
    college: String,
    stream: String,
    contact: Number,
    events: {flawless: Boolean, bughunt: Boolean, cryptoquest: Boolean, webdesign: Boolean}
   })};