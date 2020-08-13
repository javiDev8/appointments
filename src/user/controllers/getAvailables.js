const path = require('path')
const getAvailableTimes = require(path.resolve(
    __dirname,
    '../../services/getAvailableTimes'
))

module.exports = async (req, res) => {
    try {
        // res.status(200).send(await getAvailableTimes(new Date(req.query.date)))

        // debug
        res.status(200).send(
            (await getAvailableTimes(new Date(req.query.date))).map(event => {
                let start = event.start.toString()
                let end = event.end.toString()
                return { start, end }
            })
        )
    } catch (err) {
        res.status(500).send()
    }
}
