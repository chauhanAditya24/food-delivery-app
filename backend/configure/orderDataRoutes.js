const express = require('express')
const router = express.Router()

const orderCltr = require('../controllers/orderCltr')

router.post('/fda/foodData' , orderCltr.foodData)
router.post('/fda/orderData' , orderCltr.orderData)
router.post('/fda/myOrder' , orderCltr.myOrder)

module.exports =  router