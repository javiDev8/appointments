const path = require('path')
const Event = require(path.resolve(__dirname, '../../models/event'))

module.exports = async (req, res) => {
    console.log( 'id on request:', req.fields.id )
    try {
        await Event.deleteOne({ _id: req.fields.id })
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
}
