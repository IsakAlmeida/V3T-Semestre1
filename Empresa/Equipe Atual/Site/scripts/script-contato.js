
var razao = iptRazao.value;
var nome = iptNome.value;
var cnpj = iptCNPJ.value;
var email = iptEmail.value;
var tel = iptTelefone.value;
var rua = iptRua.value;
var num = Number(iptNum.value);
var bairro = iptBairro.value;
var cidade = iptCidade.value;
var uf = iptUF.value;
var cep = iptCEP.value;



function social() {
    razao = iptRazao.value.trim();
    let erro = "";

    if (razao == '') {
        erro = `Preencha o campo Razão Social`;
    } else if (razao.length < 2) {
        erro = `Insira um nome valido (mínimo 2 caracteres)`;
    }

    if (erro != "") {
        divRazao.innerHTML = `${erro}`;
    } else {
        divRazao.innerHTML = ``;
    }
}

function nomeFan() {
    nome = iptNome.value.trim();
    let erro = "";

    if (nome == '') {
        erro = `Preencha o campo Nome Fantasia`;
    } else if (nome.length < 2) {
        erro = `Insira um nome valido (mínimo 2 caracteres)`;
    }

    if (erro != "") {
        divNome.innerHTML = `${erro}`;
    } else {
        divNome.innerHTML = ``;
    }
}

 function numCpnj(){
    cnpj = iptCNPJ.value.trim();
    let erro = "";

    if (cnpj == "") {
        erro = `Preencha o campo CNPJ`;
    }else if (cnpj.length < 14) {
        erro = `Insira um CPNJ valido`;
    }

    if (erro != "") {
        divCnpj.innerHTML = `${erro}`;
    }else{
        divCnpj.innerHTML = ``;
    }
 }
