const path = require('path')
const User = require(path.resolve(__dirname, '../../models/user'))
const getEvents = require(path.resolve(__dirname, '../../services/getEvents'))

module.exports = async (req, res) => {
    // parse filter
    const filter = JSON.parse(req.query.filter)
    console.log( 'filter:', filter )

    if (filter.event.pending) {
        // filter events that starts after *right now*
        filter.event.start = { $gt: new Date(Date.now()) }
    }
    delete filter.event.pending

    // filter by user?
    if (JSON.parse(req.query.byUser)) {
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
