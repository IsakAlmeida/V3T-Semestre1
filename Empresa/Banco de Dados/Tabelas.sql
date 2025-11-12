CREATE DATABASE v3t;

USE v3t;

-- ENDEREÇO: Armazena informações de localização, como rua, bairro, cidade, UF, CEP e número.
CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
CEP CHAR(8) NOT NULL,
Logradouro VARCHAR(50),
Bairro VARCHAR(50),
Cidade VARCHAR(50),
UF CHAR(2),
Numero VARCHAR(8)
);

 -- EMPRESA: Guarda os dados da organização, incluindo razão social, nome fantasia, CNPJ, e-mail e telefone.
CREATE TABLE Empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
RazaoSocial VARCHAR(45) NOT NULL,
NomeEmpresa VARCHAR(50),
CNPJ CHAR(14) NOT NULL UNIQUE,
Email VARCHAR(45) UNIQUE NOT NULL,
	CONSTRAINT chkEmailEmpresa CHECK(Email LIKE '%@%.%'),
Telefone CHAR(11),
Token VARCHAR(8) UNIQUE,
fkEndereco INT UNIQUE,
	CONSTRAINT fkEmpresaEndereco FOREIGN KEY(fkEndereco)
		REFERENCES Endereco (idEndereco)
);

-- USUÁRIO: Contém informações de acesso e perfil dos usuários vinculados a uma empresa, como nome, e-mail, senha e função (administrador ou funcionário).
CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 
NomeUsuario VARCHAR(45),
Email VARCHAR(45) UNIQUE NOT NULL,
	CONSTRAINT chkEmailUsuario CHECK(Email LIKE '%@%.%'),
Senha VARCHAR(45) NOT NULL,
fkEmpresa INT,
	CONSTRAINT fkUsuarioEmpresa FOREIGN KEY(fkEmpresa)
		REFERENCES Empresa (idEmpresa)
);

-- SENSOR: Registra os dispositivos instalados, incluindo status (ativo, em manutenção ou desativado), data de instalação e local.
CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
StatusSensor VARCHAR(13),
	CONSTRAINT chkStatus CHECK(StatusSensor IN('Ativo', 'Em manutenção', 'Desativado')),
dtInstalacao DATE,
Locall VARCHAR(45),
fkEmpresa INT,
	CONSTRAINT fkSensorEmpresa FOREIGN KEY(fkEmpresa)
		REFERENCES Empresa (idEmpresa)
);

-- REGISTROS: Armazena as leituras coletadas pelos sensores, como temperatura, umidade e data/hora do registro.
CREATE TABLE Registro(
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
Temperatura DECIMAL(5,2),
Umidade INT,
dtHora DATETIME,
fkSensor INT,
	CONSTRAINT fkRegistrosSensor FOREIGN KEY(fkSensor)
		REFERENCES Sensor (idSensor)
);
