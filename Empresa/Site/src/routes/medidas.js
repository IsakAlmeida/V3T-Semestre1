var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idReservatorio", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idReservatorio", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/buscarSensores/:idEmpresa", function (req, res) {
    medidaController.buscarSensores(req, res);
})

router.get("/buscarDadosSensor/:idSensor", function (req, res) {
    medidaController.buscarDadosSensor(req, res);
})
module.exports = router;