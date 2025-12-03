window.onload = () => {
    buscarSensor();
};

var nome = sessionStorage.NOME_USUARIO;
nomeUsuario.innerHTML = nome;

var reservatorio = JSON.parse(sessionStorage.RESERVATORIOPESQUISADO);
var reservatorioId = reservatorio.idReservatorio;
nomeReservatorio.innerHTML = reservatorio.nome;


var ctxTemperatura = document.getElementById('chartTemperatura');
var ctxUmidade = document.getElementById('chartUmidade');
var ctxAlertas = document.getElementById('chartAlertas');

var idSensor;

function buscarSensor() {
    fetch(`/reservatorio/buscarSensor/${reservatorioId}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                idSensor = Number(resposta[0].idSensor);
                if (idSensor > 0) {
                    buscarDadosSensor();
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

var dados = [];
function buscarDadosSensor() {
    fetch(`/medidas/buscarDadosSensor/${idSensor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                dados = resposta.reverse();
                plotarGrafico();
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


var labels = [];
var datasetsTemperatura = [];
var datasetsUmidade = [];

var graficoTemperatura;
var graficoUmidade;

function plotarGrafico() {

    for (let i = 0; i < dados.length; i++) {
        var data = new Date(dados[i].dtHora);
        var hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); // formata para HH:MM:SS
        labels.push(hora);
    }

    var tempSensor = [];
    var umidSensor = [];

    for (let i = 0; i < dados.length; i++) {
        tempSensor.push(dados[i].temperaturaCelsius);
        umidSensor.push(dados[i].umidadePorcentagem);
    }

    datasetsTemperatura.push({
        label: reservatorio.nome,
        data: tempSensor,
        backgroundColor: "#004830",
        borderWidth: 2,
        borderColor: "#004830",
        borderRadius: 10,
    });

    datasetsUmidade.push({
        label: reservatorio.nome,
        data: umidSensor,
        backgroundColor: "#004830",
        borderWidth: 2,
        borderColor: "#004830",
        borderRadius: 10,
    });

    graficoTemperatura = new Chart(ctxTemperatura, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasetsTemperatura
        },
        options: {
            plugins: {
                // ANOTAÇÕES DE RANGE PARA TEMPERATURA
                annotation: {
                    annotations: {
                        tempAlertaMin: {
                            type: 'line',
                            yMin: 15,
                            yMax: 15,
                            borderColor: 'rgba(208, 94, 24, 1)',
                            borderWidth: 2,
                        },
                        tempAlertaMax: {
                            type: 'line',
                            yMin: 25,
                            yMax: 25,
                            borderColor: 'rgba(208, 94, 24, 1)',
                            borderWidth: 2,
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    min: 0, // Garante que a escala comece em 0
                    max: 40, // Garante que o range (15 a 28) seja visível
                    max: 40, // Garante que o range (15 a 25) seja visível
                    grid: {
                        display: false
                    }
                },
            }
        },
    });

    graficoUmidade = new Chart(ctxUmidade, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasetsUmidade
        },
        options: {
            plugins: {
                // ANOTAÇÕES DE RANGE PARA UMIDADE
                annotation: {
                    annotations: {
                        tempAlertaMin: {
                            type: 'line',
                            yMin: 30,
                            yMax: 30,
                            borderColor: 'rgba(208, 94, 24, 1)',
                            borderWidth: 2,
                        },
                        tempAlertaMax: {
                            type: 'line',
                            yMin: 50,
                            yMax: 50,
                            borderColor: 'rgba(208, 94, 24, 1)',
                            borderWidth: 2,
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    min: 0, // Garante que a escala comece em 0
                    max: 80, // Garante que o range (30 a 50) seja visível
                    max: 80, // Garante que o range (30 a 50) seja visível
                    grid: {
                        display: false
                    }
                },
            }
        },
    });

    buscarNovosDados();
}

var novoDado = [];

function buscarNovosDados() {
    novoDado = [];

    fetch(`/medidas/tempo-real-sensor/${idSensor}`, { cache: 'no-store' })
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {
                    novoDado.push(novoRegistro[0]);
                    if (novoDado.length > 0) {
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


function atualizarDadosGraficos() {

    labels.shift();
    var data = new Date(novoDado[0].dtHora);
    var hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    labels.push(hora);

    datasetsTemperatura[0].data.shift();
    datasetsTemperatura[0].data.push(novoDado[0].temperaturaCelsius);

    datasetsUmidade[0].data.shift();
    datasetsUmidade[0].data.push(novoDado[0].umidadePorcentagem);

    graficoTemperatura.update();
    graficoUmidade.update();

    setTimeout(buscarNovosDados, 30000);
}