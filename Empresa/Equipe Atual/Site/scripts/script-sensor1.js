var temperatura = [22, 24, 21, 25, 23, 22, 26, 20]; 
var umidade = [30, 28, 35, 40, 46, 53, 45, 32]; 
var alertas = [12, 19, 3, 5, 2, 3, 8, 6, 8, 0,];

var ctxTemperatura = document.getElementById('chartTemperatura');
var ctxUmidade = document.getElementById('chartUmidade');
var ctxAlertas = document.getElementById('chartAlertas');


// GRÁFICO DE TEMPERATURA
new Chart(ctxTemperatura, {
    type: 'line',
    data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'],
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
                max: 40, // Garante que o range (15 a 25) seja visível
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
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'],
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
                        yMin: 30,
                        yMax: 30,
                        borderColor: 'rgba(208, 94, 24, 1)',
                        borderWidth: 2,
                    },
                    alertaMax: {
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
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
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
