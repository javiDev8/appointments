const mongoose = require('mongoose')
require('dotenv').config()

mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
	useFindAndModify: false
    })
    .then(db => console.log('database connected'))
    .catch(err => console.log(err))
