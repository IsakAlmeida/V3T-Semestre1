window.onload = () => {
    listarSensores();
};
var nome = sessionStorage.NOME_USUARIO;
nomeUsuario.innerHTML = nome;

var ctxTemperatura = document.getElementById('chartTemperatura');
var ctxUmidade = document.getElementById('chartUmidade');
var ctxAlertas = document.getElementById('chartAlertas');

var idEmpresa = sessionStorage.ID_EMPRESA;
var idReservatorio = sessionStorage.RESERVATORIOS.idReservatorio

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
                    dadosSensor.push(resposta.reverse());
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

var labels = [];
var reservatorios = [];
var reservatoriosParse = JSON.parse(sessionStorage.RESERVATORIOS);
var cores = ["#004830", "#2E7D57", "#5BB98C"];

var datasetsTemperatura = [];
var datasetsUmidade = [];

var graficoTemperatura;
var graficoUmidade;

function plotarGrafico() {
    for (let i = 0; i < sensores.length; i++) {
        reservatorios.push(reservatoriosParse[i].nome);
    }

    for (let i = 0; i < dadosSensor[0].length; i++) {
        var data = new Date(dadosSensor[0][i].dtHora);
        var hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); // formata para HH:MM
        labels.push(hora);
    }


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

    graficoTemperatura = new Chart(ctxTemperatura, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasetsTemperatura
        }
    });

    graficoUmidade = new Chart(ctxUmidade, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasetsUmidade
        }
    });

    atualizarGraficos();
}

var novoDado = [];

function atualizarGraficos() {
    novoDado = [];
    var cont = 0;

    for (let i = 0; i < sensores.length; i++) {
        var idSensor = sensores[i].idSensor;

        fetch(`/medidas/tempo-real-sensor/${idSensor}`, { cache: 'no-store' })
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (novoRegistro) {
                        novoDado[i] = novoRegistro[0];
                        cont++;
                        if (cont == sensores.length) {
                            atualizarDadosGraficos();
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

function atualizarDadosGraficos() {

    labels.shift();
    var data = new Date(novoDado[0].dtHora);
    var hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    labels.push(hora);

    for (let i = 0; i < sensores.length; i++) {

        datasetsTemperatura[i].data.shift();
        datasetsTemperatura[i].data.push(novoDado[i].temperaturaCelsius);

        datasetsUmidade[i].data.shift();
        datasetsUmidade[i].data.push(novoDado[i].umidadePorcentagem);
    }

    graficoTemperatura.update();
    graficoUmidade.update();

    setTimeout(atualizarGraficos, 30000);
}


