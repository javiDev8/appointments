const router = require('express').Router()
const path = require('path')

router.get('/', (req, res) => res.send('admin api index path'))

// brute force prevent module settings
const expressBrute = require('express-brute')
var store = new expressBrute.MemoryStore()
const brute = new expressBrute(store, {
    freeRetries: 5,
    minWait: 5 * 60 * 1000, // 5 minutes
    maxWait: 60 * 60 * 1000, // 1 hour,
})

router.post('/login', brute.prevent, (req, res) =>
    // testing path
    res.status(200).send('admin/api/login')
)

module.exports = router
