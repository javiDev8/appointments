const path = require('path')
const RecurrentEvent = require(path.resolve(
    __dirname,
    '../../models/recurrentEvent'
))

module.exports = async (req, res) => {
    try {
        const recurrent = await new RecurrentEvent(req.fields)
	recurrent.save()
	res.status(201).send()
    } catch (err) {
	res.status(500).send(err)
    }
}
