const express = require('express')
const router = express.Router()
const {getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria, updateAtivo} = require('../controllers/categoriaController')
const { protect, isAdmin } = require('../middleware/authMiddleware')

router.route('/').get(protect, getCategorias).post(protect, isAdmin, createCategoria)
router.route('/:id').delete(protect, isAdmin, deleteCategoria).put(protect, isAdmin, updateCategoria).get(protect, isAdmin, getCategoriaById)
router.route('/ativos').put(protect, isAdmin, updateAtivo) 
module.exports = router