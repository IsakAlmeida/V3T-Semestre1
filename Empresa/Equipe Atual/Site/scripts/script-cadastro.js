 // === Função para mostrar icone de olho e senha no input de senha ===
    function mostrarSenha(idInput, icone) {
        const input = document.getElementById(idInput);

        if (input.type === "password") {
            input.type = "text";
            icone.src = "../imgs/olho-aberto-senha.png"; // ícone de olho aberto
        } else {
            input.type = "password";
            icone.src = "../imgs/olho-fechado-senha.png"; // ícone de olho fechado
        }
    }

    //=== Função Cadastrar ===
    function cadastrar() {
        var nome = ipt_nome.value;
        var email = ipt_email.value;
        var senha = ipt_senha.value;
        var confirmacaoSenha = ipt_confirmacaoSenha.value;
        var token = ipt_token.value;

        //Verificação de inputs em branco
        if (nome == "") {
            div_msg_nome.innerHTML = '* O nome não pode estar em branco!';
        } else if (email == "") {
            div_msg_email.innerHTML = '* O Email não pode estar em branco!';
        } else if (senha == "") {
            div_msg_senha.innerHTML = '* A senha não pode estar em branco!';
        } else if (confirmacaoSenha == "") {
            div_msg_conf_senha.innerHTML = '* A confirmação de senha não pode estar em branco!';
        } else if (token == "") {
            div_msg_token.innerHTML = '* O token não pode estar em branco!';
        } 
        // Verificação de quantidade de caracteres na senha
        else if (senha.length < 8) {  
            div_msg_senha.innerHTML = '* A senha deve ter pelo menos 8 caracteres!';
        } else if (senha.indexOf("0") == -1 && senha.indexOf("1") == -1 && senha.indexOf("2") == -1 &&
            senha.indexOf("3") == -1 && senha.indexOf("4") == -1 && senha.indexOf("5") == -1 &&
            senha.indexOf("6") == -1 && senha.indexOf("7") == -1 && senha.indexOf("8") == -1 &&
            senha.indexOf("9") == -1) { 
            div_msg_senha.innerHTML = '* A senha deve conter pelo menos um número!';
        } 
        // Verificação de @ no email
        else if (email.indexOf("@") == -1) {
            div_msg_email.innerHTML = '* O email deve conter o símbolo @';
        } else {
        // Verificação de letra maiúscula
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

            if (!temMaiuscula) {
                div_msg_senha.innerHTML = '* A senha deve conter pelo menos uma letra maiúscula!';
            } 
            //Verificação de caractere especial - se n for encontrado o caractere em alguma posicão da senha, ele retorna -1, e se uma das condições forem verdadeiras, exibe o alert
            else if (senha.indexOf("!") == -1 && senha.indexOf("@") == -1 && senha.indexOf("#") == -1 && senha.indexOf("$") == -1 && senha.indexOf("%") == -1 && senha.indexOf("&") == -1) {
                div_msg_senha.innerHTML = '* A senha deve conter pelo menos um caractere especial (!, @, #, $, %, &)';
            } 
            // Confirmação de senha iguais
            else if (senha != confirmacaoSenha) {
                div_msg_conf_senha.innerHTML ='* As senhas digitadas são diferentes. Por favor, verifique e tente novamente.'; 
            } 
            // Else final
            else {
                alert('Cadastrado com sucesso!');
                window.location.href = "login.html";
            }
        }
    }