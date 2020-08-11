const router = require('express').Router()
const path = require('path')

// import middlewares
const preventBrute = require(path.resolve(
    __dirname,
    './middlewares/preventBrute'
))
const auth = require(path.resolve(__dirname, './middlewares/auth'))

// controller importer wrapper
const getController = controller =>
    require(path.resolve(__dirname, './controllers/', controller))

router.get('/users', auth, getController('users'))

router.post('/login', preventBrute, getController('login'))

module.exports = router
