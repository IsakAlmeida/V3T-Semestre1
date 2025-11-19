CREATE DATABASE V3T;
USE V3T;

-- Tabela Empresa
CREATE TABLE empresa (
	idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(45) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    telefone VARCHAR(9),
    login VARCHAR(45) UNIQUE,
    senha VARCHAR(45) NOT NULL
    );
    
INSERT INTO Empresa (razaoSocial, email, telefone, login, senha) VALUES
	('FoodTech Ltda', 'contato@foodtech.com', '11332211', 'foodtech', '123456'),
	('VegProtein S.A.', 'suporte@vegprotein.com', '11998877', 'vegprotein', 'abcdef');

-- Tabela Reservatorio
CREATE TABLE Reservatorio (
	idReservatorio INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(45) NOT NULL,
    cidade VARCHAR(45) NOT NULL,
    estado CHAR(2) NOT NULL,
    fkEmpresa INT NOT NULL,
		CONSTRAINT fkEmpresaReservatorio
			FOREIGN KEY (fkEmpresa)
				REFERENCES Empresa(idEmpresa)
    );

INSERT INTO Reservatorio (rua, cidade, estado, fkEmpresa) VALUES
	('Rua das Palmeiras, 100', 'São Paulo', 'SP', 1),
	('Av. Brasil, 2000', 'Campinas', 'SP', 1),
	('Rua Verde, 50', 'Curitiba', 'PR', 2);

-- Tabela Arduino
CREATE TABLE Arduino (
	idArduino INT PRIMARY KEY AUTO_INCREMENT,
    situacao VARCHAR(7) NOT NULL, CONSTRAINT chkSituacao CHECK(situacao IN ('Ativo', 'Inativo')),
    dtInstalacao DATE NOT NULL,
    fkReservatorio INT NOT NULL,
		CONSTRAINT fkReservatorioArduino
			FOREIGN KEY (fkReservatorio)
				REFERENCES Reservatorio(idReservatorio)
	);

INSERT INTO Arduino (situacao, dtInstalacao, fkReservatorio) VALUES
	('Ativo', '2025-01-10', 1),
	('Ativo', '2025-01-15', 1),
	('Inativo', '2025-02-01', 2),
	('Ativo', '2025-02-05', 3);
    
-- Tabela Leitura
CREATE TABLE Leitura (
	idLeitura INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(5,2) NOT NULL,
    umidade DECIMAL(5,2) NOT NULL,
    dataHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkArduino INT NOT NULL,
		CONSTRAINT fkArduinoLeitura
			FOREIGN KEY (fkArduino)
				REFERENCES Arduino(idArduino)
    );

INSERT INTO Leitura (temperatura, umidade, fkArduino) VALUES
	(8.50, 65.20, 1),
	(12.30, 70.10, 1),
	(9.00, 80.50, 2),
	(15.20, 60.00, 3),
	(7.80, 75.40, 4);

-- Tabela Alerta
CREATE TABLE Alerta (
	idAlerta INT PRIMARY KEY AUTO_INCREMENT,
    mensagem VARCHAR(100) NOT NULL,
    tipo VARCHAR(11) NOT NULL, CONSTRAINT chkTipo CHECK (tipo IN('Temperatura', 'Umidade')),
    gravidade VARCHAR(5) NOT NULL, CONSTRAINT chkGravidade CHECK (gravidade IN('Alta', 'Média', 'Baixa')),
    fkLeitura INT UNIQUE NOT NULL,
		CONSTRAINT fkLeituraAlerta
			FOREIGN KEY (fkLeitura)
				REFERENCES Leitura(idLeitura)
    );
    
INSERT INTO Alerta (mensagem, tipo, gravidade, fkLeitura) VALUES
	('Temperatura acima do limite permitido', 'Temperatura', 'Alta', 2),
	('Umidade fora da faixa segura', 'Umidade', 'Média', 3),
	('Temperatura abaixo do ideal', 'Temperatura', 'Baixa', 5);
    

-- SELECTS
-- Mostrar a empresa, seus reservatórios e arduinos
SELECT e.razaoSocial as NomeEmpresa, r.*, a.idArduino as IdArduino, a.Situacao as 'Situação'
FROM Empresa e JOIN Reservatorio r ON fkEmpresa = idEmpresa
				JOIN Arduino a ON fkReservatorio = idReservatorio;

-- Leitura do alerta de determinada empresa
SELECT e.razaoSocial as NomeEmpresa, CONCAT(r.rua, ' ', r.cidade, ' - ', r.estado) as 'Endereço', r.idReservatorio as IdReservatorio, a.idArduino as IdArduino, CONCAT(l.temperatura, '°C') as Temperatura, CONCAT(l.umidade, '%') as Umidade, l.dataHora as Data,
 al.mensagem as Mensagem, al.tipo as TipoAlerta, al.gravidade as Gravidade
FROM Empresa e JOIN Reservatorio r ON fkEmpresa = idEmpresa
JOIN Arduino a ON fkReservatorio = idReservatorio
JOIN Leitura l ON fkArduino = idArduino
JOIN Alerta al ON fkLeitura = idLeitura
	WHERE idEmpresa = 1;