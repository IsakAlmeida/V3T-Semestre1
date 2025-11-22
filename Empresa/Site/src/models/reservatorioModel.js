var database = require("../database/config");

function buscarReservatoriosPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM Reservatorio r WHERE fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId) {
  
  var instrucaoSql = `INSERT INTO Reservatorio (fkEmpresa) VALUES (${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarReservatoriosPorEmpresa,
  cadastrar
}
