const path = require('path')
const getEvents = require(path.resolve(__dirname, '../../services/getEvents'))

module.exports = async (req, res) => {
    let filter = { 'description.userId': req.id }

    if (req.query.aware)
        filter = Object.assign(filter, {
            'description.aware': JSON.parse(req.query.aware),
        })

    try {
        res.status(200).send(await getEvents(filter))
    } catch (err) {
        res.status(500).send()
    }
}
