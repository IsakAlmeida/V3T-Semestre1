// === Função para mostrar icone de olho e senha no input de senha ===
function mostrarSenha(idInput, icone) {
    const input = document.getElementById(idInput);

    if (input.type === "password") {
        input.type = "text";
        icone.src = "../imgs/olho-fechado-senha.png"; // ícone de olho aberto
    } else {
        input.type = "password";
        icone.src = "../imgs/olho-aberto-senha.png"; // ícone de olho fechado
    }
}
//VALIDAÇÕES 

var chknome = false;
var chkemail = false;
var chksenha = false;
var chkconfsenha = false;
var chktoken = false;

function onkey_email() {
    email = ipt_email.value.trim();
    let erro = "";

    if (email == '') {
        erro = `Preencha o campo Email`;
    } else if (email.indexOf("@") == -1) {
        erro = `Insira um email válido que contenha @`;
    }

    if (erro != "") {
        div_msg_email.innerHTML = `${erro}`;
        chkemail = false;
    } else {
        div_msg_email.innerHTML = ``;
        chkemail = true;
    }
}

function onkey_senha() {
    // Verificação de letra maiúscula
    var senha = ipt_senha.value.trim();
    var contador = 0;
    var temMaiuscula = false;

    while (contador < senha.length) {
        var letra = senha[contador];

        if (letra >= "A" && letra <= "Z") {
            temMaiuscula = true;
            break; // para o loop assim que encontrar uma maiúscula
        }
        contador++;
    }

    //validações         
    let erro = "";

    if (senha == '') {
        erro = `Preencha o campo Senha`;
    }
    // verificação para ver se tem numero
    else if (senha.indexOf("0") == -1 && senha.indexOf("1") == -1 && senha.indexOf("2") == -1 &&
        senha.indexOf("3") == -1 && senha.indexOf("4") == -1 && senha.indexOf("5") == -1 &&
        senha.indexOf("6") == -1 && senha.indexOf("7") == -1 && senha.indexOf("8") == -1 &&
        senha.indexOf("9") == -1) {
        erro = 'A senha deve conter pelo menos um número!';
    } 
    // Verificação letra maiscula
    else if (!temMaiuscula) {
        erro = 'A senha deve conter pelo menos uma letra maiúscula!';
    }
    //Verificação de caractere especial - se n for encontrado o caractere em alguma posicão da senha, ele retorna -1, e se uma das condições forem verdadeiras, exibe o alert
    else if (senha.indexOf("!") == -1 && senha.indexOf("@") == -1 && senha.indexOf("#") == -1 && senha.indexOf("$") == -1 && senha.indexOf("%") == -1 && senha.indexOf("&") == -1) {
        erro = 'A senha deve conter pelo menos um caractere especial (!, @, #, $, %, &)';
    }
    //verifica se tem no minimo 8 caracteres
    else if (senha.length < 8) {
        erro = 'A senha deve ter pelo menos 8 caracteres!'
    }

    if (erro != "") {
        div_msg_senha.innerHTML = `${erro}`;
        chksenha = false;
    } else {
        div_msg_senha.innerHTML = ``;
        chksenha = true;
    }
}

function onkey_nome() {
    nome = ipt_nome.value.trim();
    let erro = "";

    if (nome == '') {
        erro = `Preencha o campo Nome`;
    }

    if (erro != "") {
        div_msg_nome.innerHTML = `${erro}`;
        chknome = false;
    } else {
        div_msg_nome.innerHTML = ``;
        chknome = true;
    }
}
function onkey_conf_senha() {
    senha = ipt_senha.value.trim();
    senha_conf = ipt_confirmacaoSenha.value.trim();
    let erro = "";

    if (senha_conf == '') {
        erro = `Preencha o campo Confirmação de Senha`;
    }else if (senha != senha_conf) {
        erro = 'As senhas digitadas são diferentes. Por favor, verifique e tente novamente.'
    }

    if (erro != "") {
        div_msg_conf_senha.innerHTML = `${erro}`;
        chksenha_conf = false;
    } else {
        div_msg_conf_senha.innerHTML = ``;
        chksenha_conf = true;
    }
}

function onkey_token() {
    token = ipt_token.value.trim();
    let erro = "";

    if (token == '') {
        erro = `Preencha o campo Token`;
    }

    if (erro != "") {
        div_msg_token.innerHTML = `${erro}`;
        chktoken = false;
    } else {
        div_msg_token.innerHTML = ``;
        chktoken = true;
    }
}
let listaEmpresasCadastradas = [];
function cadastrar(){
    onkey_nome();
    onkey_email();
    onkey_senha();
    onkey_conf_senha();
    onkey_token();

    const temErro = chknome &&
                        chkemail &&
                        chksenha &&
                        chksenha_conf &&
                        chktoken 


    if (!temErro) {
        alert("Verifique se todos os campos estão preenchidos!");
        return false;
    } else {
        var codigoVar = ipt_token.value.trim();
        var nomeVar =ipt_nome.value;
        var emailVar = ipt_email.value;
        var senhaVar  = ipt_senha.value;

        // Verificando se o código de ativação é de alguma empresa cadastrada
    for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
      if (listaEmpresasCadastradas[i].codigo == codigoVar) {
        idEmpresaVincular = listaEmpresasCadastradas[i].id
        console.log("Código de ativação válido.");
        break;
      } else {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "(Mensagem de erro para código inválido)";
      }
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        idEmpresaVincularServer: idEmpresaVincular
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          cardErro.style.display = "block";

          mensagem_erro.innerHTML =
            "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

          setTimeout(() => {
            window.location = "login.html";
          }, "2000");

        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;

    }

}





// ------------------WEB-DATA-VIZ-----------------



  // Listando empresas cadastradas 
  function listar() {
    fetch("/empresas/listar", {
      method: "GET",
    })
      .then(function (resposta) {
        resposta.json().then((empresas) => {
          empresas.forEach((empresa) => {
            listaEmpresasCadastradas.push(empresa);

            
          });
        });
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  }

  function sumirMensagem() {
    cardErro.style.display = "none";
  }