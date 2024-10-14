const express = require('express');
const {adicionarTarefa, listarTarefas, atualizarStatusTarefa} = require('../controllers/taskController');
const {autenticarToken} = require('../middleware/token');
const router = express.Router();

router.post('/', autenticarToken, adicionarTarefa)
router.get('/', autenticarToken, listarTarefas)
router.put('/:id', autenticarToken, atualizarStatusTarefa)

module.exports = router;