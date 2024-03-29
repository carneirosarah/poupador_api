const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

const userRoute = require('./routes/users')
const transactionRoute = require('./routes/transaction')


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Header', 
        'Origin X-Requested-With, Content-Type, Accept, Authorization'
    )

    if (req.method === 'OPTIONS') {

        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).send({})
    }

    next()
})

app.use('/users', userRoute)
app.use('/transaction', transactionRoute)

app.use((req, res, next) => {

    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

 app.use((error, req, res, next) => {
    
    res.status(error.status || 500)
    console.log(error)
    return res.send({ error: { message: error.message}})
})

module.exports = app