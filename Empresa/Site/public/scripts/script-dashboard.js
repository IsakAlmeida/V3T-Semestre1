window.onload = () => {
    listarSensores();
};
var nome = sessionStorage.NOME_USUARIO;
nomeUsuario.innerHTML = nome;

var ctxTemperatura = document.getElementById('chartTemperatura');
var ctxUmidade = document.getElementById('chartUmidade');
var ctxAlertas = document.getElementById('chartAlertas');

var idEmpresa = sessionStorage.ID_EMPRESA;


var sensores = [];
function listarSensores() {
    fetch(`/medidas/buscarSensores/${idEmpresa}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                sensores = resposta;
                buscarDadosSensor();

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

var dadosSensor = [];
function buscarDadosSensor() {
    for (let i = 0; i < sensores.length; i++) {
        var idSensor = sensores[i].idSensor;
        console.log(idSensor)
        fetch(`/medidas/buscarDadosSensor/${idSensor}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    dadosSensor.push(resposta);
                    if (dadosSensor.length == sensores.length) {
                        plotarGrafico();
                    }
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }

}

function plotarGrafico() {
    var labels = [];
    var reservatorios = [];
    var reservatoriosParse = JSON.parse(sessionStorage.RESERVATORIOS);
    var cores = ["#004830", "#2E7D57", "#5BB98C"];

    for (let i = 0; i < sensores.length; i++) {
        reservatorios.push(reservatoriosParse[i].nome);
    }

    for (let i = 0; i < dadosSensor[0].length; i++) {
        var data = new Date(dadosSensor[0][i].dtHora);
        var hora = data.toLocaleTimeString("pt-BR", {hour: "2-digit", minute: "2-digit"}); // formata para HH:MM
        labels.push(hora);
    }


    var datasetsTemperatura = [];
    var datasetsUmidade = [];

    for (let i = 0; i < sensores.length; i++) {
        var tempSensor = [];
        var umidSensor = [];

        for (let index = 0; index < dadosSensor[i].length; index++) {
            tempSensor.push(dadosSensor[i][index].temperaturaCelsius);
            umidSensor.push(dadosSensor[i][index].umidadePorcentagem);
        }

        datasetsTemperatura.push({
            label: reservatorios[i],
            data: tempSensor,
            backgroundColor: cores[i],
            borderWidth: 0,
            borderRadius: 10,
        });

        datasetsUmidade.push({
            label: reservatorios[i],
            data: umidSensor,
            backgroundColor: cores[i],
            borderWidth: 0,
            borderRadius: 10,
        });
    }

    new Chart(ctxTemperatura, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasetsTemperatura
        }
    });

    new Chart(ctxUmidade, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasetsUmidade
        }
    });
}
