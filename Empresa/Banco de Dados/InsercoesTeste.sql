USE v3t;
SHOW TABLES;

-- Populando tabelas

SELECT * FROM HistoricoAlerta;

Insert into HistoricoAlerta (fkCaptura, fkLimite) VALUES(
(select idCaptura from Captura order by dthora DESC LIMIT 1),2
);



INSERT INTO nivelAcesso VALUES 
(default,'Administrador','Tem o papel de administrar configurações de usuário'),
(default,'Visualizador','Tem permissão para visualizar dashboard'),
(default,'Suporte','Presta atendimento de dúvidas e problemas');

INSERT INTO Empresa (razaoSocial, nomeEmpresa, CNPJ) VALUES 
('Tech Solutions LTDA', 'Tech Solutions', '12345678000199'),
('Green Future S.A.', 'Green Future', '98765432000155'),
('Food Solutions LTDA.', 'Food Solutions', '12345678111111');

INSERT INTO Token VALUES
(default,'12345678',null,null,'Ativo',1);

INSERT INTO Endereco (logradouro,bairro,cidade,uf, cep, numero, complemento, fkEmpresa) VALUES
('Av. Paulista','Consolação','São Paulo','SP','01310100','150B', null, 1),
('Av. das Nações', 'Centro', 'Curitiba', 'PR', '80010020', '452', null, 2),
('Av. Faria Lima', 'Pinheiros', 'São Paulo','SP','01451000','1001', 'Terceiro andar', 3);

INSERT INTO Contato (email, telefone, responsavel, fkEmpresa) VALUES
('andrecomercial@techsolutions.com', '1134567890', 'André Mendes', 1),
('ester.silva@greenfuture.com', '4131234567', 'Ester Silva', 2),
('luiz.gomes@foodsolutions.com', '1132547698', 'Luiz Gomes', 3);


INSERT INTO Usuario (nomeUsuario, email, senha, fkEmpresa, fkNivelAcesso) VALUES
('Reginaldo Oliveira','reginaldo.o@techsolutions.com.br','Regi@tech123', 1, 1),
('Matheus Fernandes','matheus.f@techsolutions.com.br','Math@tech123',1, 2),
('Vitor Alcantara','valcantara@greenfuture.com.br','va@@3217',2, 1),
('Vinicius Borges','vborges@greenfuture.com.br','vb@@3215', 2, 2),
('Fernanda Caramico','fe.caramico@foodsolutions.com','f3r@@789',3, 1),
('Julia Araripe','ju.araripe@foodsolutions.com','jul@@456',3, 2);

INSERT INTO Reservatorio (nome, locall, fkEmpresa) VALUES
('Sala A2', 'Segundo andar', 1),
('Sala 1', 'Sala 1', 2),
('Sala 3', 'Primeiro andar', 3),
('Sala 2', 'Primeiro andar', 3);

INSERT INTO Limite (tempMaxCelsius, tempMinCelsius, umidadeMaxPorcentagem, umidadeMinPorcentagem) VALUES
(25, 15, 50, 30),
(24,16, 49,31);


desc Status;


INSERT INTO Status (tipo, fkLimite) VALUES
('Crítico', 2),
('Moderado', 1);

INSERT INTO Sensor (statusSensor, dtInstalacao, fkReservatorio) VALUES
('Ativo','2025-09-10', 1),
('Ativo','2025-09-10', 2),
('Ativo','2025-09-11',3);





