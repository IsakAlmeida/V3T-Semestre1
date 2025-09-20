USE sprint2;

-- ENDEREÇO: Armazena informações de localização, como rua, bairro, cidade, UF, CEP e número.
CREATE TABLE Endereco(
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
Rua VARCHAR(50),
Bairro VARCHAR(50),
Cidade VARCHAR(50),
UF CHAR(2),
CEP CHAR(8) NOT NULL,
Numero VARCHAR(8)
);

 -- EMPRESA: Guarda os dados da organização, incluindo razão social, nome fantasia, CNPJ, e-mail e telefone.
CREATE TABLE Empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
RazaoSocial VARCHAR(45) NOT NULL,
NomeEmpresa VARCHAR(50),
CNPJ CHAR(14) NOT NULL,
Email VARCHAR(45) UNIQUE NOT NULL,
	CONSTRAINT chkEmailEmpresa CHECK(Email LIKE '%@%.%'),
Telefone CHAR(11),
fkEndereco INT,
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
Funcao VARCHAR(45),
	CONSTRAINT chkFuncao CHECK(funcao IN('Adminstrador', 'Funcionário')),
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

-- MONITORAMENTO: Armazena as leituras coletadas pelos sensores, como temperatura, umidade e data/hora do registro.
CREATE TABLE Monitoramento(
idMonitoramento INT PRIMARY KEY AUTO_INCREMENT,
Temperatura DECIMAL(5,2),
Umidade DECIMAL(5,2),
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkSensor INT,
	CONSTRAINT fkMonitoramentoSensor FOREIGN KEY(fkSensor)
		REFERENCES Sensor (idSensor)
);

/*
CREATE TABLE Produto(
idProduto INT PRIMARY KEY AUTO_INCREMENT,
tipoCarneVegetal VARCHAR(45),
CONSTRAINT chkTipoCarneVegetal CHECK(tipoCarneVegetal IN('Soja', 'Feijao', 'Arroz', 'Alga'))
);
*/
