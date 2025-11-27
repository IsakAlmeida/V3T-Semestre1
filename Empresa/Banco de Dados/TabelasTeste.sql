DROP DATABASE v3t;
CREATE DATABASE v3t;
USE v3t;

 -- EMPRESA: Guarda os dados da organização, incluindo razão social, nome fantasia, CNPJ, e-mail e telefone.
CREATE TABLE Empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(45) NOT NULL,
nomeEmpresa VARCHAR(50),
cnpj CHAR(14) NOT NULL UNIQUE
);

-- ENDEREÇO: Armazena informações de localização, como rua, bairro, cidade, UF, CEP e número.
CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
logradouro VARCHAR(50),
bairro VARCHAR(50),
cidade VARCHAR(50),
cep CHAR(8) NOT NULL,
uf CHAR(2),
numero VARCHAR(8),
complemento VARCHAR(45),
fkEmpresa INT UNIQUE,
	CONSTRAINT fkEnderecoEmpresa FOREIGN KEY (fkEmpresa)
		REFERENCES Empresa (idEmpresa)
);

-- CONTATO: Armazena informações de contato e responsáveis por uma empresa.
CREATE TABLE Contato(
idContato INT PRIMARY KEY AUTO_INCREMENT,
email VARCHAR(45) ,
CONSTRAINT chkEmailContato CHECK(Email LIKE '%@%.%'),
telefone CHAR(11),
responsavel VARCHAR(45),
fkEmpresa INT, 
	CONSTRAINT fkContatoEmpresa FOREIGN KEY (fkEmpresa)
		REFERENCES Empresa (idEmpresa)
);

CREATE TABLE Token (
idToken INT PRIMARY KEY AUTO_INCREMENT,
codigo CHAR(8) NOT NULL UNIQUE,
dtCriacao DATE,
dtVencimento DATE,
status VARCHAR(8),
	CONSTRAINT chkStatusToken
		CHECK (status IN ('Expirado','Ativo')),
fkEmpresa INT, 
	FOREIGN KEY (fkEmpresa)
		REFERENCES 	Empresa(idEmpresa)
);


-- NÍVEL DE ACESSO: Contém informações sobre o nível de acesso de cada usuário.
CREATE TABLE nivelAcesso(
idNivelAcesso INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(13),
	CONSTRAINT chkTipoAcesso
		CHECK (tipo IN ('Administrador','Visualizador', 'Suporte')),
descricao VARCHAR(200)
);

-- USUÁRIO: Contém informações de acesso e perfil dos usuários vinculados a uma empresa, como nome, e-mail, senha e função (administrador ou funcionário).
CREATE TABLE Usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT, 
nomeUsuario VARCHAR(45),
email VARCHAR(45) UNIQUE NOT NULL,
	CONSTRAINT chkEmailUsuario CHECK(Email LIKE '%@%.%'),
senha VARCHAR(45) NOT NULL,
fkEmpresa INT,
	CONSTRAINT fkUsuarioEmpresa FOREIGN KEY(fkEmpresa)
		REFERENCES Empresa (idEmpresa),
fkNivelAcesso INT,
	CONSTRAINT fkUsuarioNivelAcesso FOREIGN KEY(fkNivelAcesso)
		REFERENCES nivelAcesso (idNivelAcesso)
);

-- RESERVATÓRIO: Armazena informações sobre o reservatório de biotintas, onde acontecerá o monitoramento.
CREATE TABLE Reservatorio(
idReservatorio INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
locall VARCHAR(45),
fkEmpresa INT,
	CONSTRAINT fkReservatorioEmpresa FOREIGN KEY (fkEmpresa)
		REFERENCES Empresa (idEmpresa)
);

-- SENSOR: Registra os dispositivos instalados, incluindo status (ativo, em manutenção ou desativado), data de instalação e local.
CREATE TABLE Sensor(
idSensor INT PRIMARY KEY AUTO_INCREMENT,
statusSensor VARCHAR(13),
	CONSTRAINT chkStatus CHECK(statusSensor IN('Ativo', 'Em manutenção', 'Desativado')),
dtInstalacao DATE,
fkReservatorio INT UNIQUE,
	CONSTRAINT fkSensorReservatorio FOREIGN KEY(fkReservatorio)
		REFERENCES Reservatorio (idReservatorio)
);

-- CAPTURA: Armazena as leituras coletadas pelos sensores, como temperatura, umidade e data/hora da captura.
CREATE TABLE Captura(
idCaptura INT PRIMARY KEY AUTO_INCREMENT,
temperaturaCelsius DECIMAL(5,2),
umidadePorcentagem INT,
dtHora DATETIME,
fkSensor INT,
	CONSTRAINT fkCapturaSensor FOREIGN KEY(fkSensor)
		REFERENCES Sensor (idSensor)
);


-- LIMITE: Armazena o limite de temperatura e umidade para controle.
CREATE TABLE Limite(
idLimite INT PRIMARY KEY AUTO_INCREMENT,
tempMaxCelsius DECIMAL(4,2),
tempMinCelsius DECIMAL(4,2),
umidadeMaxPorcentagem INT,
umidadeMinPorcentagem INT
);


CREATE TABLE Status (
idStatus INT PRIMARY KEY AUTO_INCREMENT,
tipo VARCHAR(8),
	CONSTRAINT chkTipo
		CHECK (tipo IN ('Moderado', 'Crítico')),
fkLimite INT,
	FOREIGN KEY (fkLimite)
		REFERENCES Limite(idLimite)
);

-- HISTÓRICO DE ALERTA: Armazena informações sobre alertas de temperaturas e umidades fora de padrão.
CREATE TABLE HistoricoAlerta(
idHistoricoAlerta INT PRIMARY KEY AUTO_INCREMENT,
fkCaptura INT,
	FOREIGN KEY (fkCaptura)
		REFERENCES Captura(idCaptura),
fkStatus INT,
	CONSTRAINT fkHistoricoAlertaLimite FOREIGN KEY (fkStatus)
		REFERENCES Status(idStatus)
);

CREATE TABLE Biotinta (
idBiotinta INT PRIMARY KEY AUTO_INCREMENT,
materiaPrima VARCHAR(45),
fkLimite INT,
	FOREIGN KEY (fkLimite)
		REFERENCES Limite(idLimite)
);













