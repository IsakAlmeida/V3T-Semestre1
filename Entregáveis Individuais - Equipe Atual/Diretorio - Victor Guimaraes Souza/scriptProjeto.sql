CREATE DATABASE V3T;
USE V3T;
CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
rua VARCHAR(50),
bairro VARCHAR(50),
cidade VARCHAR(50),
estado VARCHAR(45),
uf CHAR(2),
cep CHAR(8),
numero CHAR(8)
);

CREATE TABLE Empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
nomeEmpresa VARCHAR(50) NOT NULL,
cnpj CHAR(14) NOT NULL,
email VARCHAR(45) UNIQUE,
telefone CHAR(11),
fkEndereco INT UNIQUE,
CONSTRAINT fkEndereco FOREIGN KEY (fkEndereco)
REFERENCES Endereco(idEndereco)
);

CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 
nomeUsuario VARCHAR(45),
senha VARCHAR(45) UNIQUE,
funcao VARCHAR(45),
CONSTRAINT chkFuncao CHECK(funcao IN('Adminstrador', 'Funcionário')),
fkEmpresa INT,
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa)
REFERENCES Empresa(idEmpresa)
);

CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
numeroSensor INT,
statusSensor VARCHAR(45),
dtInstalacao DATE 
);

CREATE TABLE Monitoramento(
idMonitoramento INT PRIMARY KEY AUTO_INCREMENT,
temperatura DECIMAL(5,2),
umidade DECIMAL(5,2),
dataHora DATETIME,
fkSensor INT,
CONSTRAINT fkSensor FOREIGN KEY (fkSensor)
REFERENCES Sensor(idSensor)
);

CREATE TABLE Produto(
idProduto INT PRIMARY KEY AUTO_INCREMENT,
tipoCarneVegetal VARCHAR(45),
CONSTRAINT chkTipoCarneVegetal CHECK(tipoCarneVegetal IN('Soja', 'Feijao', 'Arroz', 'Alga'))
);

CREATE TABLE SalaArmazenamento(
idSalaArmazenamento INT PRIMARY KEY AUTO_INCREMENT,
nomeSala VARCHAR(45),
numero CHAR(6),
fkEmpresas INT,
CONSTRAINT fkEmpresas FOREIGN KEY (fkEmpresas)
REFERENCES Empresa(idEmpresa),
fkProduto INT,
CONSTRAINT fkProduto FOREIGN KEY (fkProduto)
REFERENCES Produto(idProduto),
fkSensores INT,
CONSTRAINT fkSensores FOREIGN KEY (fkSensores)
REFERENCES Sensor(idSensor)
);