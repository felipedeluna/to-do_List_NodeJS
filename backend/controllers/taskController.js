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

async function atualizarStatusTarefa(req, res){
    const { id } = req.params;
    const { status } = req.body;

    try{
        const tarefa = await Tarefa.findOneAndUpdate(
            {_id:id, usuario: req.usuario.id}, 
            { status },
            { new: true }
        );

        if(!tarefa){
            return res.status(404).json({ error: 'Tarefa não encontrada'});
        }
        return res.json(tarefa);
}catch(err){
    return res.status(500).json({ error: 'Erro ao atualizar status da tarefa'});
}

}

module.exports = { adicionarTarefa, listarTarefas, atualizarStatusTarefa }