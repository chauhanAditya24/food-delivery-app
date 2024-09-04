const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: ['name is required', true]
    },
    location: {
        type: String,
        required: ['location is required', true]
    },
    email: {
        type: String,
        required: ['email is required', true],
        unique: true
    },
    password: {
        type: String,
        required: ['password is required', true],
        minLength: 4,
        maxLenght: 64,
    },
    date: {
        type: Date,
        default:Date.now
    }
})

const User = mongoose.model('User' , userSchema)

module.exports = User