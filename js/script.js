document.addEventListener("DOMContentLoaded", function() {
    
    // 1. O Banco de Dados das Perguntas (Array de Objetos)
    // Para adicionar mais perguntas, basta adicionar um novo bloco com chaves {} aqui dentro.
    const bancoDePerguntas = [
        {
            pergunta: "Qual destas práticas é considerada uma ação de agricultura sustentável para preservar o solo a longo prazo?",
            opcoes: [
                "Desmatamento de Novas Áreas",
                "Uso exclusivo de fertilizantes químicos",
                "Rotação de Culturas",
                "Queimadas para limpar o terreno"
            ],
            respostaCorreta: 2, // O índice da resposta certa (lembre-se, a contagem começa no 0)
            explicacao: "A rotação de culturas é fundamental para não esgotar os nutrientes da terra."
        },
        {
            pergunta: "O que é o sistema de Plantio Direto?",
            opcoes: [
                "Plantar sementes sem revirar o solo, mantendo a palhada anterior",
                "Plantar sem o uso de qualquer tipo de irrigação",
                "Plantar sementes diretamente em rios",
                "Plantar a mesma cultura durante o ano inteiro"
            ],
            respostaCorreta: 0,
            explicacao: "O plantio direto protege o solo contra a erosão, usando a palha da colheita passada como proteção."
        },
        {
            pergunta: "A sigla ILPF refere-se a uma tecnologia sustentável importante. O que ela significa?",
            opcoes: [
                "Índice Local de Plantação e Fertilização",
                "Integração Lavoura-Pecuária-Floresta",
                "Instituto de Limpeza de Pastos e Fazendas",
                "Irrigação Livre Para Florestas"
            ],
            respostaCorreta: 1,
            explicacao: "A Integração Lavoura-Pecuária-Floresta otimiza o uso da terra, combinando árvores, pasto e gado no mesmo espaço."
        }
    ];

    // 2. Variáveis de controle do jogo
    let indicePerguntaAtual = 0;
    let acertos = 0;

    // 3. Mapeando os elementos do HTML
    const elementoPergunta = document.getElementById("pergunta");
    const containerOpcoes = document.getElementById("opcoes-container");
    const elementoResultado = document.getElementById("resultado");
    const btnProxima = document.getElementById("btn-proxima");
    const elementoContador = document.getElementById("contador-perguntas");

    // 4. Função para mostrar a pergunta na tela
    function carregarPergunta() {
        // Pega a pergunta atual baseada no índice
        const perguntaAtual = bancoDePerguntas[indicePerguntaAtual];
        
        // Atualiza textos na tela
        elementoContador.textContent = `Pergunta ${indicePerguntaAtual + 1} de ${bancoDePerguntas.length}`;
        elementoPergunta.textContent = perguntaAtual.pergunta;
        
        // Limpa o container e o resultado anterior
        containerOpcoes.innerHTML = "";
        elementoResultado.textContent = "";
        btnProxima.style.display = "none";

        // Cria os botões de opção dinamicamente
        perguntaAtual.opcoes.forEach(function(textoOpcao, index) {
            const botao = document.createElement("button");
            botao.textContent = textoOpcao;
            botao.classList.add("btn-resposta");
            
            // Adiciona o evento de clique para verificar a resposta
            botao.addEventListener("click", function() {
                verificarResposta(index);
            });
            
            containerOpcoes.appendChild(botao);
        });
    }

    // 5. Função que verifica se o aluno clicou na opção certa
    function verificarResposta(indiceClicado) {
        const perguntaAtual = bancoDePerguntas[indicePerguntaAtual];
        const botoes = document.querySelectorAll(".btn-resposta");

        // Desativa todos os botões para não clicar duas vezes
        botoes.forEach(btn => btn.disabled = true);

        if (indiceClicado === perguntaAtual.respostaCorreta) {
            elementoResultado.textContent = "✅ Correto! " + perguntaAtual.explicacao;
            elementoResultado.style.color = "#2e7d32";
            botoes[indiceClicado].style.backgroundColor = "#4caf50";
            botoes[indiceClicado].style.color = "white";
            acertos++;
        } else {
            elementoResultado.textContent = "❌ Incorreto. " + perguntaAtual.explicacao;
            elementoResultado.style.color = "#c62828";
            botoes[indiceClicado].style.backgroundColor = "#ef5350";
            botoes[indiceClicado].style.color = "white";
            
            // Pinta a resposta que seria a correta de verde para o usuário aprender
            botoes[perguntaAtual.respostaCorreta].style.backgroundColor = "#4caf50";
            botoes[perguntaAtual.respostaCorreta].style.color = "white";
        }

        // Mostra o botão para ir para a próxima etapa
        btnProxima.style.display = "inline-block";
    }

    // 6. Evento de clique para ir para a próxima pergunta
    btnProxima.addEventListener("click", function() {
        indicePerguntaAtual++; // Passa para a próxima pergunta

        if (indicePerguntaAtual < bancoDePerguntas.length) {
            carregarPergunta(); // Carrega a próxima
        } else {
            mostrarResultadoFinal(); // Se acabaram as perguntas, mostra o placar
        }
    });

    // 7. Tela Final do Quiz
    function mostrarResultadoFinal() {
        elementoContador.textContent = "Quiz Finalizado!";
        elementoPergunta.textContent = `Você acertou ${acertos} de ${bancoDePerguntas.length} perguntas.`;
        containerOpcoes.innerHTML = ""; // Some com as opções
        btnProxima.style.display = "none";

        if (acertos === bancoDePerguntas.length) {
            elementoResultado.textContent = "🏆 Excelente! Você é um especialista em agricultura sustentável!";
            elementoResultado.style.color = "#2e7d32";
        } else {
            elementoResultado.textContent = "🌱 Bom trabalho! Continue estudando para tornar o Agro cada vez mais forte e sustentável.";
            elementoResultado.style.color = "#f57c00";
        }
    }

    // Inicializa o quiz carregando a primeira pergunta
    carregarPergunta();
});