const Usuario = require('../models/usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function cadastrarUsuario(req, res) {
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

        //Retorna a resposta para o frontend
        return res.status(201).json({ message: 'Cadastro realizado com sucesso!' })
    }catch (err) {
        return res.status(500).json({ error: 'Falha ao cadastrar o usuário' })
    }
}

async function logar(req, res) {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({email});
        
        if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Gera o token JWT
        const token = jwt.sign({ id: usuario.id }, 'secretKey', { expiresIn: '3600' });
        console.log(token);
        return res.json({token, email});

    } catch (error) {
        return res.status(500).json({ error: 'Erro ao fazer login' });
    }
}

module.exports = {cadastrarUsuario, logar}