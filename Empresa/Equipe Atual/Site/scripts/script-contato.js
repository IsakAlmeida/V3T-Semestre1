
var razao = iptRazao.value;
var nome = iptNome.value;
var cnpj = iptCNPJ.value;
var email = iptEmail.value;
var telefone = iptTelefone.value;
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

 function mail(){
    email = iptEmail.value.trim();
    let erro = "";

    if (email == "") {
        erro = `Preencha o campo Email`
    }else if(email.indexOf("@") == -1){
            erro = `Insira um email válido que contenha @`;
 }

 if (erro != "") {
    divEmail.innerHTML = `${erro}`; 
 }else{
    divEmail.innerHTML = ``;
 }

}

function tel(){
    telefone = iptTelefone.value.trim();
    let erro = "";

    if (telefone == '') {
        erro = `Preencha o campo Telefone`
   }else if (telefone.length < 15) {
    erro = `Informe um número válido igual ao exemplo`;
    }

    if (erro != "") {
        divTelefone.innerHTML = `${erro}`
    }else{
        divTelefone.innerHTML = `Ex: (xx) xxxx-xxxx`;
    }
}
 