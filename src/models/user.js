const { Schema, model } = require('mongoose')

module.exports = model(
    'user',
    new Schema({
        name: String,
        email: String,
	phoneNum: Number,
	birthDate: Date,
        verified: {
            type: Boolean,
            default: false,
        },
        hashedPass: String,
    })
)
