const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
  deleteUser,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/', loginUser)
router.get('/me', protect, getMe)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router