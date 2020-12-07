const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transactionController.js')

router.post('/', TransactionController.post)
router.get('/:id_user', TransactionController.getByUser)
router.get('/R/:id_user', TransactionController.totalReceivedByUser)
router.get('/D/:id_user', TransactionController.totalSpentByUser)
router.get('/balance/:id_user', TransactionController.balanceByUser)
router.post('/update', TransactionController.update)
router.delete('/:id', TransactionController.delete)


module.exports = router