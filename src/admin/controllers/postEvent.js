const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))
const checkAvailability = require(path.resolve(
    __dirname,
    '../../services/checkAvailability'
))

module.exports = async (req, res) => {
    const reqStart = new Date(req.fields.start)
    const reqEnd = new Date(req.fields.end)
    const available = await checkAvailability({
        start: reqStart,
        end: reqEnd,
    })
    if (available.success || req.fields.overwrite) {
        const event = new Event({
            start: reqStart,
            end: reqEnd,
            isAppt: false,
            description: req.fields.description,
        })
        event.save()
        res.status(201).send()
    } else
        res.status(available.error === 'event collision' ? 422 : 500).send(
            available.event || null
        )
}
