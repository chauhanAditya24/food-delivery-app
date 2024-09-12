const { body } = require('express-validator')
const Order = require('../models/Orders')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const orderCltr = {}

orderCltr.checkout = async (req, res) => {
    try {
        const order_data = req.body.order_data
        const {email} = req.body

        // console.log('order data ', order_data)

        const lineItems = order_data.map((food) => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: food.name,
                        images: [food.img]
                    },
                    unit_amount: Math.round(food.price*100)
                },
                quantity: food.qty
            }
        })

        const encodedOrderData = encodeURIComponent(JSON.stringify(order_data))   
        const encodedEmail = encodeURIComponent(email)

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `http://localhost:3000/success?order_data=${encodedOrderData}&email=${encodedEmail}`,
            cancel_url: `http://localhost:3000/cancel?${encodedEmail}`
        })

        // console.log(' session ' , session)

        res.json({ id: session.id })
    }
    catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
    }
}

orderCltr.myOrder = async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData })
    }
    catch (e) {
        res.json('server Error : ', e.message)
    }
}

orderCltr.orderData = async (req, res) => {
    let data = req.body.order_data

    // const data

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
