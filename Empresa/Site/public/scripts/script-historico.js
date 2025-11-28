var reservatoriosBD = [];
var historicoBD = [];
nome_usuario.innerHTML = sessionStorage.NOME_USUARIO;

function listarReservatorios() {
  fetch(`/reservatorio/${sessionStorage.ID_EMPRESA}`, {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((reservatorios) => {
        reservatorios.forEach((reservatorio) => {
          reservatoriosBD.push(reservatorio);
        });
        carregarReservatorios();
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function carregarReservatorios() {
  select_reservatorio.innerHTML =
    "<option value='#' disabled selected>Selecione</option>";

  if (reservatoriosBD.length < 1) {
    select_reservatorio.innerHTML +=
      "<option value='#'>Nenhum destino encontrado.</option>";
  } else {
    reservatoriosBD.forEach((reservatorio) => {
      select_reservatorio.innerHTML += `<option value='${reservatorio.idReservatorio}'>${reservatorio.nome}</option>`;
    });
  }
}

function carregarHistorico() {
  let reservatorioId = select_reservatorio.value;
  if (reservatorioId == "#") {
    alert("Selecione um Reservatório para prosseguir");
  } else {
    fetch(`/reservatorio/historico/${reservatorioId}`, {
      method: "GET",
    })
      .then(function (resposta) {
        historicoBD = [];
        resposta.json().then((alertas) => {
          alertas.forEach((alerta) => {
            historicoBD.push(alerta);
          });
          plotarHistorico();
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }

  function plotarHistorico() {
    div_historico.innerHTML =
      "";

    if (historicoBD.length < 1) {
      div_historico.innerHTML +=
        '<span id="msg-padrao">Não existem registros para esse reservatório.</span>';
    } else {
      div_historico.innerHTML = `
      <div id="dados_reservatorio">
        <h3>Dados Reservatório:</h3>
        <span>Nome Reservatório: ${historicoBD[0].nome}</span>
        <span>Local: ${historicoBD[0].locall}</span>
      </div>
      <table id="tabela_alertas">
        <tr id="cabecalho-table">
          <th>Temperatura(°C):</th>
          <th>Umidade(%):</th>
          <th>Data:</th>
          <th>Classificação:</th>
        </tr>
      </table>
      `
      historicoBD.forEach((alerta) => {
        tabela_alertas.innerHTML += `
        <tr class="dados_registro">
          <td class="${alerta.temperaturaCelsius>=25 ? 'critico': alerta.temperaturaCelsius>20 ? 'moderado': ''}">${alerta.temperaturaCelsius}ºC</td>
          <td class="${alerta.umidadePorcentagem>50 ? 'dado_umidade': ''}">${alerta.umidadePorcentagem}%</td>
          <td class="dado_horas">${(alerta.dtHora).substring(0,19)}</td>
          <td>${alerta.tipo}</td>
        </tr>
        `;
      });
    }
  }
}
