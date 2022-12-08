const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    title: {type: String, required: [true, 'All connections must have a title.']},
    host: {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'All connections must have a host.']},
    topic: {type: String, required: [true, 'All connections must have a topic.']},
    details: {type: String, required: [true, 'All connections must have a description.']},
    date: {type: String, required: [true, 'All connections must have a date.']}, //Regex to validate the date format
    startTime: {type: String, required: [true, 'All connections must have a start time.']}, // Regex to validate start time
    endTime: {type: String, required: [true, 'All connections must have an end time.']}, //Regex to validate end time
    image: {type: String, required: [true, 'All connections must have an image.']}
}, {timestamps: false});

//Convention: collection name becomes lowercase plural of model name -> connections
module.exports = mongoose.model('Connection', connectionSchema);