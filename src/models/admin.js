const { Schema, model } = require('mongoose')

module.exports = model(
    'admin',
    new Schema({
	name: String,
        hashedPass: String,
    })
)
