const router = require('express').Router()
const path = require('path')
require('dotenv').config()

// import middlewares
const preventBrute = require(path.resolve(
    __dirname,
    '../middlewares/preventBrute'
))
const auth = require(path.resolve(__dirname, '../middlewares/auth'))(
    process.env.ADMIN_LOGIN_JWT_KEY
)

// controller importer wrapper
const getController = controller =>
    require(path.resolve(__dirname, './controllers/', controller))

router.get('/users', auth, getController('users'))

router.post('/login', preventBrute, getController('login'))

router.delete('/logout', (req, res) =>
    res.status(200).clearCookie('token').send()
)

module.exports = router
