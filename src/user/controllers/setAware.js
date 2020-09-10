const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))

module.exports = async (req, res) => {
    try {
        const appt = await Event.findOne({ _id: req.fields.apptId })

        // if no event found send 404
        if (!appt) {
            res.status(404).send()
            return
        }

        // if event doesn't belong to user send unauthorized
        if (req.id !== appt.description.userId) {
            res.status(401).send()
            return
        }

        // set aware as true
        appt.description.aware = true
        appt.markModified('description.aware')
        console.log('save doc result:', appt.save())

        res.status(200).send()
    } catch (err) {
        res.status(500).send()
    }
}
