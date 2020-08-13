const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))
const checkAvailability = require(path.resolve(
    __dirname,
    '../../services/checkAvailability'
))

module.exports = async (req, res) => {
    // config start and end of requested date
    const date = new Date(req.fields.date)
    const reqStart = new Date(date)
    const duration = 60 // stimated duration in minutes
    const reqEnd = new Date(date.setMinutes(date.getMinutes() + duration))

    // if available date make new event and save it
    const available = await checkAvailability({
        start: reqStart,
        end: reqEnd,
    })
    if (available.success) {
        const appt = await new Event({
            start: reqStart,
            end: reqEnd,
            isAppt: true,
            description: req.fields.description,
        })
        appt.save()
        res.status(201).send()
    } else
        res.status(
            available.error === 'event collision'
                ? 422
                : 500
        ).send()
}
