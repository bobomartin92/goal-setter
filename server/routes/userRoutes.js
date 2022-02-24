const router = require("express").Router()
const {registerUser, loginUser, getUser} = require('../controllers/userControllers')
const { protect } = require("../middleware/authMiddleware")


router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/user', protect, getUser)

module.exports = router