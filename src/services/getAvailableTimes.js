const path = require('path')
const Event = require(path.resolve(__dirname, '../models/event'))
const RecurrentEvent = require(path.resolve(
    __dirname,
    '../models/recurrentEvent'
))
const getRecurrentsInDates = require(path.resolve(
    __dirname,
    './getRecurrentsInDates'
))

module.exports = async date => {
    // set start and end of a specific day
    date.setHours(0)
    date.setMinutes(0)
    const dateStart = new Date(date)
    date.setHours(23)
    date.setMinutes(59)
    const dateEnd = new Date(date)

    // get all events of such day (puntuals and recurrents)
    const dayEvents = (
        await Event.find({
            $and: [{ start: { $gte: dateStart } }, { end: { $lte: dateEnd } }],
        }).select('-_id start end')
    )
        .concat(
            await getRecurrentsInDates({
                start: dateStart,
                end: dateEnd,
            })
        )

        // sort first earlier events
        .sort((a, b) => a.start - b.start)

    const availables = []
    const minTime = 3600000 // one hour

    // push in array each time diference larger than one hour between each event
    for (var i = 0; i < dayEvents.length - 1; i++) {
        if (dayEvents[i + 1].start - dayEvents[i].end > minTime)
            availables.push({
                start: dayEvents[i].end,
                end: dayEvents[i + 1].start,
            })
    }

    return availables
}
