CREATE DATABASE proteina3d;
USE proteina3d;

CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    senha VARCHAR(20),
    tipo VARCHAR(20) CHECK (tipo IN ('administrador','operador'))
);
CREATE TABLE lote_producao(
    idLote INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE,
    descricao VARCHAR(100),
    dataInicio DATE,
    status_lote VARCHAR(20) CHECK (status IN ('em andamento','finalizado','cancelado'))
);
CREATE TABLE leitura_sensor(
    idLeitura INT AUTO_INCREMENT PRIMARY KEY,
    temperatura INT,
    umidade INT,
    dataHora DATETIME
);