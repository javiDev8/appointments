const path = require('path')

// start admin app
require(path.resolve(__dirname, './admin/app'))

// start user app
require(path.resolve(__dirname, './user/app'))

// init database
require(path.resolve(__dirname, 'database'))
