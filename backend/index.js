const express = require('express')
const cors = require('cors')
require('dotenv').config()
const configureDB = require('./configure/configureDB')
const router = require('./configure/routes')
const routerData = require('./configure/dataRoutes')
const orderRouter = require('./configure/orderDataRoutes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(router)
app.use(routerData)
app.use(orderRouter)
// console.log('porecc env' , process.env.PORT)

configureDB()

const PORT = process.env.PORT || 3066


app.listen(PORT, () => {
    console.log('connected to port : ' ,PORT)
})