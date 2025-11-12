var index = 0;
var valores = 
[`<div class="div-valores">
      <div class="div-texto-valores">
        <h2>Visão</h2>
        <p>
          Ser referência em soluções tecnológicas de
          <b>monitoramento de temperatura e umidade</b>, garantindo qualidade e
          confiança na indústria de biotintas para alimentos.
        </p>
      </div>
      <img src="../imgs/sobre-visao.png" alt="" />
    </div>`,`<div class="div-valores">
      <img src="../imgs/sobre-missao.png" alt="" />
      <div class="div-texto-valores">
        <h2>Missão</h2>
        <p>
          Oferecer <b>soluções IoT inovadoras</b> para armazenagem de biotinta
          de impressão 3D de alimentos, <b>assegurando qualidade</b>, reduzindo
          desperdícios e promovendo sustentabilidade.
        </p>
      </div>
    </div>`,`<div class="div-valores">
      <div class="div-texto-valores">
        <h2>Valores</h2>
        <p>
          <b>Inovação:</b> Tecnologia de ponta para a indústria alimentícia;<br />
          <b>Transparência:</b> Dados claros e confiáveis;<br />
          <b>Eficiência:</b> Otimização de processos e redução de perdas;<br />
          <b>Colaboração:</b> Integração com empresas e pesquisadores.
        </p>
      </div>
      <img src="../imgs/sobre-valores.png" alt="" />
    </div>`];
    div_valores.innerHTML = valores[0];
    div_idCarrossel.innerHTML = `<div class='pointDestaque'></div><div class='point'></div><div class='point'></div>`
    function direitaCarrossel() {
        
        if(index==0){
            index = 1;
            div_valores.innerHTML = valores[index];
            div_idCarrossel.innerHTML = `<div class='point'></div><div class='pointDestaque'></div><div class='point'></div>`
        }else if(index==1){
            index = 2;
            div_valores.innerHTML = valores[index];
            div_idCarrossel.innerHTML = `<div class='point'></div></div><div class='point'></div><div class='pointDestaque'>`
        }
        else{
            index = 0;
            div_valores.innerHTML = valores[index];
            div_idCarrossel.innerHTML = `<div class='pointDestaque'></div><div class='point'></div><div class='point'></div>`
        }

    }
    function esquerdaCarrossel() {
        
        if(index==0){
            index = 2;
            div_valores.innerHTML = valores[index];
            div_idCarrossel.innerHTML = `<div class='point'></div></div><div class='point'></div><div class='pointDestaque'>`
        }else if(index==1){
            index = 0;
            div_valores.innerHTML = valores[index];
            div_idCarrossel.innerHTML = `<div class='pointDestaque'></div><div class='point'></div><div class='point'></div>`
        }
        else{
            index = 1;
            div_valores.innerHTML = valores[index];
            div_idCarrossel.innerHTML = `<div class='point'></div><div class='pointDestaque'></div><div class='point'></div>`
        }

    }

    setInterval(direitaCarrossel,5000);