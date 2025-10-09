function analise() {
    const selectSensor = document.getElementById('selectSensor');
    const sensor = selectSensor.value;

    if (sensor === "") {
        alert('Escolha um sensor!');
        return;
    }

    var temperatura = [22, 24, 21, 25, 23];
    var umidade = [60, 58, 62, 65, 59];
    var alertas = [12, 19, 3, 5, 2, 3, 8, 8, 6, 5, 4, 7];

    if (sensor === '2') {
        temperatura = [22, 24, 21, 25, 23];
        umidade = [60, 58, 62, 65, 59];
        alertas = [12, 19, 3, 5, 2, 3, 8, 8, 6, 5, 4, 7]
    }

    var ctxTemperatura = document.getElementById('chartTemperatura');
    var ctxUmidade = document.getElementById('chartUmidade');
    var ctxAlertas = document.getElementById('chartAlertas');


    new Chart(ctxTemperatura, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Temperatura °C',
                data: temperatura,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    new Chart(ctxUmidade, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Umidade',
                data: umidade,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });


    new Chart(ctxAlertas, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
                label: 'Umidade',
                data: alertas,
                borderWidth: 1,
                borderRadius: 50
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}