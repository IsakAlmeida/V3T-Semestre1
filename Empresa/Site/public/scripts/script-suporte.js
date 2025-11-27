async function gerarResposta() {
            const pergunta = document.getElementById('pergunta').value;

            const response = await fetch('/perguntar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pergunta })
            });

            const data = await response.json();

            resposta.style.display = 'block';
            document.getElementById('resposta').innerText = data.resultado;
        }