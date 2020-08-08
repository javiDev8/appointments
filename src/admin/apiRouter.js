const router = require('express').Router()

router.get('/', (req, res) => res.send('admin api index path'))

module.exports = router
