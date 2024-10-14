const mongoose = require('mongoose')

const TarefaSchema = new mongoose.Schema({
    titulo: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pendente', 'completa'], default: 'pendente' },
    created_at: { type: Date, default: Date.now },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true }
})

module.exports = mongoose.model('Tarefa', TarefaSchema)