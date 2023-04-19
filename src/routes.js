const express = require('express');
const router = express.Router();

const CarroController = require('./controllers/CarroControoller');

router.get('/carros', CarroController.buscarTodos);
router.get('/carro/:placa', CarroController.buscarUm);
router.post('/carro', CarroController.inserir);
router.put('/carro/:id', CarroController.alterar);
router.delete('/carro/:id', CarroController.excluir)

module.exports = router;