var medidaModel = require("../models/medidaModel");

function buscarMedidaTempoRealSensor(req, res) {
    var idSensor = req.params.idSensor;

    medidaModel.buscarMedidaTempoRealSensor(idSensor)
        .then(resultado => {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarSensores(req, res) {
    var idEmpresa = req.params.idEmpresa;

    medidaModel.buscarSensores(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarKPIsMacro(req, res){
    var idEmpresa = req.params.idEmpresa;

    medidaModel.buscarKPIsMacro(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosSensor(req, res) {
    var idSensor = req.params.idSensor;

    medidaModel.buscarDadosSensor(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarMedidaTempoRealSensor,
    buscarSensores,
    buscarDadosSensor,
    buscarKPIsMacro

}