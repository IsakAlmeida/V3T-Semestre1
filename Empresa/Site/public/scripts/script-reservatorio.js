var reservatoriosBD = [];

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

function redirecionarReservatorio() {
  let reservatorioId = select_reservatorio.value;
  if (reservatorioId == "#") {
    alert("Selecione um Reservatório para prosseguir");
  } else {
    for(let i = 0; i < reservatoriosBD.length; i++){
        if(reservatoriosBD[i].idReservatorio == reservatorioId){
            sessionStorage.RESERVATORIOPESQUISADO = JSON.stringify(reservatoriosBD[i]);
        }
    }
    window.location = "./reservatorioPesquisado.html";
  }
}
