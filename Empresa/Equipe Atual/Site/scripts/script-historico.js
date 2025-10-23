

function carregarHistorico(){
    let sensor = selectSensor.value;
    if(sensor == 1){
        div_historico.innerHTML = `<ul class="cabecalho-historico">
            <li>ID:</li>
            <li>Local:</li>
            <li>Temperatura (°C):</li>
            <li>Umidade (%):</li>
            <li>Data:</li>
        </ul>
        <ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>35ºC</li>
            <li>46%</li>
            <li>11:50AM 15/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>35ºC</li>
            <li>46%</li>
            <li>02:50AM 15/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>33ºC</li>
            <li>45%</li>
            <li>09:50AM 10/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>32ºC</li>
            <li>47%</li>
            <li>12:50AM 08/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>28ºC</li>
            <li>55%</li>
            <li>08:50PM 05/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>26ºC</li>
            <li>44%</li>
            <li>05:25AM 05/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>27ºC</li>
            <li>40%</li>
            <li>12:40AM 03/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>25ºC</li>
            <li>66%</li>
            <li>09:43AM 02/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>30ºC</li>
            <li>48%</li>
            <li>10:35AM 30/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>33ºC</li>
            <li>45%</li>
            <li>08:50PM 28/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>29ºC</li>
            <li>50%</li>
            <li>07:20AM 28/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>26ºC</li>
            <li>47%</li>
            <li>11:50AM 25/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>27ºC</li>
            <li>40%</li>
            <li>12:10AM 17/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 1</li>
            <li>31ºC</li>
            <li>39%</li>
            <li>10:30AM 10/08/25</li>
        </ul>
    </div>`
    }else if(sensor==2){
        div_historico.innerHTML = `<ul class="cabecalho-historico">
            <li>ID:</li>
            <li>Local:</li>
            <li>Temperatura (°C):</li>
            <li>Umidade (%):</li>
            <li>Data:</li>
        </ul>
        <ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>35ºC</li>
            <li>46%</li>
            <li>11:50AM 15/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>35ºC</li>
            <li>46%</li>
            <li>02:50AM 15/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>33ºC</li>
            <li>45%</li>
            <li>09:50AM 10/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>32ºC</li>
            <li>47%</li>
            <li>12:50AM 08/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>28ºC</li>
            <li>55%</li>
            <li>08:50PM 05/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>26ºC</li>
            <li>44%</li>
            <li>05:25AM 05/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>27ºC</li>
            <li>40%</li>
            <li>12:40AM 03/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>25ºC</li>
            <li>66%</li>
            <li>09:43AM 02/09/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>30ºC</li>
            <li>48%</li>
            <li>10:35AM 30/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>33ºC</li>
            <li>45%</li>
            <li>08:50PM 28/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>29ºC</li>
            <li>50%</li>
            <li>07:20AM 28/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>26ºC</li>
            <li>47%</li>
            <li>11:50AM 25/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>27ºC</li>
            <li>40%</li>
            <li>12:10AM 17/08/25</li>
        </ul><ul class="dados-sensor">
            <li>1</li>
            <li>Reservatório 2</li>
            <li>31ºC</li>
            <li>39%</li>
            <li>10:30AM 10/08/25</li>
        </ul>
    </div>`
    }
}