const Tarefa = require('../models/tarefa')

async function adicionarTarefa(req, res){
    const {titulo} = req.body;

    try{
        const novaTarefa = new Tarefa({
            titulo,
            usuario: req.usuario.id
        });

        await novaTarefa.save();
        return res.status(201).json(novaTarefa)
    }catch(err){
        return res.status(500).json({ error: err.message});
    }
}

module.exports = { adicionarTarefa }