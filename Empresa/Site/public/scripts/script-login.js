//=== Função para mostrar senha e icone no input de senha ===
function mostrarSenha(idInput, icone) {
    // declara a função 'mostrarSenha' que recebe dois parâmetros:
    // - idInput: string com o id do elemento <input> que contém a senha
    // - icone: referencia ao elemento <img> (ou outro elemento) que representa o ícone do olho

    const input = document.getElementById(idInput);
    // usa document.getElementById para buscar no HTML o elemento <input> cujo id é idInput
    // e armazena essa referência na constante 'input'.
    // Se não existir elemento com esse id, 'input' será null.

    if (input.type === "password") {
        // verifica se o atributo 'type' do input é exatamente igual a "password".
        // Essa condição é true quando o campo está em modo 'esconder senha'.

        input.type = "text";
        // altera o atributo 'type' do input para "text", ou seja, torna a senha visível como texto normal no campo.

        icone.src = "../imgs/olho-fechado-senha.png";
        // altera a propriedade 'src' do elemento 'icone' para a imagem do olho aberto, indicando visualmente que a senha está sendo mostrada.

    } else {
        // caso a condição do if seja false (ou seja, input.type não é "password"), executa o bloco else.

        input.type = "password";
        // altera o atributo 'type' de volta para "password", escondendo novamente o texto.

        icone.src = "../imgs/olho-aberto-senha.png";
        // muda o 'src' do ícone para a imagem do olho fechado, indicando que a senha está oculta.
    }
}

//=== Função Entrar/Login ===
var chkemail = false;
var chksenha = false;

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
    senha = ipt_senha.value.trim();
    let erro = "";

    if (senha == '') {
        erro = `Preencha o campo Senha`;
    } else if (senha.indexOf("0") == -1 && senha.indexOf("1") == -1 && senha.indexOf("2") == -1 &&
        senha.indexOf("3") == -1 && senha.indexOf("4") == -1 && senha.indexOf("5") == -1 &&
        senha.indexOf("6") == -1 && senha.indexOf("7") == -1 && senha.indexOf("8") == -1 &&
        senha.indexOf("9") == -1) {
        erro = 'A senha deve conter pelo menos um número!';
    }

    if (erro != "") {
        div_msg_senha.innerHTML = `${erro}`;
        chksenha = false;
    } else {
        div_msg_senha.innerHTML = ``;
        chksenha = true;
    }
}

function login() {
    // if simulando um cadastro
    var email = ipt_email.value;
    var senha = ipt_senha.value;

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.RESERVATORIOS = JSON.stringify(json.reservatorios)

                setTimeout(function () {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

