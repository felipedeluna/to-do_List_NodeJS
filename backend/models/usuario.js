const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UsuarioSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, trim: true},
    senha: {type: String, required: true, trim: true},
})

UsuarioSchema.pre('save', async function (evento) {
    if(!this.isModified('senha')) return evento()
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        evento();
    } catch (error) {
        evento(error);
    }    
})

module.exports = mongoose.model('Usuario', UsuarioSchema)