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
function listarSensores(){
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
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
    }

    plotarGrafico();
}

function plotarGrafico() {
    var temperaturas = [];
    var umidades = [];
    var horas = [];
    for (let i = 0; i < dadosSensor.length; i++) {
        temperaturas.push(dadosSensor[i].temperaturaCelsius);
        umidades.push(dadosSensor[i].umidadePorcentagem);
        horas.push(dadosSensor[i].dtHora);
    }
    console.log(temperaturas);
    console.log(umidades);
    console.log(horas);


    new Chart(ctxTemperatura, {
        type: 'bar',
        data: {
            labels: horas,
            datasets: [{
                label: '',
                data: temperaturas,
                backgroundColor: '#004830',
                pointRadius: 5,
                pointBorderWidth: 2,
                borderRadius: 100,
                tension: 0.4
            }],
        },
        options: {
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 0
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 40,
                    grid: {
                        display: false
                    }
                },
            }
        },
    });

    // GRÁFICO DE UMIDADE
    new Chart(ctxUmidade, {
        type: 'bar',
        data: {
            labels: horas,
            datasets: [{
                label: '',
                data: umidades,
                backgroundColor: '#004830',
                pointRadius: 5,
                pointBorderWidth: 2,
                borderRadius: 100,
                tension: 0.4
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'top',
                    align: 'start',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 0
                    }
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}
