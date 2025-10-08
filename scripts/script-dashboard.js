const ctxTemperatura = document.getElementById('chartTemperatura');

new Chart(ctxTemperatura, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Temperatura °C',
            data: [12, 19, 3, 5, 2, 3],
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

const ctxUmidade = document.getElementById('chartUmidade');

new Chart(ctxUmidade, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Umidade',
            data: [12, 19, 3, 5, 2, 3],
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

const ctxAlertas = document.getElementById('chartAlertas');

new Chart(ctxAlertas, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Umidade',
            data: [12, 19, 3, 5, 2, 3, 8, 8, 6, 5, 4, 7],
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