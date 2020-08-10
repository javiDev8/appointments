const expressBrute = require('express-brute')
var store = new expressBrute.MemoryStore()
const brute = new expressBrute(store, {
    freeRetries: 10,
    minWait: 5 * 60 * 1000, // 5 minutes
    maxWait: 60 * 60 * 1000, // 1 hour,
})

module.exports = brute.prevent
