const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    title: {type: String, required: [true, 'All connections must have a title.']},
    host: {type: String, required: [true, 'All connections must have a host.']},
    topic: {type: String, required: [true, 'All connections must have a topic.']},
    details: {type: String, required: [true, 'All connections must have a description.']},
    date: {type: String, required: [true, 'All connections must have a date.'], validate: /(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}/}, //Regex to validate the date format
    startTime: {type: String, required: [true, 'All connections must have a start time.'], validate: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](?:AM|PM|am|pm)$/ }, // Regex to validate start time
    endTime: {type: String, required: [true, 'All connections must have an end time.'], validate: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](?:AM|PM|am|pm)$/ }, //Regex to validate end time
    image: {type: String, required: [true, 'All connections must have an image.']}
}, {timestamps: false});

//Convention: collection name becomes lowercase plural of model name -> connections
module.exports = mongoose.model('Connection', connectionSchema);