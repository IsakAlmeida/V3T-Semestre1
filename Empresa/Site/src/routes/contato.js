var express = require("express");
var router = express.Router();

var contatoController = require("../controllers/contatoController");

router.post("/contatar", function (req, res) {
    contatoController.contatar(req, res);
});

module.exports = router;