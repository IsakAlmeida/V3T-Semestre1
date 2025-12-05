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
        var hora = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }); // formata para HH:MM:SS
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
        type: 'bar',
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

        valorTemp.innerHTML = Number(novoDado[i].temperaturaCelsius).toFixed(1);
        valorUmid.innerHTML = novoDado[i].umidadePorcentagem;


        if (Number(novoDado[i].temperaturaCelsius) > 25 || Number(novoDado[i].temperaturaCelsius) < 15) {
            cardAlertaTemp.style.display = 'flex';
            StatusTemp.innerHTML = `Crítico`;
            if (i == 0) {
                reservatorioTemp.innerHTML = `Reservatório 1`;
            } else {
                reservatorioTemp.innerHTML = `Reservatório 2`;
            }
        } else {
            cardAlertaTemp.style.display = 'flex';
            StatusTemp.innerHTML = `Moderado`;
            if (i == 0) {
                reservatorioTemp.innerHTML = `Reservatório 1`;
            } else {
                reservatorioTemp.innerHTML = `Reservatório 2`;
            }
        }

        if (Number(novoDado[i].umidadePorcentagem) > 50 || Number(novoDado[i].umidadeCelsius) < 30) {
            cardAlertaUmid.style.display = 'flex';
            StatusUmid.innerHTML = `Crítico`;
            if (i == 0) {
                reservatorioUmid.innerHTML = `Reservatório 1`;
            } else {
                reservatorioUmid.innerHTML = `Reservatório 2`;
            }
        } else {
            cardAlertaUmid.style.display = 'flex';
            StatusUmid.innerHTML = `Moderado`;
             if (i == 0) {
                reservatorioUmid.innerHTML = `Reservatório 1`;
            } else {
                reservatorioUmid.innerHTML = `Reservatório 2`;
            }
        }
    }

    graficoTemperatura.update();
    graficoUmidade.update();

    setTimeout(buscarNovosDados, 10000);
}


