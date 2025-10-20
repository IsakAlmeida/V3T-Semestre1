// função para scroll da navbar

{
    const header = document.querySelector('.header');
    let ultimoScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (ultimoScrollY < window.scrollY) {
            header.classList.add('nav-hidden');
        } else {
            header.classList.remove('nav-hidden');
        }

        ultimoScrollY = window.scrollY;
    })
}

function simular(){
    let materia_prima = Number(iptQtdMateria.value);
    let valor = Number(iptValor.value);

    if (materia_prima <= 0) {
        alert('Por favor, insira um valor maior que zero para a quantidade de matéria-prima.')
    } else if (valor <= 0) {
        alert('Por favor, insira um valor maior que zero para o valor de venda')
    } else {
        // cálculo do prejuízo anual
        let perda_anual = (materia_prima * valor * 365) * 0.15;

        // cálculo de ganho em cima do prejuízo
        let ganho = perda_anual * 0.3;

        // inserindo dados na div de resuiltado da simulação 
        valor_prejuizo.innerHTML = `${perda_anual.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`
        valor_ganho.innerHTML = `${ganho.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`

        divMsg.style.display = "flex";

        divMsg.scrollIntoView({behavior: 'smooth', block: 'start'});

        iptQtdMateria.value = '';
        iptValor.value = '';
    }
}