const { Schema, model } = require('mongoose')

module.exports = model(
    // is not puntual, so it can't have Date type fields
    'recurrentEvent',
    new Schema({
        // week day, (0-6) -1 for daily
        day: Number,
        start: {
            hour: Number,
            minute: Number,
        },
        end: {
            hour: Number,
            minute: Number,
        },
        description: Object,
    })
)
