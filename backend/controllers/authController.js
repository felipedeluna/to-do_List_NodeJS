const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function criarUsuario(req, res) {
    const { email, senha } = req.body
    try {
        // Verifica se o email já está cadastrado
        const usuarioExistente = await Usuario.findOne({ email })
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Email já cadastrado' })
        }
        
        // Cria um novo usuário
        const novoUsuario = new Usuario({email, senha});

        await novoUsuario.save();

        return res.status(201).json({ message: 'Cadastro realizado com sucesso!' })
    }catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Falha ao cadastrar o usuário' })
    }
}

module.exports = {criarUsuario}