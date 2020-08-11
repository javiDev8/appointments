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

// routes
router.get('/verifiy', getController('verifiy'))

router.post('/signup', getController('signup'))

router.post('/login', preventBrute, getController('login'))

router.get('/user', auth, getController('user'))

router.post('/apptrequest', auth, getController('apptRequest'))

router.delete('/logout', getController('logOut'))

// export router
module.exports = router
