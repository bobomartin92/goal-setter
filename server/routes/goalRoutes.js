const router = require('express').Router()
const {getGoals, createGoal, deleteGoal, updateGoal} = require('../controllers/goalControllers')

router.get('/', getGoals)

router.post('/', createGoal)

router.put('/:id', updateGoal)

router.delete('/:id', deleteGoal)

module.exports = router