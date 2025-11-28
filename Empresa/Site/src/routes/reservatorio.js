var express = require("express");
var router = express.Router();

var reservatorioController = require("../controllers/reservatorioController");

router.get("/:empresaId", function (req, res) {
  reservatorioController.buscarReservatoriosPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  reservatorioController.cadastrar(req, res);
})

router.get("/historico/:reservatorioId", function (req, res) {
  reservatorioController.buscarHistoricoPorReservatorio(req, res);
});

module.exports = router;