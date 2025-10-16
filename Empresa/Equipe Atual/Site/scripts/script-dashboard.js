function analise() {
    const selectSensor = document.getElementById('selectSensor');
    const sensor = selectSensor.value;

    if (sensor == "") {
        alert('Escolha um sensor!');
        return;
    }

    var temperatura = [22, 24, 21, 25, 23, 27, 26, 25, 24, 26, 25, 24]; // Aumentei o array para 12 pontos
    var umidade = [60, 58, 62, 65, 59, 63, 61, 64, 60, 62, 65, 61]; // Aumentei o array para 12 pontos
    var alertas = [12, 19, 3, 5, 2, 3, 8, 8, 6, 5, 4, 7];

    if (sensor === '2') {
        temperatura = [21, 23, 20, 24, 22, 26, 25, 24, 23, 25, 24, 23];
        umidade = [55, 53, 57, 60, 54, 58, 56, 59, 55, 57, 60, 56];
        alertas = [10, 15, 5, 8, 1, 6, 9, 7, 5, 4, 3, 6]
    }

    var ctxTemperatura = document.getElementById('chartTemperatura');
    var ctxUmidade = document.getElementById('chartUmidade');
    var ctxAlertas = document.getElementById('chartAlertas');


    // GRÁFICO DE TEMPERATURA
    new Chart(ctxTemperatura, {
        type: 'line',
        data: {
            labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            datasets: [{
                label: '',
                data: temperatura,
                borderWidth: 2,
                borderColor: '#004830',
                backgroundColor: '#ffffffff',
                pointRadius: 5,
                pointBorderWidth: 2,
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
                // *** ANOTAÇÕES DE RANGE PARA TEMPERATURA ***
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
                            yMin: 28,
                            yMax: 28,
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
                    grid: {
                        display: false
                    }
                },
            }
        },
    });

    // GRÁFICO DE UMIDADE
    new Chart(ctxUmidade, {
        type: 'line',
        data: {
            labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            datasets: [{
                label: '',
                data: umidade,
                borderWidth: 2,
                borderColor: '#004830',
                backgroundColor: '#ffffffff',
                pointRadius: 5,
                pointBorderWidth: 2,
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
                // *** ANOTAÇÕES DE RANGE PARA UMIDADE (POSIÇÃO CORRIGIDA) ***
                annotation: {
                    annotations: {
                        alertaMin: {
                            type: 'line',
                            yMin: 50,
                            yMax: 50,
                            borderColor: 'rgba(208, 94, 24, 1)',
                            borderWidth: 2,
                        },
                        alertaMax: {
                            type: 'line',
                            yMin: 70,
                            yMax: 70,
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
                    max: 100, // Garante que o range (50 a 70) seja visível
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // GRÁFICO DE ALERTAS
    new Chart(ctxAlertas, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: '',
                data: alertas,
                backgroundColor: '#449b7eff',
                borderWidth: 1,
                borderRadius: 100
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
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}