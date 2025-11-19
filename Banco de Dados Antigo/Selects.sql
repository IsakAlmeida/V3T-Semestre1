USE v3t;
SHOW TABLES;

-- 1º SELECT: (VISÃO MACRO SENSORES DE UMA EMPRESA) EXIBE OS DADOS DE TEMPERATURA E UMIDADE DE UMA DETERMINADA EMPRESA, E RETORNA EM ORDEM DA LEITURA MAIS RECENTE SE ESTA DENTRO OU FORA DO LIMITE DEVIDO


-- Histórico de Alertas 
SELECT 
	s.idSensor,
    c.temperaturaCelsius,
	CASE 
		WHEN c.temperaturaCelsius > 25 THEN CONCAT('Acima do Limite! ',c.temperaturaCelsius,'°C')
		WHEN c.temperaturaCelsius < 15 THEN CONCAT('Abaixo do Limite! ',c.temperaturaCelsius,'°C')
		ELSE CONCAT('Ideal ',c.temperaturaCelsius,'°C')
	END AS statusTemperatura,
    c.umidadePorcentagem,
	CASE
		WHEN c.umidadePorcentagem > 60 THEN CONCAT('Acima do Limte! ',c.umidadePorcentagem,'%')
        WHEN c.umidadePorcentagem < 50 THEN CONCAT('Abaixo do Limte! ',c.umidadePorcentagem,'%')
        ELSE CONCAT('Ideal ', c.umidadePorcentagem,'%')
	END as statusUmidade,
	c.dtHora,
    r.locall,
    e.NomeEmpresa 
FROM Captura as c
		RIGHT JOIN Sensor as s ON c.fkSensor = s.idSensor
        RIGHT JOIN Reservatorio AS r ON s.fkReservatorio = r.idReservatorio
		RIGHT JOIN Empresa as e ON r.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = 3 AND r.idReservatorio = 2
	ORDER BY c.dtHora DESC;

-- KPI Umidade e Status do Sensor
    SELECT 
	s.idSensor as 'ID Sensor:',
    c.umidadePorcentagem AS 'Umidade (%)',
	CASE
		WHEN c.umidadePorcentagem > 60 THEN CONCAT('Acima do Limte! ',c.umidadePorcentagem,'%')
        WHEN c.umidadePorcentagem < 50 THEN CONCAT('Abaixo do Limte! ',c.umidadePorcentagem,'%')
        ELSE CONCAT('Ideal ', c.umidadePorcentagem,'%')
	END as 'Status Umidade (%):'
    FROM Captura as c
		RIGHT JOIN Sensor as s ON c.fkSensor = s.idSensor
        RIGHT JOIN Reservatorio AS r ON s.fkReservatorio = r.idReservatorio
		RIGHT JOIN Empresa as e ON r.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = 3
	ORDER BY c.dtHora DESC;
    
-- KPI Temperatura e Status do Sensor 
    SELECT 
	s.idSensor as 'ID Sensor:',
    c.temperaturaCelsius AS 'Temperatura (°C)',
	CASE 
		WHEN c.temperaturaCelsius > 25 THEN CONCAT('Acima do Limite! ',c.temperaturaCelsius,'°C')
		WHEN c.temperaturaCelsius < 15 THEN CONCAT('Abaixo do Limite! ',c.temperaturaCelsius,'°C')
		ELSE CONCAT('Ideal ',c.temperaturaCelsius,'°C')
	END as 'Status Temperatura (°C):'
    FROM Captura as c
		RIGHT JOIN Sensor as s ON c.fkSensor = s.idSensor
        RIGHT JOIN Reservatorio AS r ON s.fkReservatorio = r.idReservatorio
		RIGHT JOIN Empresa as e ON r.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = 3
	ORDER BY c.dtHora DESC;
    
    
-- KPI Temperatura e Umidade do Sensor
SELECT
s.idSensor as 'ID Sensor:',
    c.temperaturaCelsius AS 'Temperatura (°C)',
    c.umidadePorcentagem AS 'Umidade (%)'
FROM Captura as c
		RIGHT JOIN Sensor as s ON c.fkSensor = s.idSensor
        RIGHT JOIN Reservatorio AS r ON s.fkReservatorio = r.idReservatorio
		RIGHT JOIN Empresa as e ON r.fkEmpresa = e.idEmpresa
        WHERE e.idEmpresa = 3 AND r.idReservatorio = 3
	ORDER BY c.dtHora DESC;
    
    SELECT 
		idEmpresa,
        nomeEmpresa 
	FROM Empresa;
    
    SELECT * FROM Reservatorio 
    JOIN Empresa ON fkEmpresa = idEmpresa
    ORDER BY NomeEmpresa;
    
    SELECT * FROM Reservatorio 
    JOIN Empresa ON fkEmpresa = idEmpresa
    WHERE idEmpresa = 3;

-- 2º SELECT: (VISÃO ESPECIFICA DE UM ÚNICO SENSOR E UMA ÚNICA EMPRESA ) EXIBE OS DADOS DE TEMPERATURA E UMIDADE, E RETORNA EM ORDEM DA LEITURA MAIS RECENTE SE ESTA DENTRO OU FORA DO LIMITE DEVIDO 

SELECT 
s.idSensor as 'ID Sensor:',
	CASE 
		WHEN r.Temperatura > 25 THEN CONCAT('Acima do Limite! ',r.Temperatura,'°C')
		WHEN r.Temperatura < 15 THEN CONCAT('Abaixo do Limite! ',r.Temperatura,'°C')
		ELSE CONCAT('Ideal ',r.Temperatura,'°C')
	END as 'Status Temperatura (°C):',
	CASE
		WHEN r.Umidade > 50 THEN CONCAT('Acima do Limte! ',r.Umidade,'%')
        WHEN r.Umidade < 30 THEN CONCAT('Abaixo do Limte! ',r.Umidade,'%')
        ELSE CONCAT('Ideal ', r.Umidade,'%')
	END as 'Status Umidade (%):',
	r.dtHora as 'Hora da Leitura:',
    s.locall as 'Localização Sensor:',
    e.NomeEmpresa as 'Empresa:'
FROM Registro as r
		JOIN Sensor as s ON r.fkSensor = s.idSensor
		JOIN Empresa as e ON s.fkEmpresa = e.idEmpresa
WHERE e.idEmpresa = 3 AND s.idSensor = 3
	ORDER BY r.dtHora ASC;
    

-- 3º SELECT: EXIBE UMA VISÃO MACRO DE TODAS OS USUÁRIOS CADASTRADOS E SUAS RESPECTIVAS EMPRESAS, PODENDO NICHAR E CRIAR UMA PESQUISA ESPECIFICA POR EMPRESA(BASTA TIRAR OS COMENTÁRIOS DO WHERE)

SELECT 
	u.NomeUsuario as 'Nome Usuário:',
	u.Email as 'Email Usuário:',
    e.NomeEmpresa as 'Empresa:',
    e.Email as 'Email Empresa:',
	CONCAT(ende.Cidade,'-',ende.UF) as 'Sede:'
FROM Usuario as u
		JOIN Empresa as e ON e.idEmpresa = u.fkEmpresa
        JOIN Endereco as ende ON e.fkEndereco = ende.idEndereco
-- WHERE e.idEmpresa = 1
    ORDER BY ende.UF DESC;
    
-- 4º SELECT: EXIBE UMA VISÃO MACRO DE TODAS AS EMPRESAS CADASTRADAS E SEUS DADOS PARA CONTATO OU EXIBE VERSÃO DADOS DE CONTATO DE EMPRESAS POR UMA DETERMINADA UF

SELECT 
	e.RazaoSocial as 'Razão Social:',
    e.CNPJ as 'CNPJ:',
    e.Email as'Email:',
    e.Telefone as 'Tel: ',
    e.Token as 'Código de Acesso:',
    CONCAT(ende.Logradouro,', ',ende.Numero,' CEP: ',ende.CEP,' | ',ende.Cidade,'-',ende.UF ) as 'Endereço:'
FROM Empresa as e
	JOIN Endereco as ende ON e.fkEndereco = ende.idEndereco
-- WHERE ende.UF = 'SP'
-- ORDER BY ende.UF;           