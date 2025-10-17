CREATE DATABASE foodtech;
USE foodtech;

-- Tabela Empresa
CREATE TABLE empresa(
	id_empresa INT PRIMARY KEY AUTO_INCREMENT,
    nome_empresa VARCHAR(60) NOT NULL,
    cnpj VARCHAR(14) UNIQUE, 
	rua VARCHAR(50),
    cidade VARCHAR(50),
    estado VARCHAR(2),
    cep VARCHAR(8),
    bairro VARCHAR(50),
    senha_empresa VARCHAR(30) NOT NULL,
    email_empresa VARCHAR(30) UNIQUE
);

-- Tabela Usuário
CREATE TABLE usuario (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(60) NOT NULL,
    email_usuario VARCHAR(30) UNIQUE,
    senha_usuario VARCHAR(30) NOT NULL,
    permissao VARCHAR(20)
    CONSTRAINT chkPermissao CHECK (permissao IN('Admin', 'Usuario'))
);

-- Tabela Monitoramento - Arduino
CREATE TABLE monitoramento(
	id_monitoramento INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(3,2) NOT NULL,
    horario DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Tabela Alimentos
CREATE TABLE alimentos(
	id_alimentos INT PRIMARY KEY AUTO_INCREMENT,
    nome_alimento VARCHAR(30) NOT NULL,
    temp_ideal DECIMAL(3,2) NOT NULL
);

-- INSERINDO DADOS
INSERT INTO empresa (nome_empresa, cnpj, rua, cidade, estado, cep, bairro, senha_empresa, email_empresa) VALUES
	('FoodTech', '75041338000190', 'Rua Teste 123', 'São Paulo', 'SP', '07900170', 'Bairro Teste 123', 'admin123', 'foodtech@gmail.com'),
    ('Print&Eat', '02547843000138', 'Rua João 3', 'Salvador', 'BA', '09856325', 'Bairro Hermes 3', 'senha123', 'printeat@gmail.com');
    
INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, permissao) VALUES
	('Jorge Henrique', 'jorgehenrique@gmail.com', 'jorge123', 'Usuario'),
    ('Admin', 'admin@gmail.com', 'admin123', 'Admin');
    
INSERT INTO monitoramento (temperatura) VALUES
	('-2.0'),
    ('7.0');
    
INSERT INTO alimentos (nome_alimento, temp_ideal) VALUES
	('Salmão', '-2.0'),
    ('Macarrão', '7.0');
    
SELECT * FROM empresa;
SELECT * FROM usuario;
SELECT * FROM monitoramento;
SELECT * FROM alimentos;