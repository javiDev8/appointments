const router = require('express').Router()

router.get('/', (req, res) => res.send('user api index path'))

module.exports = router
