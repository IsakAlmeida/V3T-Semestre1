-- Banco de dados - V3T

CREATE TABLE cad_cliente (
	id_cliente INT PRIMARY KEY AUTO_INCREMENT,
	cnpj VARCHAR(50) NOT NULL UNIQUE,
	nome VARCHAR(50) NOT NULL,
	dataContratacao DATE NOT NULL,
	telefone VARCHAR(20),
	email VARCHAR(50) NOT NULL,
	nomeRepresentante VARCHAR(80)
);

CREATE TABLE endereco (
	id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR(100),
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    rua VARCHAR(100),
    cep VARCHAR(100) NOT NULL,
    numero INT,
    constraint fk_endereeco_cliente
    foreign key (id_endereco)
    references  cad_cliente(id_cliente)
);

 CREATE TABLE login ( -- Para acesso ao nosso sistema
	id_login INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(50) NOT NULL, 
	senha varchar(20) NOT NULL,
	telefone VARCHAR(20), -- Para recuperação de senha
    constraint fk_login_cliente
	foreign key (id_login)
    references cad_cliente (id_cliente)
);

CREATE TABLE impressora ( -- caso tenha mais de uma impressora/estoque do produto 
	id_impressora INT PRIMARY KEY AUTO_INCREMENT,
    numeroImpressora INT NOT NULL,
	nome_setor VARCHAR(100), -- nome da sala onde esta a impressora/estoque
	constraint fk_impressora_cliente
	foreign key (id_impressora)
    references cad_cliente (id_cliente)
);

CREATE TABLE temperatura (
	id_temperatura INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(3,1) NOT NULL,
    umidade DECIMAL(3,1) NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
	constraint fk_temperatura_impressora
	foreign key (id_temperatura)
    references impressora (id_impressora)
);