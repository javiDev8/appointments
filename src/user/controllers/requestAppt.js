const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))
const checkAvailability = require(path.resolve(
    __dirname,
    '../../services/checkAvailability'
))

module.exports = async (req, res) => {
    const reqStart = new Date(req.fields.start)
    const reqEnd = new Date(req.fields.end)

    // if available date make new event and save it
    if (
        (
            await checkAvailability({
                start: reqStart,
                end: reqEnd,
            })
        ).success
    ) {
        const appt = await new Event({
            start: reqStart,
            end: reqEnd,
            isAppt: true,
            description: req.fields.description,
        })
        appt.save()
        res.status(201).send()
    } else res.status(422).send()
}
