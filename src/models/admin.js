const { Schema, model } = require('mongoose')

module.exports = model(
    'admin',
    new Schema({
        email: String,
        hashedPass: String,
	frozen: {
	    type: Boolean,
	    default: false
	}
    })
)
