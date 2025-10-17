var chkSocial = false;
var chkNomeFan = false;
var chkNumCpnj = false;
var chkMail = false;
var chkTel = false;
var chkLugar = false;
var chkNumeracao = false;
var chkBar = false;
var chkCity = false;
var chkUnidade = false;
var chkClickCep = false;


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
        chkSocial = false;
    } else {
        divRazao.innerHTML = ``;
        chkSocial = true;
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
        chkNomeFan = false;
    } else {
        divNome.innerHTML = ``;
        chkNomeFan = true;
    }
}

function numCpnj() {
    cnpj = iptCNPJ.value.trim();
    let erro = "";

    if (cnpj == "") {
        erro = `Preencha o campo CNPJ`;
    } else if (cnpj.length < 14) {
        erro = `Insira um CPNJ valido`;
    }

    if (erro != "") {
        divCnpj.innerHTML = `${erro}`;
        chkNumCpnj = false;
    } else {
        divCnpj.innerHTML = ``;
        chkNumCpnj = true;
    }
}

function mail() {
    email = iptEmail.value.trim();
    let erro = "";

    if (email == "") {
        erro = `Preencha o campo Email`
    } else if (email.indexOf("@") == -1) {
        erro = `Insira um email válido que contenha @`;
    }

    if (erro != "") {
        divEmail.innerHTML = `${erro}`;
        chkMail = false;
    } else {
        divEmail.innerHTML = ``;
        chkMail = true;
    }

}

function tel() {
    telefone = iptTelefone.value.trim();
    let erro = "";

    if (telefone == '') {
        erro = `Preencha o campo Telefone`
    } else if (telefone.length < 15) {
        erro = `Informe um número válido igual ao exemplo`;
    }

    if (erro != "") {
        divTelefone.innerHTML = `${erro}`
        chkTel = false;
    } else {
        divTelefone.innerHTML = ``;
        chkTel = true;
    }
}

function lugar() {
    rua = iptRua.value.trim();
    let erro = "";

    if (rua == "") {
        erro = `Preencha o campo Rua`;
    } else if (rua.length < 2) {
        erro = `Informe uma rua válida`
    }
    if (erro != "") {
        divRua.innerHTML = `${erro}`;
        chkLugar = false;
    } else {
        divRua.innerHTML = ``;
        chkLugar = true;
    }
}

function numeracao() {
    num = Number(iptNum.value.trim())
    let erro = "";

    if (num == "") {
        erro = `Preencha o campo N° `;
    } else if (num <= 0 || num % 1 != 0) {
        erro = `Preencha um número válido`;
    }

    if (erro != "") {
        divNum.innerHTML = `${erro}`
        chkNumeracao = false;
    } else {
        divNum.innerHTML = ``;
        chkNumeracao = true;
    }
}

function bar() {
    bairro = iptBairro.value.trim();
    let erro = "";

    if (bairro == "") {
        erro = `Preencha o campo Bairro`;
    } else if (bairro.length < 2) {
        erro = `Insira um nome valido (mínimo 2 caracteres)`;
    }

    if (erro != "") {
        divBairro.innerHTML = `${erro}`;
        chkBar = false;
    } else {
        divBairro.innerHTML = ``;
        chkBar = true;
    }
}

function city() {
    cidade = iptCidade.value.trim();
    let erro = "";

    if (cidade == "") {
        erro = `Preencha o campo Cidade`;
    } else if (cidade.length < 2) {
        erro = `Insira um nome valido (mínimo 2 caracteres)`;
    }

    if (erro != "") {
        divCidade.innerHTML = `${erro}`;
        chkCity = false;
    } else {
        divCidade.innerHTML = ``;
        chkCity = true;
    }
}

function unidade() {
    uf = iptUF.value.trim();
    let erro = "";

    if (uf == "") {
        erro = `Preencha o campo Cidade`;
    }
    if (erro != "") {
        divUF.innerHTML = `${erro}`;
        chkUnidade = false;
    } else {
        divUF.innerHTML = ``;
        chkUnidade = true;
    }
}

function clickCep() {
    cep = iptCEP.value;
    let erro = "";

    if (cep == "") {
        erro = `Preencha o campo CEP`;
    } else if (cep.length < 8) {
        erro = `O Campo CEP está errado`;
    }
    if (erro != "") {
        divCEP.innerHTML = `${erro}`
        chkClickCep = false;
    } else {
        divCEP.innerHTML = ``
        chkClickCep = true;
    }
}

function enviar(){
    social();
    nomeFan();
    numCpnj();
    mail();
    tel();
    lugar();
    numeracao();
    bar();
    city();
    unidade();
    clickCep();

    const temErro = chkSocial &&
                        chkNomeFan &&
                        chkNumCpnj &&
                        chkMail &&
                        chkTel &&
                        chkLugar &&
                        chkNumeracao &&
                        chkBar &&
                        chkCity &&
                        chkUnidade &&
                        chkClickCep;


    if (!temErro) {
        alert("Verifique se todos os campos estão preenchidos!");
        return false;
    } else {
        alert("Email enviado!! Iremos entrar em contato através do email");
    }

}