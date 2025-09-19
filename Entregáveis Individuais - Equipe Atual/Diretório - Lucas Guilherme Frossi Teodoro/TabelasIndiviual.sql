USE Projeto;

CREATE TABLE CadastroEmpresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    NomeEmpresa VARCHAR(70),
    CNPJ CHAR(18) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
		CONSTRAINT chkEmailEmpresa CHECK(Email LIKE '%@%.%'),
	Senha VARCHAR(12) NOT NULL,
    Token INT UNIQUE,
    fkEndereco INT,
		CONSTRAINT fkEmpresaEndereco FOREIGN KEY(fkEndereco)
			REFERENCES Endereco(idEndereco),
	fkSensor INT,
		CONSTRAINT fkEmpresaSensor FOREIGN KEY(fkSensor)
			REFERENCES Sensor(idSensor)
);

CREATE TABLE Endereco (
	idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    CEP VARCHAR(8) NOT NULL,
    UF CHAR(2),
    Cidade VARCHAR(50),
    Bairro VARCHAR(50),
    Rua VARCHAR(50)
);

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	Nome VARCHAR (70) NOT NULL,
	CPF CHAR(14) NOT NULL UNIQUE,
	Cargo VARCHAR(20)
			CONSTRAINT chkCargo CHECK(Cargo IN('Master', 'Colaborador')),
	Email VARCHAR(100) NOT NULL UNIQUE,
			CONSTRAINT chkEmailUsuario CHECK(Email LIKE '%@%'),
	Senha VARCHAR(12) NOT NULL,
    fkEmpresa INT,
		CONSTRAINT fkUsuarioEmpresa FOREIGN KEY(fkEmpresa)
			REFERENCES CadastroEmpresa(idEmpresa)
);

CREATE TABLE Sensor(
	idSensor INT PRIMARY KEY AUTO_INCREMENT,
    TempMax DECIMAL (5,2),
    TempMin DECIMAL(5,2),
    UmidadeMax DECIMAL(5,2),
    UmidadeMin DECIMAL(5,2),
    Locall VARCHAR(40)
);

CREATE TABLE Registro(
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
	TempAtual DECIMAL (5,2),
	HorarioRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    Alerta VARCHAR(8) NOT NULL
		CONSTRAINT chkAlerta CHECK(Alerta IN('Crítico', 'Moderado', 'Adequado')),
	fkSensor INT,
		CONSTRAINT fkRegistroSensor FOREIGN KEY(fkSensor)
			REFERENCES Sensor(idSensor)
);