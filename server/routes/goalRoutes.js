const router = require('express').Router()
const {getGoals, createGoal, deleteGoal, updateGoal} = require('../controllers/goalControllers')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getGoals)

router.post('/', protect, createGoal)

router.put('/:id', protect, updateGoal)

router.delete('/:id', protect, deleteGoal)

module.exports = router