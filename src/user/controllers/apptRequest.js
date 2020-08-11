const path = require('path')
const Appt = require(path.resolve(__dirname, '../../models/appointment'))

module.exports = async (req, res) => {
    try {
        const appt = await new Appt({
            userId: req.id,
            message: req.fields.message,
        })
        appt.save()
        res.status(200).send()
    } catch {
        res.status(500).send()
    }
}
