const path = require('path')
const User = require(path.resolve(__dirname, '../../models/user'))
const getEvents = require(path.resolve(__dirname, '../../services/getEvents'))

module.exports = async (req, res) => {
    // parse filter
    const filter = JSON.parse(req.query.filter)
    console.log('filter:', filter)

    // format filter to db model
    if (filter.event.pending) filter.event.start = { $gt: new Date(Date.now()) }
    delete filter.event.pending
    if (typeof filter.event.confirmed !== 'undefined') {
        filter.event = await Object.assign(filter.event, {
            'description.confirmed': filter.event.confirmed,
        })
        delete filter.event.confirmed
    }
    if (typeof filter.event.aware !== 'undefined') {
        filter.event = await Object.assign(filter.event, {
            'description.aware': filter.event.aware,
        })
        delete filter.event.aware
    }

    // console.log('formated event filter:', filter.event)
    // res.status(200).send()

    if (JSON.parse(req.query.byUser)) {
        // filter by user?
        const userId = await User.findOne(filter.user).select('_id')

        // if not user found send 404
        if (!userId) {
            res.status(404).send()
            return
        }
        res.status(200).send(
            await getEvents(
                Object.assign(
                    {
                        'description.userId': userId._id.toString(),
                    },
                    filter.event
                )
            )
        )
    } else res.status(200).send(await getEvents(filter.event))
}
