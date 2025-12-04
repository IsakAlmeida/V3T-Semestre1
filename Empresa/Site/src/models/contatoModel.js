var database = require("../database/config");

function contatar(responsavelVar, emailVar, telefoneVar) {
    var instrucaoSql = `INSERT INTO Contato (responsavel, email, telefone) VALUES
	('${responsavelVar}', '${emailVar}', '${telefoneVar}');`;

    return database.executar(instrucaoSql);
}

module.exports = {
    contatar
}