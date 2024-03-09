const mongoose = require('mongoose')

const palpiteSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    categoria: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Categoria'},
    palpite: {type: String, required: true}
},{
    timestamps: true
})

module.exports = mongoose.model('Palpite', palpiteSchema)