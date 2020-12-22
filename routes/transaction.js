const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transactionController.js')

router.post('/', TransactionController.post)
router.get('/:id_user', TransactionController.getByUser)
router.get('/R/:id_user', TransactionController.totalReceivedByUser)
router.get('/D/:id_user', TransactionController.totalSpentByUser)
router.get('/balance/:id_user', TransactionController.balanceByUser)
router.get('/:id_user/:date_begin/:date_finish', TransactionController.getByUserAndPeriod)
router.get('/R/:id_user/:date_begin/:date_finish', TransactionController.totalReceivedByUserAndPeriod)
router.get('/D/:id_user/:date_begin/:date_finish', TransactionController.totalSpentByUserAndPeriod)
router.get('/balance/:id_user/:date_begin/:date_finish', TransactionController.balanceByUserAndPeriod)
router.post('/update', TransactionController.update)
router.delete('/:id', TransactionController.delete)


module.exports = router