const path = require('path')
const Event = require(path.resolve(__dirname, '../models/event'))

module.exports = async filter => {
    try {
        return await Event.find(filter || null)
    } catch (err) {
        return err
    }
}
