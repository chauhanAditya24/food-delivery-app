const express = require('express')
const router = express.Router()

const dataCltr = require('../controllers/dataCltr')

router.get('/fda/data' , dataCltr.list)

module.exports = router