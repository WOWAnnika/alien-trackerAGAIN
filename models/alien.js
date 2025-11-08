const mongoose = require('mongoose');
const {date} = require("joi");

const alienSchema = new mongoose.Schema({
    name: {type: String, required: true},
    race: {type: String, required: true},
    planet: {type: String, required: true},
    abilities: {type: [String], required: true},
    dateOfDiscovery: {type: Date, default: Date.now, required: true},
    alienImage: {type: Buffer, required: false},

})

module.exports = mongoose.model("Alien", alienSchema);

