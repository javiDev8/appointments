const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))

module.exports = async (req, res) => {

    const reqStart = new Date(req.fields.start)
    const reqEnd = new Date(req.fields.end)

    try {
        // find an event that starts or ends after the requested appointment starts and before it ends
        const match = await Event.find({
            $or: [
                {
                    $and: [
                        { start: { $gte: reqStart } },
                        { start: { $lt: reqEnd } },
                    ],
                },
                {
                    $and: [
                        { end: { $gt: reqStart } },
                        { end: { $lte: reqEnd } },
                    ],
                },
            ],
        })
        console.log('match:', match)

        // if time-spliced event found, response with unprocessable entity code (422)
        if (match.length > 0) {
            res.status(422).send()
            return
        }
    } catch (err) {
        res.status(500).send()
        return
    }

    const appt = await new Event({
        start: reqStart,
        end: reqEnd,
        isAppt: true,
        description: 'testing',
    })

    appt.save()

    res.status(201).send()
}
