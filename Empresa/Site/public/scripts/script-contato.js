var chkMail = false;
var chkTel = false;
var chkRes = false;

var responsavel;
var email;
var telefone;

function nomeRes() {
    responsavel = iptNomeRes.value.trim();
    let erro = "";

    if (responsavel == '') {
        erro = `Preencha o campo Nome Responsavél`;
    }

    if (erro != "") {
        divRes.innerHTML = `${erro}`;
        chkRes = false;
    } else {
        divRes.innerHTML = ``;
        chkRes = true;
    }
}

function mail() {
    email = iptEmail.value.trim();
    let erro = "";
    let contArroba = 0;
    let contPonto = 0;

    if (email == "") {
        erro = `Preencha o campo Email`
    } else {
        for (let i = 0; i < email.length; i++) {
            if (email[i] == '.') {
                contPonto++;
            }
            if (email[i] == '@') {
                contArroba++;
            }
        }
        if (contPonto < 1) {
            erro = `O email deve conter ponto<br>(Ex: email@email.com)`
        } if (contArroba != 1) {
            erro = `O email deve conter apenas um @<br>(Ex: email@email.com)`
        } if (email.length > 45) {
            erro = 'O email pode ter no máximo 45 caracteres<br>(Ex: email@email.com)'
        }
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
    } else if (telefone.length != 11) {
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

function validar() {
    nomeRes();
    mail();
    tel();
    
    const temErro = chkRes && chkMail && chkTel;

    return temErro;

}

function enviar() {
    if (!validar()) {
        alert("Verifique se todos os campos estão preenchidos!");
        return false;
    } else {
        
        fetch("/contato/contatar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                responsavelVar: responsavel,
                emailVar: email,
                telefoneVar: telefone
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    alert("Dados enviados!! Iremos entrar em contato através do email");

                    setTimeout(() => {
                        window.location = "login.html";
                    }, "2000");

                } else {
                    alert("Erro ao enviar os dados! Aguarde alguns minutos e tente novamente.")
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
            console.log(responsavelVar, emailVar, telefoneVar)
        return false;
    }

}