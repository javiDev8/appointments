const path = require('path')
const getEvents = require(path.resolve(__dirname, '../../services/getEvents'))

module.exports = async (req, res) => {
    console.log('req id:', req.id)

    try {
        res.status(200).send(await getEvents({ 'description.userId': req.id }))
    } catch (err) {
        res.status(500).send()
    }
}
