const path = require('path')
const RecurrentEvent = require(path.resolve(
    __dirname,
    '../../models/recurrentEvent'
))

module.exports = async (req, res) => {
    try {
        res.status(200).send(
            await RecurrentEvent.find(req.query.filter || null)
        )
    } catch (err) {
        res.status(500).send(err)
    }
}
