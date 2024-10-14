const express = require('express');
const router = express.Router();
const {cadastrarUsuario, logar} = require('../controllers/authController');

router.post('/cadastrar', cadastrarUsuario);
router.post('/logar', logar);

module.exports = router;
