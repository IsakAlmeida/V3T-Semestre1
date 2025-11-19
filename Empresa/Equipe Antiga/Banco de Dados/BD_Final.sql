CREATE DATABASE v3t;
USE v3t;

 CREATE TABLE empresa(
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(60) NOT NULL,
    cnpj VARCHAR(14) UNIQUE, 
	rua VARCHAR(50),
    cidade VARCHAR(50),
    uf VARCHAR(2),
    cep VARCHAR(8),
    bairro VARCHAR(50),
    senhaEmpresa VARCHAR(30) NOT NULL,
    emailEmpresa VARCHAR(30) UNIQUE,
    CONSTRAINT chkemailEmpresa CHECK (emailEmpresa LIKE '%@%')
    );
 
 
    
CREATE TABLE monitoramento (
	idRegistro INT PRIMARY KEY AUTO_INCREMENT,
	fonteProteina VARCHAR(50),
	dtHora DATETIME DEFAULT CURRENT_TIMESTAMP , 
	Umidade DECIMAL(3,1),
	Temperatura DECIMAL(5,2),
	situacao VARCHAR(30),
	CONSTRAINT chkSituacao CHECK(situacao IN('Ideal', 'Não Ideal'))
    );

INSERT INTO monitoramento (fonteProteina, Umidade, Temperatura, situacao) VALUES
	('Proteína de Ervilha', 55.0, 22.0, 'Ideal'),
	('Proteína de Soja', 65.5, 26.0, 'Não Ideal'),
	('Proteína de Grão-de-bico', 50.0, 21.5, 'Ideal'),
	('Proteína de Arroz', 70.0, 27.0, 'Não Ideal'),
	('Proteína de Aveia', 58.0, 23.0, 'Ideal');
    
SELECT * FROM monitoramento;
    
SELECT fonteProteina AS "Nome da Proteína",
	CONCAT ('UR:',Umidade, ' / ', 'C°', Temperatura) AS "Umidade e Temperatura" 
		FROM monitoramento;



CREATE TABLE lote_producao(
    idLote INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE,
    descricao VARCHAR(100),
    dataInicio DATE,
    status_lote VARCHAR(20) CHECK (status_lote IN ('em andamento','finalizado','cancelado'))
	);



CREATE TABLE alertas(
	idAlertas INT PRIMARY KEY AUTO_INCREMENT,
	tempMin DECIMAL(5, 2) NOT NULL,
	tempMax DECIMAL(5, 2) NOT NULL,
	tempoAlerta DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
	);



CREATE TABLE proteinas (
    id_proteina INT PRIMARY KEY AUTO_INCREMENT,
    nome_proteina VARCHAR(100) NOT NULL,
    temp_min_proteina DECIMAL(5,2),
    temp_max_proteina DECIMAL(5,2),
    umid_min_proteina DECIMAL(5,2),
    umid_max_proteina DECIMAL(5,2)
	);
