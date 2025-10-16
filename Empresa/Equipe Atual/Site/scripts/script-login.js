 //=== Função para mostrar senha e icone no input de senha ===
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
    //=== Função Entrar/Login ===
    function login() {
        var email = ipt_email.value;
        var senha = ipt_senha.value;

        //Verificação de inputs em branco
        if (email == "") {
            alert('O campo Email não pode estar em branco!');
        } else if (senha == "") {
            alert('O campo Senha não pode estar em branco!');
        }
        // Verificação de quantidade de caracteres na senha
        else if (senha.length < 8) {
            alert('A senha deve ter pelo menos 8 caracteres!');
        } else if (senha.indexOf("0") == -1 && senha.indexOf("1") == -1 && senha.indexOf("2") == -1 &&
            senha.indexOf("3") == -1 && senha.indexOf("4") == -1 && senha.indexOf("5") == -1 &&
            senha.indexOf("6") == -1 && senha.indexOf("7") == -1 && senha.indexOf("8") == -1 &&
            senha.indexOf("9") == -1) {
            alert('A senha deve conter pelo menos um número!');
        }
        // Verificação de @ no email
        else if (email.indexOf("@") == -1) {
            alert('O email deve conter o símbolo @');
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
                alert('A senha deve conter pelo menos uma letra maiúscula!');
            }
            //Verificação de caractere especial - se n for encontrado o caractere em alguma posicão da senha, ele retorna -1, e se uma das condições forem verdadeiras, exibe o alert
            else if (senha.indexOf("!") == -1 && senha.indexOf("@") == -1 && senha.indexOf("#") == -1 && senha.indexOf("$") == -1 && senha.indexOf("%") == -1 && senha.indexOf("&") == -1) {
                alert('A senha deve conter pelo menos um caractere especial (!, @, #, $, %, &)');
            }
            // Else final
            else {
                alert('Login realizado com sucesso! Bem vindo a V3T.');
                window.location.href = "dashboard.html";
            }
        }
    }