const router = require('express').Router()
const path = require('path')

// import middlewares
const preventBrute = require(path.resolve(
    __dirname,
    './middlewares/preventBrute'
))
const auth = require(path.resolve(__dirname, './middlewares/auth'))

// routes
router.get('/', (req, res) => res.send('user api index path'))

router.get('/verifiy', require(path.resolve(__dirname, 'controllers/verifiy')))

router.post(
    '/signup',
    require(path.resolve(__dirname, 'controllers/signup.js'))
)

router.post(
    '/login',
    preventBrute,
    require(path.resolve(__dirname, './controllers/login'))
)

// testing endpoint
router.get('/protected', auth, (req, res) => res.status(200).send(req.user))

router.delete(
    '/logout',
    require(path.resolve(__dirname, './controllers/logOut'))
)

module.exports = router
