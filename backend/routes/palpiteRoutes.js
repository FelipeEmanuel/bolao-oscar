const express = require('express')
const router = express.Router()
const {setPalpite, getUserPalpites} = require('../controllers/palpiteController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setPalpite)
router.route('/palpites').get(protect, getUserPalpites)

module.exports = router