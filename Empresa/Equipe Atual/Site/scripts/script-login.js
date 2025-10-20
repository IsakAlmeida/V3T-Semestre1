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

        icone.src = "../imgs/olho-aberto-senha.png";
        // altera a propriedade 'src' do elemento 'icone' para a imagem do olho aberto, indicando visualmente que a senha está sendo mostrada.

    } else {
        // caso a condição do if seja false (ou seja, input.type não é "password"), executa o bloco else.

        input.type = "password";
        // altera o atributo 'type' de volta para "password", escondendo novamente o texto.

        icone.src = "../imgs/olho-fechado-senha.png";
        // muda o 'src' do ícone para a imagem do olho fechado, indicando que a senha está oculta.
    }
}

//=== Função Entrar/Login ===
function login() {
    var email = ipt_email.value;
    var senha = ipt_senha.value;

    //Verificação de inputs em branco
    if (email == "") {
        div_msg_email.innerHTML = '* O campo Email não pode estar em branco!';
    } else if (senha == "") {
        div_msg_senha.innerHTML = '* O campo Senha não pode estar em branco!';
    }
    // if simulando um cadastro
    else if (email == 'fernanda@sptech' && senha == '123456789') {
        alert('Login realizado com sucesso! Bem vindo a V3T.');
        window.location.href = "dashboard.html";
    } else {
        div_msg_login.innerHTML = '* Email ou senhas invalidos, tente novamente!';
    }
}