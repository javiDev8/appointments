const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))
const checkAvailability = require(path.resolve(
    __dirname,
    '../../services/checkAvailability'
))

module.exports = async (req, res) => {
    // if request doesnt have date or description return 400: bad request
    if (!req.fields.date || !req.fields.description) {
        res.status(400).send()
        return
    }

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
        try {
            const appt = await new Event({
                start: reqStart,
                end: reqEnd,
                isAppt: true,
                description: {
                    userId: req.id,
                    reason: req.fields.description.reason,
                    confirmed: false,
                },
            })
            appt.save()
            res.status(201).send()
        } catch {
            res.status(500).send()
        }
    } else res.status(available.error === 'event collision' ? 422 : 500).send()
}
