const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({message: "Get Goals"})
})

const createGoal = asyncHandler(async(req, res) => {
    
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text')
    }
    res.status(201).json({message: "create a new Goal"})
})

const updateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Update goal with id ${req.params.id}`})
})

const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete goal with id ${req.params.id}`})
})


module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal
}