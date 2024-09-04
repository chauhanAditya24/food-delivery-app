const express = require('express')
const router = express.Router()
const { body} = require('express-validator')
const authenticateUser = require('../middleware/authenticate')

const userCltr = require('../controllers/userCltr')

//register
router.post('/fda/register' , [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({min:5}),
    body('name').isLength({min:4})    
] ,userCltr.register)
//login
router.post('/fda/login',userCltr.login)


module.exports = router