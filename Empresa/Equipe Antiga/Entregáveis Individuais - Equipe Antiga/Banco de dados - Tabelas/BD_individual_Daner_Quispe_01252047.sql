use sprint1;
create database Projeto;

create table Cadastro(
id int primary key auto_increment,
Nome varchar (50) not null,
Email varchar (60) unique,
constraint chkEmail check (Email like '%@%'),
Telefone varchar(15),
CPF char (14),
dtNascimento date,
Sexo char (1),
constraint chksexo check (Sexo in ('m','f', 'n')),
Cargo varchar (20),
constraint chkcargo check (Cargo in ('Administrador', 'Usuário')) );
desc cadastro;

insert into cadastro values
	(default, 'Maria', 'mariasilva@gmail.com', '11 99978-8990', '980.988.789-11', '2001-07-10', 'F', 'Administrador');
select * from cadastro; 
insert into cadastro values
	(default, 'Juliano', 'julianomadeira@gmail.com', '11 98089-0098', '121.111.231-99','2002-12-25', 'N', 'Usuário');
    

----------------------------------------------------------------------

create table Arduino (
idRegistro int primary key auto_increment,
Produto varchar(50),
dtFabricação date,
Umidade varchar(10),
Temperatura decimal (5,2),
Estado varchar (30),
constraint chkestado check(estado in('Ideal', 'Não Ideal')) );



----------------------------------------------------------------------

create table Financeiro (
idProduto int primary key auto_increment,
nomeProduto varchar (50),
valorBruto int,
Receita int,
Lucro int );

-----------------------------------------
