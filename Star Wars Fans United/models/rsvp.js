const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema ({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    connection: {type: Schema.Types.ObjectId, ref: 'Connection', unique: [true, 'You have already RSVP\'d for this event.']},
    connectionName: {type: String, required: [true, 'Connection name is required.']}
}, {timestamps: false});

module.exports = mongoose.model('RSVP', rsvpSchema);