const Tarefa = require('../models/tarefa')
const redisClient = require('../config/redis')

async function adicionarTarefa(req, res){
    const {titulo} = req.body;

    try{
        const novaTarefa = new Tarefa({
            titulo,
            usuario: req.usuario.id
        });

        await novaTarefa.save();
	await redisClient.del(req.usuario.id);
        return res.status(201).json(novaTarefa);
    }catch(err){
        return res.status(500).json({ error: 'Erro ao adicionar tarefa'});
    }
}

async function listarTarefas(req, res){
    const idUsuario = req.usuario.id

    try{
	const tarefasRedis = await redisClient.get(idUsuario)

	if(tarefasRedis){
	    return res.json(JSON.parse(tarefasRedis))
	}

        const tarefas = await Tarefa.find({ usuario: req.usuario.id }).sort({ dataCriacao: -1 });

	await redisClient.setEx(idUsuario, 1800, JSON.stringify(tarefas))

        return res.json(tarefas);
    }catch(err){
        return res.status(500).json({ error: err});
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
	await redisClient.del(req.usuario.id);
        return res.json(tarefa);
}catch(err){
    return res.status(500).json({ error: 'Erro ao atualizar status da tarefa'});
}

}

async function removerTarefa(req, res){
    const { id } = req.params;

    try{
        const tarefa = await Tarefa.deleteOne(
            {_id:id, usuario: req.usuario.id},
            { new: true }
        );

        if(!tarefa){
            return res.status(404).json({ error: 'Tarefa não encontrada'});
        }
	await redisClient.del(req.usuario.id);
        return res.json(tarefa);
}catch(err){
    return res.status(500).json({ error: 'Erro ao excluir tarefa'});
}

}

module.exports = { adicionarTarefa, listarTarefas, atualizarStatusTarefa, removerTarefa}
