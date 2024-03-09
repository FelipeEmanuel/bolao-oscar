const asyncHandler = require('express-async-handler')
const Palpite = require('../models/palpiteModel')
const Categoria = require('../models/categoriaModel')

const setPalpite = asyncHandler(async (req, res) => {

    let palpite = req.body
    if(!palpite) {
        res.status(400)
        throw new Error('Please add all text fields')
    }

    let palpiteEncontrado = await Palpite.findOne({categoria: palpite.categoria_id, user: req.user.id})
    let obj = {user: req.user.id, categoria: palpite.categoria, palpite: palpite.palpite} 
   
    if(palpiteEncontrado) {   
        res.status(400)
        throw new Error('Não pode editar o palpite colega')    
    } else { 
        await Palpite.create(obj)
    }
    
    res.status(200).json(obj)
    
})

const getUserPalpites = asyncHandler(async (req, res) => {

    const userPalpites = await Palpite.find({user: req.user.id}).populate('categoria')

    const categorias = await Categoria.find()

    res.status(200).json({userPalpites, categorias})
})


module.exports = {
    setPalpite, getUserPalpites
}