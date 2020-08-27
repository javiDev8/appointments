const path = require('path')
const getEvents = require(path.resolve(__dirname, '../../services/getEvents'))

module.exports = async (req, res) => {
    try {
        res.status(200).send(await getEvents({ isAppt: false }))
    } catch (err) {
        res.status(500).send(err)
    }
}
