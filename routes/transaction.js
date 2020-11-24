const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transactionController.js')

router.post('/', TransactionController.post)

module.exports = router