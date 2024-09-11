const Order = require('../models/Orders')

const orderCltr = {}

orderCltr.myOrder = async (req, res) => {
    try{
        let myData = await Order.findOne({'email': req.body.email})
        res.json({orderData:myData})
    }
    catch(e){
        res.json('server Error : ',e.message )
    }
}

orderCltr.orderData = async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })
    console.log("1231242343242354", req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            console.log(data)
            console.log("1231242343242354", req.body.email)
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
}

orderCltr.foodData = async (req, res) => {
    try {

        res.send([global.food_items, global.food_category])

    }
    catch (e) {
        conosle.error(e.message)
        res.send("server Error")
    }

}


module.exports = orderCltr
