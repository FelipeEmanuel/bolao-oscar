const mongoose = require('mongoose')

const categoriaSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    nome: {type: String, required: true},
    indicados: {type: Array, default: []},
    ativo: {type: Boolean, default: true},
    vencedor: {type: String, default: ''}
},{
    timestamps: true
})

module.exports = mongoose.model('Categoria', categoriaSchema)