// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    valoresTemperatura,
    valoresUmidade,
    valoresHora,
) => {

    // conexão com o banco de dados MySQL
    let poolBancoDados = mysql.createPool(
        {
            host: '127.0.0.1',
            user: 'arduino',
            password: 'V3T@123projeto',
            database: 'v3t',    
            port: 3307
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const Temperatura = parseFloat(valores[0]);
        const Umidade = parseInt(valores[1]);
        const hora = pegarData().toString();

        // armazena os valores dos sensores nos arrays correspondentes
        valoresTemperatura.push(Temperatura);
        valoresUmidade.push(Umidade);
        valoresHora.push(hora);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {
        
            // este insert irá inserir os dados na tabela "Registro", assim como simulações de situações de alerta
            await poolBancoDados.execute(
                'INSERT INTO Registro (Temperatura,Umidade, dtHora, fkSensor) VALUES (?, ?, ?, 1)',
                [Temperatura, Umidade, hora]
            );
            await poolBancoDados.execute(
                'INSERT INTO Registro (Temperatura,Umidade, dtHora, fkSensor) VALUES (?, ?, ?, 2)',
                [Temperatura+10, Umidade+20, hora]
            );
            await poolBancoDados.execute(
                'INSERT INTO Registro (Temperatura,Umidade, dtHora, fkSensor) VALUES (?, ?, ?, 3)',
                [Temperatura-25, Umidade-30, hora]
            );
            await poolBancoDados.execute(
                'INSERT INTO Registro (Temperatura,Umidade, dtHora, fkSensor) VALUES (?, ?, ?, 4)',
                [Temperatura-10, Umidade-15, hora]
            );
        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresTemperatura,
    valoresUmidade,
    valoresHora
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/temperatura', (_, response) => {
        return response.json(valoresTemperatura);
    });
    app.get('/sensores/umidade', (_, response) => {
        return response.json(valoresUmidade);
    });
    app.get('/sensores/hora', (_, response) => {
        return response.json(valoresHora);
    });
}

// função para pegar a data e hora do computador onde está a API
function pegarData(){
       
        var dataAtual = new Date;
        dataAtual = dataAtual.toString().split(' ');
        var ano = dataAtual[3];
        var dia = dataAtual[2];
        let hora = dataAtual[4];
        if(dataAtual[1]=='Jan'){var mes = '01';}
        else if(dataAtual[1]=='Feb'){var mes = '02';}
        else if(dataAtual[1]=='Mar'){var mes = '03';}
        else if(dataAtual[1]=='Apr'){var mes = '04';}
        else if(dataAtual[1]=='May'){var mes = '05';}
        else if(dataAtual[1]=='Jun'){var mes = '06';}
        else if(dataAtual[1]=='Jul'){var mes = '07';}
        else if(dataAtual[1]=='Aug'){var mes = '08';}
        else if(dataAtual[1]=='Sep'){var mes = '09';}
        else if(dataAtual[1]=='Oct'){var mes = '10';}
        else if(dataAtual[1]=='Nov'){var mes = '11';}
        else{var mes = '12';}

        var dataCompleta = `${ano}-${mes}-${dia} ${hora}`;
         return dataCompleta;
    }

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresTemperatura = [];
    const valoresUmidade = [];
    const valoresHora = [];

    // inicia a comunicação serial
    await serial(
        valoresTemperatura,
        valoresUmidade,
        valoresHora
    );

    // inicia o servidor web
    servidor(
        valoresTemperatura,
        valoresUmidade,
        valoresHora
    );

})();