const express = require('express');
const router = express.Router();
const {criarUsuario} = require('../controllers/authController');

router.post('/registrar', criarUsuario);

module.exports = router;
