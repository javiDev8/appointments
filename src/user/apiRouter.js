const router = require('express').Router()
const path = require('path')

router.get('/', (req, res) => res.send('user api index path'))

router.get('/verifiy', require(path.resolve(__dirname, 'controllers/verifiy')))

router.post(
    '/signup',
    require(path.resolve(__dirname, 'controllers/signup.js'))
)

const expressBrute = require('express-brute')
var store = new expressBrute.MemoryStore()
const brute = new expressBrute(store, {
    freeRetries: 10,
    minWait: 5 * 60 * 1000,  // 5 minutes
    maxWait: 60 * 60 * 1000, // 1 hour,
})

router.post(
    '/login',
    brute.prevent,
    require(path.resolve(__dirname, './controllers/login'))
)

module.exports = router
