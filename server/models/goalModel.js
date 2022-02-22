const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, {
    timestamps: true
})

const goalModel = mongoose.model('Goal', goalSchema)


module.exports = goalModel