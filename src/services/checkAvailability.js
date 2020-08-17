const path = require('path')
const Event = require(path.resolve(__dirname, '../models/event'))
const RecurrentEvent = require(path.resolve(
    __dirname,
    '../models/recurrentEvent'
))

module.exports = async date => {
    try {
        // find spliced events
        const splicedEvent = await Event.findOne({
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
        if (splicedEvent)
            return {
                success: false,
                error: 'event collision',
                event: splicedEvent,
            }

        // import module to find and format recurrent events
        const recurrentsInDates = await require(path.resolve(
            __dirname,
            './getRecurrentsInDates'
        ))

        // get date formated recurrent events
        // and filter the spliced ones
        const splicedRecurrents = (await recurrentsInDates(date)).filter(
            event =>
                (event.start >= date.start && event.start < date.end) ||
                (date.end > event.start && date.end <= event.end)
        )

        // if not empty array, return no available
        if (splicedRecurrents.length > 0)
            return {
                success: false,
                error: 'event collision',
                event: splicedRecurrents,
            }

        return { success: true }
    } catch (err) {
        return { success: false, error: err }
    }
}
