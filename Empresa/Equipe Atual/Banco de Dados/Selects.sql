USE v3t;
SHOW TABLES;

-- 1º SELECT: (VISÃO MACRO SENSORES DE UMA EMPRESA) EXIBE OS DADOS DE TEMPERATURA E UMIDADE DE UMA DETERMINADA EMPRESA, E RETORNA EM ORDEM DA LEITURA MAIS RECENTE SE ESTA DENTRO OU FORA DO LIMITE DEVIDO
SELECT 
	s.idSensor as 'ID Sensor:',
	CASE 
		WHEN r.Temperatura > 25 THEN CONCAT('Acima do Limite! ',r.Temperatura,'°C')
		WHEN r.Temperatura < 15 THEN CONCAT('Abaixo do Limite! ',r.Temperatura,'°C')
		ELSE CONCAT('Ideal ',r.Temperatura,'°C')
	END as 'Status Temperatura (°C):',
	CASE
		WHEN r.Umidade > 60 THEN CONCAT('Acima do Limte! ',r.Umidade,'%')
        WHEN r.Umidade < 50 THEN CONCAT('Abaixo do Limte! ',r.Umidade,'%')
        ELSE CONCAT('Ideal ', r.Umidade,'%')
	END as 'Status Umidade (%):',
	r.dtHora as 'Hora da Leitura:',
    s.locall as 'Localização Sensor:',
    e.NomeEmpresa as 'Empresa:'
FROM Registro as r
		RIGHT JOIN Sensor as s ON r.fkSensor = s.idSensor
		RIGHT JOIN Empresa as e ON s.fkEmpresa = e.idEmpresa
WHERE e.idEmpresa = 1
	ORDER BY r.dtHora ASC;

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