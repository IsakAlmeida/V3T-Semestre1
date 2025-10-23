
USE v3t;
SHOW TABLES;

    
-- Populando tabelas

INSERT INTO Endereco (Logradouro,Bairro,Cidade,UF, CEP, Numero) VALUES
('Av. Paulista','Consolação','São Paulo','SP','01310100','150B'),
('Av. das Nações', 'Centro', 'Curitiba', 'PR', '80010020', '452'),
('Av. Faria Lima', 'Pinheiros', 'São Paulo','SP','01451000','1001');

INSERT INTO Empresa (RazaoSocial, NomeEmpresa, CNPJ, Email, Telefone,Token, fkEndereco) VALUES 
('Tech Solutions LTDA', 'Tech Solutions', '12345678000199', 'contato@techsolutions.com.br', '1134567890','TE993456', 1),
('Green Future S.A.', 'Green Future', '98765432000155', 'contato@greenfuture.com.br', '4131234567','GR553123', 2),
('Food Solutions LTDA.', 'Food Solutions', '12345678111111', 'contato@foodsolutions.com', '1132547698','FO113254', 3);

INSERT INTO Usuario (NomeUsuario, Email, Senha, fkEmpresa) VALUES
('Reginaldo Oliveira','reginaldo.o@techsolutions.com.br','Regi@tech123',1),
('Matheus Fernandes','matheus.f@techsolutions.com.br','Math@tech123',1),
('Vitor Alcantara','valcantara@greenfuture.com.br','va@@3217',2),
('Vinicius Borges','vborges@greenfuture.com.br','vb@@3215',2),
('Fernanda Caramico','fe.caramico@foodsolutions.com','f3r@@789',3),
('Julia Araripe','ju.araripe@foodsolutions.com','jul@@456',3);

INSERT INTO Sensor (StatusSensor,dtInstalacao,Locall,fkEmpresa) VALUES
('Ativo','2025-09-10','Reservatório 1', 1),
('Ativo','2025-09-10','Reservatório 1', 2),
('Ativo','2025-09-11','Reservatório 1', 3),
('Ativo','2025-07-20','Reservatório 2', 3);


select * from Sensor;


