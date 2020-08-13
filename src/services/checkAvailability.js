const path = require('path')
const Event = require(path.resolve(__dirname, '../models/event'))
const RecurrentEvent = require(path.resolve(
    __dirname,
    '../models/recurrentEvent'
))

module.exports = async date => {
    try {
        const match = await Event.findOne({
            $or: [
                {
                    $and: [
                        { start: { $gte: date.start } },
                        { start: { $lt: date.end } },
                    ],
                },
                {
                    $and: [
                        { end: { $gt: date.start } },
                        { end: { $lte: date.end } },
                    ],
                },
            ],
        })
        if (match) return { success: false, error: 'event splice' }

        const recurrentEvents = await RecurrentEvent.find({
            // find weekday matched or daily
            $or: [{ day: date.start.getDay() }, { day: -1 }],
        })
        const splicedRecurrents = await recurrentEvents

            // format documents with date objects
            .map(event => {
                let start = new Date(date.start)
                start.setHours(event.start.hour)
                start.setMinutes(event.start.minute)
                let end = new Date(date.end)
                end.setHours(event.end.hour)
                end.setMinutes(event.end.minute)

                return { start, end }
            })

            // filter the spliced ones
            .filter(
                event =>
                    (event.start >= date.start && event.start < date.end) ||
                    (date.end > event.start && date.end <= event.end)
            )

        if (splicedRecurrents.length > 0)
            return { success: false, error: 'recurrent event splcie' }

        return { success: true }
    } catch (err) {
        return { success: false, error: err }
    }
}
