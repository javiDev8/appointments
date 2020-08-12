const { Schema, model } = require('mongoose')

module.exports = model(
    // an event its something that happens in the time
    // can be or not an appointment
    'event',
    new Schema({
        start: Date,
        end: Date,
	isAppt: Boolean,
        description: Object,
    })
)
