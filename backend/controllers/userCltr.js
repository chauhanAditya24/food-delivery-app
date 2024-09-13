const User = require('../models/User')
const bycryptjs = require('bcryptjs')
const { validationResult, body } = require('express-validator')
const jwt = require('jsonwebtoken')

const userCltr = {}

userCltr.login = async (req, res) => {
    const {body} = req
    try {
        const user = await User.findOne({ email: body.email })

        if (user) {
            const result = await bycryptjs.compare(body.password, user.password)

            // console.log('res')

            if(result){
                const tokenData = { id: user._id}
                const token = jwt.sign(tokenData,process.env.JWT_SECRET)
                res.status(200).json({success:true , token: `Bearer ${token}` , email:body.email })
            }else{
                res.status(400).json({error:'wrong credentials'})
            }
        }else{
            return res.status(400).json({error: 'wrong credentials'})
        }


    }
    catch (e) {
        res.json({ success: false })
    }
}

userCltr.register = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const body = req.body

        // const userObj = await User.create({
        //     name: body.name,
        //     location: body.location,
        //     email: body.email,
        //     password: body.password
        // })

        // res.json(userObj)
        const userObj = new User({
            name: body.name,
            location: body.location,
            email: body.email,
            password: body.password
        })

        const checkEmail = await User.findOne({ email: userObj.email })

        if (checkEmail) {
            res.json({ msg: 'user already registers', success: 'false' })
        } else {

            const salt = await bycryptjs.genSalt()
            const hashPassword = await bycryptjs.hash(userObj.password, salt)
            userObj.password = hashPassword

            const user = await userObj.save()
            res.json({ sucess: true })
        }

    }
    catch (e) {
        res.json({ sucess: false })
    }
}


module.exports = userCltr
