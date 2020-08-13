const path = require('path')
const getAvailableTimes = require(path.resolve(
    __dirname,
    '../../services/getAvailableTimes'
))

module.exports = async (req, res) => {
    try {
        res.status(200).send(await getAvailableTimes(new Date(req.query.date)))
    } catch (err) {
        res.status(500).send()
    }
}
