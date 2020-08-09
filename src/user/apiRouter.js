const router = require('express').Router()
const path = require('path')

router.get('/', (req, res) => res.send('user api index path'))

router.get('/verifiy', require(path.resolve(__dirname, 'controllers/verifiy')))

router.post(
    '/signup',
    require(path.resolve(__dirname, 'controllers/signup.js'))
)

router.post('/login', require(path.resolve(__dirname, './controllers/login')))

module.exports = router
