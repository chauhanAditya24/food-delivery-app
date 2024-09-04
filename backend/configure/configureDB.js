const mongoose = require('mongoose')

const db = process.env.DATABASE
// const db = "mongodb+srv://foodDeliveryApp:secret123@fooddeliveryapp.evysutc.mongodb.net/?retryWrites=true&w=majority&appName=foodDeliveryApp"
// console.log('db value' , db)
const configureDB = () => {
    mongoose.connect(db)
        .then((res) =>{
            console.log('connected to the db')
            
            const fetch_data =mongoose.connection.db.collection('food_items')
            return  fetch_data.find({}).toArray()
            
        })
        .then((data) => {
            global.food_items = data
            // console.log('data by db' , global.food_items)

        })
        .then(() => {
            const cat_data = mongoose.connection.db.collection('food_category')
            return cat_data.find({}).toArray()
        })
        .then((data) => {
            global.food_category = data
            
        })
        .catch((err) => {
            console.log('error connecting to the db ' , err)
        })
}

module.exports = configureDB