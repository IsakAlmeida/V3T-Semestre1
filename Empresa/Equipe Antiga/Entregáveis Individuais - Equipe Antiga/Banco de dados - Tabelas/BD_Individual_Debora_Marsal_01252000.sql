-- Tabela 1 - Empresas
CREATE TABLE empresas (
    id_empresa INT PRIMARY KEY AUTO_INCREMENT ,
    nome_empresa VARCHAR(255) NOT NULL,
    cnpj_empresa VARCHAR(18) UNIQUE,
    email_empresa VARCHAR(255),
    telefone_empresa VARCHAR(20));
    
-- Tabela 2 - Usuários (das empresas)
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(255) NOT NULL,
    email_usuario VARCHAR(255) UNIQUE,
    senha_usuario VARCHAR(255) NOT NULL,
    empresa_usuario INT NOT NULL,
	permissao_usuario VARCHAR(20) NOT NULL,
    CHECK (tipo_permissao IN ('Administrador', 'Editor', 'Leitor')));
    
-- Tabela 3 - Proteinas
CREATE TABLE proteinas (
    id_proteina INT PRIMARY KEY AUTO_INCREMENT,
    nome_proteina VARCHAR(100) NOT NULL,
    temp_min_proteina DECIMAL(5,2),
    temp_max_proteina DECIMAL(5,2),
    umid_min_proteina DECIMAL(5,2),
    umid_max_proteina DECIMAL(5,2)
);

-- Tabela 4 - Processo
CREATE TABLE processo (
    id_processo INT PRIMARY KEY AUTO_INCREMENT,
    nome_processo VARCHAR(100) NOT NULL,
    id_proteina INT,
    dt_registro DATETIME,
    temp_extracao DECIMAL(5,2),
    umid_extracao DECIMAL(5,2)
);
