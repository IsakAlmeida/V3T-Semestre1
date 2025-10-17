CREATE DATABASE v3t;
USE v3t;

CREATE TABLE endereco (
idEndereco INT PRIMARY KEY AUTO_INCREMENT,
logradouro VARCHAR(150) NOT NULL,
numero VARCHAR(10) NOT NULL,
complemento VARCHAR(150),
cidade VARCHAR(60),
uf CHAR(2),
cep CHAR(8) NOT NULL
);

INSERT INTO endereco (logradouro, numero, cidade, uf, cep) VALUES
	('Avenida das laranjas', '1000', 'São Paulo', 'SP', '01234001'),
	('Avenida das ameixas', '2000', 'Minas Gerais', 'MG', '43210100'),
	('Avenida dos limões', '3000', 'Rio de Janeiro', 'RJ', '34120010');

SELECT CONCAT(logradouro, ', ', numero, ' - ', cidade, ' - ' , uf, ' - ', cep) AS 'Endereço completo',
  IFNULL(complemento, 'Sem Complemento')
FROM endereco;

CREATE TABLE empresa (
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
razaoSocial VARCHAR(90) NOT NULL,
nomeFantasia VARCHAR(80) NOT NULL,
cnpj CHAR(14) NOT NULL UNIQUE,
contrato TINYINT,
  CONSTRAINT chkContrato 
	CHECK(contrato IN(0,1)),
fkEndereco INT UNIQUE,
CONSTRAINT fkEnderecoEmpresa
    FOREIGN KEY (fkEndereco)
	REFERENCES endereco(idEndereco)
);


INSERT INTO empresa (razaoSocial, nomeFantasia, cnpj, contrato, fkEndereco) VALUES
	('NutriPrint Alimentos LTDA', 'NutriPrint 3D', '01001001000101', 0, 1),
	('FutureTaste Indústria de Alimentos LTDA', 'FutureTaste', '02002002000202', 1, 2),
	('GreenProtein Tecnologia Alimentar SA', 'GreenProtein 3D', '03003003000303', 1, 3);

SELECT nomeFantasia AS 'Nome Fantasia', 
  concat(razaoSocial, ' ', cnpj) AS 'Razão social e CNPJ', 
  CASE
    WHEN contrato = 0 THEN 'Inativo'
    ELSE 'Ativo'
  END AS 'Situação de Contrato'
FROM empresa;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(20) NOT NULL,
sobrenome VARCHAR(100) NOT NULL,
email VARCHAR(60) NOT NULL UNIQUE,
telefone CHAR(11),
senha VARCHAR(100) NOT NULL,
nivelAcesso TINYINT NOT NULL,
  CONSTRAINT chkNivel 
	CHECK(nivelAcesso >=1 AND nivelAcesso <=5),
fkEmpresa INT,
CONSTRAINT fkEmpresaUsuario
    FOREIGN KEY (fkEmpresa)
	REFERENCES empresa(idEmpresa)
);

INSERT INTO usuario (nome, sobrenome, telefone, nivelAcesso, email, senha, fkEmpresa) VALUES
	('Bianca', 'Iwata', '11290020002', 2, 'bianca@futuretaste.com.br', 'FutureBest23', 2),
    ('Caique', 'Gomes', '11190010001', 2, 'caique@futuretaste.com.br', 'futuRe#2025', 2),
	('Isak', 'Almeida', '11190030003', 1, 'isak@greenprotein.com.br', 'GreenP@ss!', 3),
	('Lucas', 'Frossi', '11190040004', 4, 'lucas@greenprotein.com.br', 'GreenProtein!2025', 3),
	('Rayza', 'Gomes', '11190060006', 5, 'rayza@nutriprint.com.br', 'senhaSegura123', 1),
	('Victor', 'Guimarães', '11190050005', 3, 'victor@futuretaste.com.br', 'vegPrint#321', 2);
    
    SELECT concat(nome, ' ', sobrenome) AS 'Dados do funcionário (Nome completo)', 
  concat(telefone, ' / ', email) AS 'Dados de acesso (telefone e e-mail)', 
  nivelAcesso AS 'Nivel de acesso' 
FROM usuario;

CREATE TABLE arduino (
idArduino INT PRIMARY KEY AUTO_INCREMENT,
sensor VARCHAR(45) NOT NULL,
dataHora DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
temperatura DECIMAL(5,2) NOT NULL,
umidade DECIMAL(5,2) NOT NULL,
fkEmpresa INT,
CONSTRAINT fkEmpresaArduino
    FOREIGN KEY (fkEmpresa)
	REFERENCES empresa(idEmpresa)
);

INSERT INTO arduino (sensor, dataHora, temperatura, umidade, fkEmpresa) VALUES
	('Sensor 1', '2025-09-18 08:30:00', 24.50, 55.20, 1),
	('Sensor 2', '2025-09-18 08:35:00', 22.80, 60.10, 2),
	('Sensor 3', '2025-09-18 08:40:00', 25.30, 50.70, 3),
	('Sensor 4', '2025-09-18 08:45:00', 18.90, 65.40, 2),
	('Sensor 5', '2025-09-18 08:50:00', 23.70, 52.80, 3);

SELECT sensor AS Sensor,
	dataHora AS 'Data e horário de detecção',
    empresa.nomeFantasia AS Empresa
FROM arduino JOIN empresa
	ON fkEmpresa = idEmpresa;

 