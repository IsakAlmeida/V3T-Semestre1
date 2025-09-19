CREATE DATABASE v3t;
use v3t;

-- CRIAÇÃO DAS TABELAS
CREATE TABLE endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(45),
numero INT,
bairro VARCHAR(45),
uf CHAR(2),
cep CHAR(8)
);

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT, 
nome VARCHAR(45),
cnpj CHAR(14),
fkEndereco INT UNIQUE, 
CONSTRAINT fkEnderecoEmpresa
FOREIGN KEY (fkEndereco)
REFERENCES endereco(idEndereco)
);

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(60) NOT NULL, 
senha VARCHAR(45) NOT NULL,
fkEmpresa INT,
CONSTRAINT fkEmpresaUsuario
FOREIGN KEY (fkEmpresa)
REFERENCES empresa(idEmpresa)
);

CREATE TABLE arduino (
idArduino INT  PRIMARY KEY AUTO_INCREMENT,
fkEmpresa INT, 
CONSTRAINT fkEmpresaArduino
FOREIGN KEY (fkEmpresa)
REFERENCES empresa(idEmpresa)
);

CREATE TABLE leitura (
idLeitura INT PRIMARY KEY AUTO_INCREMENT,
temperatura DECIMAL(5,2),
umidade DECIMAL(5,2),
horario DATETIME DEFAULT CURRENT_TIMESTAMP,
fkArduino INT,
CONSTRAINT fkArduinoLeitura
FOREIGN KEY (fkArduino)
REFERENCES arduino(idArduino)
);

