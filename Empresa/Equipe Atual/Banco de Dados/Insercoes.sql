USE v3t;
SHOW TABLES;


-- Corrigindo constraint chkFuncao/tabela Usuario
ALTER TABLE Usuario DROP CONSTRAINT chkFuncao;
ALTER TABLE Usuario MODIFY COLUMN FUncao VARCHAR(45), 
	ADD CONSTRAINT chkFuncao CHECK(funcao IN('Administrador', 'Funcionário'));
    
-- Populando tabelas

INSERT INTO Endereco (Rua,Bairro,Cidade,UF, CEP, Numero) VALUES
('Av. Paulista','Consolação','São Paulo','SP','01310100','150B'),
('Avenida das Nações', 'Centro', 'Curitiba', 'PR', '80010020', '452');

INSERT INTO Empresa (RazaoSocial, NomeEmpresa, CNPJ, Email, Telefone, fkEndereco) VALUES 
('Tech Solutions LTDA', 'Tech Solutions', '12345678000199', 'contato@techsolutions.com.br', '11 34567890', 1),
('Green Future S.A.', 'Green Future', '98765432000155', 'contato@greenfuture.com.br', '41 31234567', 2);

INSERT INTO Usuario (NomeUsuario, Email, Senha, Funcao, fkEmpresa) VALUES
('Reginaldo Oliveira','reginaldo.o@techsolutions.com.br','Regi@tech123','Administrador',1),
('Matheus Fernandes','matheus.f@techsolutions.com.br','Math@tech123','Funcionário',1),
('Vitor Alcantara','valcantara@greenfuture.com.br','va@@321','Administrador',2),
('Vinicius Borges','vborges@greenfuture.com.br','vb@@321','Funcionário',2);

INSERT INTO Sensor (StatusSensor,dtInstalacao,Locall,fkEmpresa) VALUES
('Ativo','2025-09-10','Reservatório 1', 1),
('Ativo','2025-09-11','Reservatório 2', 1),
('Ativo','2025-07-20','Reservatório 1', 2);



