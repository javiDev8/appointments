const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))
const sendMail = require(path.resolve(__dirname, '../../services/sendMail'))

module.exports = async (req, res) => {
    try {
        await Event.findOneAndUpdate(
            { _id: req.fields.eventId },
            { 'description.confirmed': true }
        )
	sendMail({
	    userEmail: req.fields.userEmail,
	    subject: 'cita confirmada',
	    text: 'su cita ha sido confirmada!'
	})
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
}
