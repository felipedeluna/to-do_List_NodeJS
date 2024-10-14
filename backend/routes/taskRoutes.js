const express = require('express');
const {adicionarTarefa, listarTarefas} = require('../controllers/taskController');
const {autenticarToken} = require('../middleware/token');
const router = express.Router();

router.post('/', autenticarToken, adicionarTarefa)
router.get('/', autenticarToken, listarTarefas)

module.exports = router;