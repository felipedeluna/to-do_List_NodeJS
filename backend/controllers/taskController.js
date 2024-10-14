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
        return res.status(500).json({ error: 'Erro ao adicionar tarefa'});
    }
}

async function listarTarefas(req, res){
    try{
        const tarefas = await Tarefa.find({ usuario: req.usuario.id }).sort({ dataCriacao: -1 });
        return res.json(tarefas);
    }catch(err){
        return res.status(500).json({ error: 'Erro ao listar tarefas'});
    }
}

module.exports = { adicionarTarefa, listarTarefas }