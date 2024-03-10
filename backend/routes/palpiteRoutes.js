const express = require('express')
const router = express.Router()
const {setPalpite, getUserPalpites, getAllUsersPalpites} = require('../controllers/palpiteController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setPalpite)
router.route('/palpites').get(protect, getUserPalpites)
router.route('/allPalpites').get(protect, getAllUsersPalpites)

module.exports = router