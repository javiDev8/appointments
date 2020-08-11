const { Schema, model } = require('mongoose')

module.exports = model(
    'appointment',
    new Schema({
	date: Date,
	userId: String,
	reason: String,
	confirmed: {
	    type: Boolean,
	    default: false
	}
    })
)

