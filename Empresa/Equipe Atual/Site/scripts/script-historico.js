var dados = [`<table>
        <tr id="cabecalho-table">
          <th>ID:</th>
          <th>Local:</th>
          <th>Temperatura(°C):</th>
          <th>Umidade(%):</th>
          <th>Data:</th>
        </tr>
        <tr class="dados_registro">
          <td>1</td>
          <td>Reservatório 1</td>
          <td class="dado_temperatura">33°C</td>
          <td class="dado_umidade">55%</td>
          <td>10:30AM 10/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>1</td>
          <td>Reservatório 1</td>
          <td class="dado_temperatura">32°C</td>
          <td>45%</td>
          <td>11:30AM 09/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>1</td>
          <td>Reservatório 1</td>
          <td>22°C</td>
          <td class="dado_umidade">65%</td>
          <td>03:20AM 09/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>1</td>
          <td>Reservatório 1</td>
          <td class="dado_temperatura">34°C</td>
          <td>35%</td>
          <td>11:40AM 08/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>1</td>
          <td>Reservatório 1</td>
          <td class="dado_temperatura">28°C</td>
          <td>46%</td>
          <td>12:0PM 07/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>1</td>
          <td>Reservatório 1</td>
          <td class="dado_temperatura">26°C</td>
          <td>34%</td>
          <td>10:45AM 10/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>1</td>
          <td>Reservatório 1</td>
          <td>23°C</td>
          <td class="dado_umidade">63%</td>
          <td>10:30AM 10/09/2025</td>
        </tr>
      </table>`,`<table>
        <tr id="cabecalho-table">
          <th>ID:</th>
          <th>Local:</th>
          <th>Temperatura(°C):</th>
          <th>Umidade(%):</th>
          <th>Data:</th>
        </tr>
        <tr class="dados_registro">
          <td>2</td>
          <td>Reservatório 2</td>
          <td>15°C</td>
          <td class="dado_umidade">55%</td>
          <td>10:30AM 08/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>2</td>
          <td>Reservatório 2</td>
          <td>19°C</td>
          <td class="dado_umidade">62%</td>
          <td>03:45AM 05/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>2</td>
          <td>Reservatório 2</td>
          <td>20°C</td>
          <td class="dado_umidade">55%</td>
          <td>02:50AM 04/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>2</td>
          <td>Reservatório 2</td>
          <td>16°C</td>
          <td class="dado_umidade">68%</td>
          <td>03:45AM 03/09/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>2</td>
          <td>Reservatório 2</td>
          <td>19°C</td>
          <td class="dado_umidade">65%</td>
          <td>04:25AM 28/08/2025</td>
        </tr>
        <tr class="dados_registro">
          <td>2</td>
          <td>Reservatório 2</td>
          <td>22°C</td>
          <td class="dado_umidade">54%</td>
          <td>03:45AM 26/08/2025</td>
        </tr>
      </table>`];

function carregarHistorico(){
    let sensor = selectSensor.value;
    if(sensor == 1){
        div_historico.innerHTML = dados[0];
    }else if(sensor == 2){
        div_historico.innerHTML = dados[1];
    }
}

