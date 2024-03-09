const asyncHandler = require('express-async-handler')
const Categoria = require('../models/categoriaModel')
const cron = require('node-cron')
//const Palpite = require('../models/palpiteModel')

const getCategorias = asyncHandler(async (req, res) => {
    const categorias = await Categoria.find()

    res.status(200).json(categorias)
})

const getCategoriaById = asyncHandler(async (req, res) => {
    const categoria = await Categoria.findById(req.params.id)

    if(!categoria) {
        res.status(400)
        throw new Error('Categoria not found!')
    }

    res.status(200).json(categoria)

})

const createCategoria = asyncHandler(async (req, res) => {

    const {nome, indicados} = req.body

    if (!nome || !indicados) {
        res.status(400)
        throw new Error('Please add all text fields!')
    }

    //const game = await Palpite.create(obj)
    const categoria = await Categoria.create({
        user: req.user.id, nome, indicados
    })

    const categorias = await Categoria.find()

    res.status(200).json(categorias)
})

const updateCategoria = asyncHandler(async (req, res) => {
    const categoria = await Categoria.findById(req.params.id)

    if(!categoria) {
        res.status(400)
        throw new Error('Categoria not found')
    }

    await Categoria.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    const categorias = await Categoria.find()

    res.status(200).json(categorias)
})

const deleteCategoria = asyncHandler(async (req, res) => {

    /*try {
        await Palpite.deleteMany({ "jogo" : req.params.id})
    } catch (error) {
        console.log("Deu erro aqui", error);
    }*/

    await Categoria.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err) {
            console.log(err)
            res.status(400)
            throw new Error('Categoria not found')
        }
        else {
            console.log("Deleted : ", docs);
            res.status(200).json({id: req.params.id})
        }
    });
       
})

const updateAtivo = asyncHandler(async (req, res) => {
    
    const categorias = await Categoria.find()

    categorias.forEach(c => {
        if(g.ativo == true) {
            Game.bulkWrite([
                { updateOne: {
                    filter: { _id: c._id},
                    update: { $set: {ativo: false}}
                }}
            ])
        }
    })
})

cron.schedule("00 20 * * 7", function () {
    const set = updateAtivo();
}, {
    timezone: "America/Sao_Paulo"
})

module.exports = {
    getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria, updateAtivo
}