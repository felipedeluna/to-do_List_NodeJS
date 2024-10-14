const express = require('express');
const {adicionarTarefa} = require('../controllers/taskController');
const {autenticarToken} = require('../middleware/token');
const router = express.Router();

router.post('/', autenticarToken, adicionarTarefa)
router.get('/', autenticarToken)

module.exports = router;