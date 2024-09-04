const dataCltr = {}

dataCltr.list = async (req, res) => {
    try{
        res.json([global.food_items , global.food_category])
        // res.send(global.food_items)
    }
    catch(err){
        res.json("server Error")
    }
}

module.exports = dataCltr