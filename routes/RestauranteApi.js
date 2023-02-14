const express = require ("express");
const router = express.Router();

const PratoController = require("../controllers/PratoController");

router.get('/pratos/',PratoController.get);

router.get('/pratos/:prato_id',PratoController.getById);

router.post('/pratos/',PratoController.post);

router.put('/pratos/:prato_id',PratoController.put);

router.delete('/pratos/:prato_id',PratoController.delete);

const EmentaController = require("../controllers/EmentaController");

router.get('/ementas/',EmentaController.get);

router.get('/ementas/:ementa_id',EmentaController.getById);

router.post('/ementas/',EmentaController.post);

router.put('/ementas/:ementa_id',EmentaController.put);

router.delete('/ementas/:ementa_id',EmentaController.delete);

const ReservaController = require("../controllers/ReservaController");

router.get('/reservas/',ReservaController.get);

router.get('/reservas/:reserva_id',ReservaController.getById);

router.get('/reservas/:reserva_num/aluno',ReservaController.getByNumAluno);

router.post('/reservas/',ReservaController.post);

router.put('/reservas/:reserva_id',ReservaController.put);

router.delete('/reservas/:reserva_id',ReservaController.delete);

module.exports = router;