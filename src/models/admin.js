const { Schema, model } = require('mongoose')

module.exports = model(
    'admin',
    new Schema({
        email: String,
        hashedPass: String,
    })
)
