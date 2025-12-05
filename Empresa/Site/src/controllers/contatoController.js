var contatoModel = require("../models/contatoModel");

function contatar(req, res) {
    var responsavelVar = req.body.responsavelVar;
    var emailVar = req.body.emailVar;
    var telefoneVar = req.body.telefoneVar;

    contatoModel.contatar(responsavelVar, emailVar, telefoneVar).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao inserir os dados: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    contatar
}