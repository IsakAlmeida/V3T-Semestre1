USE v3t;
SHOW TABLES;

    
-- Populando tabelas

INSERT INTO Endereco (Logradouro,Bairro,Cidade,UF, CEP, Numero) VALUES
('Av. Paulista','Consolação','São Paulo','SP','01310100','150B'),
('Av. das Nações', 'Centro', 'Curitiba', 'PR', '80010020', '452');

INSERT INTO Empresa (RazaoSocial, NomeEmpresa, CNPJ, Email, Telefone, fkEndereco) VALUES 
('Tech Solutions LTDA', 'Tech Solutions', '12345678000199', 'contato@techsolutions.com.br', '1134567890', 1),
('Green Future S.A.', 'Green Future', '98765432000155', 'contato@greenfuture.com.br', '4131234567', 2);

INSERT INTO Usuario (NomeUsuario, Email, Senha, fkEmpresa) VALUES
('Reginaldo Oliveira','reginaldo.o@techsolutions.com.br','Regi@tech123',1),
('Matheus Fernandes','matheus.f@techsolutions.com.br','Math@tech123',1),
('Vitor Alcantara','valcantara@greenfuture.com.br','va@@321',2),
('Vinicius Borges','vborges@greenfuture.com.br','vb@@321',2);

INSERT INTO Sensor (StatusSensor,dtInstalacao,Locall,fkEmpresa) VALUES
('Ativo','2025-09-10','Reservatório 1', 1),
('Ativo','2025-09-11','Reservatório 2', 1),
('Ativo','2025-07-20','Reservatório 1', 2);





