document.addEventListener("DOMContentLoaded", () => {
    
    // Atualizado com 5 perguntas sobre sustentabilidade agrícola
    const quizData = [
        {
            pergunta: "Qual o principal benefício do sistema Lavoura-Pecuária-Floresta (ILPF)?",
            opcoes: [
                "Redução drástica do uso de sementes",
                "Otimização do uso da terra e recuperação de pastagens",
                "Fim completo da necessidade de irrigação",
                "Aumento do consumo de defensivos agrícolas"
            ],
            correta: 1,
            info: "O ILPF integra diferentes sistemas produtivos para melhorar a saúde do solo e o bem-estar animal."
        },
        {
            pergunta: "Como a agricultura de precisão contribui para a sustentabilidade?",
            opcoes: [
                "Substituindo toda a mão de obra humana por robôs",
                "Utilizando aviões para irrigação em larga escala",
                "Aplicando insumos apenas onde e quando são necessários",
                "Aumentando a área de desmatamento para novas plantações"
            ],
            correta: 2,
            info: "Sensores e dados permitem que o produtor economize recursos e proteja o meio ambiente."
        },
        {
            pergunta: "Qual é a principal vantagem da Rotação de Culturas?",
            opcoes: [
                "Quebrar o ciclo de pragas e melhorar a fertilidade do solo",
                "Esgotar rapidamente os nutrientes de uma área",
                "Eliminar totalmente a necessidade de luz solar",
                "Diminuir a diversidade biológica da lavoura"
            ],
            correta: 0,
            info: "Alternar diferentes tipos de plantas na mesma área evita a exaustão do solo e reduz doenças naturais."
        },
        {
            pergunta: "Por que o Sistema de Plantio Direto (SPD) é considerado uma prática conservacionista?",
            opcoes: [
                "Porque exige a queima da vegetação antes de plantar",
                "Porque revolve intensamente a terra com tratores pesados",
                "Porque mantém a palha na superfície, protegendo o solo contra a erosão",
                "Porque consome muito mais água do que o método tradicional"
            ],
            correta: 2,
            info: "A palhada na superfície funciona como um escudo protetor que retém a umidade e evita que a chuva lave os nutrientes."
        },
        {
            pergunta: "O que caracteriza o controle biológico de pragas no campo?",
            opcoes: [
                "A aplicação de agrotóxicos em grandes quantidades",
                "O uso de inimigos naturais (como outros insetos e fungos) para combater a praga",
                "A destruição de todas as árvores ao redor da plantação",
                "A substituição de sementes naturais por artificiais"
            ],
            correta: 1,
            info: "O controle biológico usa a própria natureza a favor da lavoura, diminuindo a necessidade de defensivos químicos."
        }
    ];

    let currentIdx = 0;
    let score = 0;

    const questionEl = document.getElementById("quiz-question");
    const optionsCont = document.getElementById("options-container");
    const feedbackBox = document.getElementById("quiz-feedback");
    const nextBtn = document.getElementById("next-btn");

    function initQuiz() {
        feedbackBox.style.display = "none";
        nextBtn.style.display = "none";
        
        const q = quizData[currentIdx];
        // Atualiza o contador de etapas (Ex: Pergunta 1 de 5)
        document.getElementById("quiz-step").textContent = `Pergunta ${currentIdx + 1} de ${quizData.length}`;
        questionEl.textContent = q.pergunta;
        optionsCont.innerHTML = "";

        q.opcoes.forEach((opt, index) => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(index);
            optionsCont.appendChild(btn);
        });
    }

    function checkAnswer(selected) {
        const q = quizData[currentIdx];
        const buttons = document.querySelectorAll(".option-btn");
        
        buttons.forEach(b => b.disabled = true);

        feedbackBox.style.display = "block";
        feedbackBox.textContent = q.info;

        if (selected === q.correta) {
            score++;
            buttons[selected].style.background = "#E8F5E9";
            buttons[selected].style.borderColor = "#2E7D32";
            feedbackBox.style.color = "#1B5E20";
        } else {
            buttons[selected].style.background = "#FFEBEE";
            buttons[selected].style.borderColor = "#C62828";
            buttons[q.correta].style.background = "#E8F5E9";
            feedbackBox.style.color = "#C62828";
        }

        nextBtn.style.display = "block";
    }

    nextBtn.onclick = () => {
        currentIdx++;
        if (currentIdx < quizData.length) {
            initQuiz();
        } else {
            showFinalResult();
        }
    };

    function showFinalResult() {
        questionEl.textContent = "Avaliação Concluída";
        
        // Mensagem dinâmica baseada na pontuação
        let mensagemFinal = "";
        if (score === quizData.length) {
            mensagemFinal = "Excelente! Você é um verdadeiro especialista em sustentabilidade no campo.";
        } else if (score >= 3) {
            mensagemFinal = "Muito bom! Você tem um ótimo conhecimento sobre o agronegócio do futuro.";
        } else {
            mensagemFinal = "Bom começo! Continue explorando o portal para aprender mais sobre o agronegócio sustentável.";
        }

        optionsCont.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <h3 style="color: var(--primary); font-size: 2rem; margin-bottom: 10px;">${score} / ${quizData.length}</h3>
                <p style="font-size: 1.1rem;">${mensagemFinal}</p>
            </div>
        `;
        feedbackBox.style.display = "none";
        nextBtn.style.display = "none";
        document.getElementById("quiz-step").textContent = "Resultado Final";
    }

    initQuiz();
});
