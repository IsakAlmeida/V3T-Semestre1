var database = require("../database/config");

function buscarMedidaTempoRealSensor(idSensor) {
    var instrucaoSql = `
        SELECT temperaturaCelsius, umidadePorcentagem, dtHora
        FROM Captura
        WHERE fkSensor = ${idSensor}
        ORDER BY dtHora DESC
        LIMIT 1;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSensores(idEmpresa) {

    var instrucaoSql = `SELECT idSensor from Sensor s JOIN Reservatorio r
ON s.fkReservatorio = r.idReservatorio
JOIN Empresa e ON e.idEmpresa = r.fkEmpresa
	WHERE idEmpresa = ${idEmpresa};`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKPIsMacro(idEmpresa){
    var instrucaoSql = `select * from vw_kpis_macro where fkEmpresa = ${idEmpresa};`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosSensor(idSensor) {

    var instrucaoSql = `SELECT temperaturaCelsius, umidadePorcentagem, dtHora FROM Captura
	WHERE fkSensor = ${idSensor}
    ORDER BY dtHora DESC
    LIMIT 10;`

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarMedidaTempoRealSensor,
    buscarSensores,
    buscarDadosSensor,
    buscarKPIsMacro
}
