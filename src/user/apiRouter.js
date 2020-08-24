const router = require('express').Router()
const path = require('path')
require('dotenv').config()

// import middlewares
const preventBrute = require(path.resolve(
    __dirname,
    '../middlewares/preventBrute'
))
const auth = require(path.resolve(__dirname, '../middlewares/auth'))(
    process.env.USER_LOGIN_JWT_KEY
)

// controller importer wrapper
const getController = controller =>
    require(path.resolve(__dirname, './controllers/', controller))

// routes
router.get('/verifiy', getController('verifiy'))

router.post('/signup', getController('signup'))

router.post('/login', preventBrute, getController('login'))

router.get('/check', auth, (req, res) => res.status(200).send())

router.get('/getavailables', auth, getController('getAvailables'))

router.post('/requestappt', auth, getController('requestAppt'))

router.get('/history', auth, getController('getHistory'))

router.delete('/logout', (req, res) =>
    res.status(200).clearCookie('token').send()
)

// export router
module.exports = router
