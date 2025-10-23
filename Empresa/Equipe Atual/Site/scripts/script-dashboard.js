var temperatura = [22, 24, 21, 25, 23, 22, 26, 20];
var umidade = [30, 28, 35, 40, 46, 53, 45, 32];


var ctxTemperatura = document.getElementById('chartTemperatura');
var ctxUmidade = document.getElementById('chartUmidade');
var ctxAlertas = document.getElementById('chartAlertas');


// GRÁFICO DE TEMPERATURA
new Chart(ctxTemperatura, {
    type: 'bar',
    data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'],
        datasets: [{
            label: '',
            data: temperatura,
            backgroundColor: '#004830',
            pointRadius: 5,
            pointBorderWidth: 2,
            tension: 0.4
        }, {
            label: '',
            data: temperatura,
            backgroundColor: '#66A07A',
            pointRadius: 5,
            pointBorderWidth: 2,
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
    type: 'bar',
    data: {
        labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'],
        datasets: [{
            label: '',
            data: umidade,
            backgroundColor: '#004830',
            pointRadius: 5,
            pointBorderWidth: 2,
            tension: 0.4
        }, {
            label: '',
            data: umidade,
            backgroundColor: '#66A07A',
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

