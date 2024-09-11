const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
    email:{
        required:true,
        type: String,
        unique:true
    },
    order_data:{
        type:Array,
        required:true
    }
})

const Order = mongoose.model('Order' , orderSchema)

module.exports = Order
