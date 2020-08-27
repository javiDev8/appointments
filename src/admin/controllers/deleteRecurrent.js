const path = require('path')
const RecurrentEvent = require(path.resolve(
    __dirname,
    '../../models/recurrentEvent'
))

module.exports = async (req, res) => {
    console.log( 'on delete recurent' )
    try {
        await RecurrentEvent.deleteOne({ _id: req.fields.id })
        res.status(200).send()
    } catch (err) {
        res.status(500).send()
    }
}
