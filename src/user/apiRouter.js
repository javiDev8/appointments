const router = require('express').Router()
const path = require('path')

router.get('/', (req, res) => res.send('user api index path'))

router.post(
    '/signup',
    require(path.resolve(__dirname, 'controllers/signup.js'))
)

module.exports = router
