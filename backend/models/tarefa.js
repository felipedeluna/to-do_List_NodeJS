const mongoose = require('mongoose')

const TarefaSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ['pendente', 'completa'], default: 'pendente' },
    created_at: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Tarefa', TarefaSchema)