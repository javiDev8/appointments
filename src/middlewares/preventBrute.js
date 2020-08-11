const expressBrute = require('express-brute')
var store = new expressBrute.MemoryStore()

// settings
const brute = new expressBrute(store, {
    freeRetries: 5,
    minWait: 5 * 60 * 1000, // 5 minutes
    maxWait: 60 * 60 * 1000, // 1 hour,
})

module.exports = brute.prevent
