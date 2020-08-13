const path = require('path')
const RecurrentEvent = require(path.resolve(
    __dirname,
    '../models/recurrentEvent'
))

// this module returns the recurrent events matched in a date-type range
// formated in dates
module.exports = async date => {
    const recurrents = await RecurrentEvent.find({
        // find weekday matched or daily
        $or: [{ day: date.start.getDay() }, { day: -1 }],
    })

    // format documents with date objects
    return await recurrents.map(event => {
        let start = new Date(date.start)
        start.setHours(event.start.hour)
        start.setMinutes(event.start.minute)
        let end = new Date(date.end)
        end.setHours(event.end.hour)
        end.setMinutes(event.end.minute)

        return { start, end }
    })
}
