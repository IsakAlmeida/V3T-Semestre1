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

//função para aumentar a input de pesquisa
const txt = document.getElementById("pergunta");

txt.addEventListener("input", () => {
    txt.style.height = "auto";     // reseta
    txt.style.height = txt.scrollHeight + "px"; // ajusta ao conteúdo
});
