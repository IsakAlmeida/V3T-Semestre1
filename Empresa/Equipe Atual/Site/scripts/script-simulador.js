// função para calcular valor de prejuízo e economia
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

        // cálculo de economia
        let ganho = perda_anual * 0.3;

        // inserindo dados na div de resuiltado da simulação 
        valor_prejuizo.innerHTML = `${perda_anual.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}).replaceAll('R$', '').trim()}`
        valor_ganho.innerHTML = `${ganho.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}).replaceAll('R$', '').trim()}`

        iptQtdMateria.value = '';
        iptValor.value = '';
    }
}