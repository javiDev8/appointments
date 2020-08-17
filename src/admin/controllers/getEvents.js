const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))

module.exports = async (req, res) => {
    console.log( 'on get events controller' )
    try {
	res.status(200).send(await Event.find(req.query.filter || null))
    } catch {
	res.status(500).send()
    }
}
