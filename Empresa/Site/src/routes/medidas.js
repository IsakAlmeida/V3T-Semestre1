var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/buscarSensores/:idEmpresa", function (req, res) {
    medidaController.buscarSensores(req, res);
})

router.get("/buscarDadosSensor/:idSensor", function (req, res) {
    medidaController.buscarDadosSensor(req, res);
})

router.get("/tempo-real-sensor/:idSensor", function(req, res){
    medidaController.buscarMedidaTempoRealSensor(req, res);
});

module.exports = router;