console.log('script.js carregado');

// Atualiza a barra de progresso com base no índice da questão atual
function updateProgressBar() {
    const questionsOrder = JSON.parse(sessionStorage.getItem('questionsOrder')) || [];
    const totalPerguntas = questionsOrder.length;
    const currentQuestionIndex = parseInt(sessionStorage.getItem('currentQuestionIndex'), 10) || 0;
    const progresso = (currentQuestionIndex / totalPerguntas) * 100;
    document.querySelector('.progress-bar').style.width = `${progresso}%`;
    console.log('Barra de progresso atualizada');
}

// Salva a resposta do usuário e avança para a próxima pergunta
function salvarResposta(pergunta) {
    const selectedAnswer = document.querySelector(`input[name="${pergunta}"]:checked`);
    
    if (selectedAnswer) {
        // Desabilitar o botão "Enviar" após o clique
        const sendButton = document.querySelector('.btnEnviar');
        sendButton.disabled = true;

        const respostaCorreta = document.querySelector(`input[name="${pergunta}"][value="Acertou"]`);

        if (selectedAnswer.value === "Acertou") {
            selectedAnswer.parentElement.style.backgroundColor = "green";
            let correctAnswers = parseInt(sessionStorage.getItem('correctAnswers') || '0', 10);
            sessionStorage.setItem('correctAnswers', correctAnswers + 1);
        } else {
            selectedAnswer.parentElement.style.backgroundColor = "red";
            if (respostaCorreta) {
                respostaCorreta.parentElement.style.backgroundColor = "green";
            } else {
                console.error('Resposta correta não encontrada.');
            }
        }
        sessionStorage.setItem(pergunta, selectedAnswer.value);

        // Atualiza o índice da pergunta respondida
        let currentQuestionIndex = parseInt(sessionStorage.getItem('currentQuestionIndex'), 10) || 0; 
        currentQuestionIndex++; 
        sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex);

        // Atualiza a barra de progresso
        updateProgressBar();

        setTimeout(() => {
            nextQuestion();
        }, 1000);
    } else {
        alert('Por favor, selecione uma resposta antes de enviar.');
    }
}

// Avança para a próxima pergunta ou exibe a página de feedback
function nextQuestion() {
    const questionsOrder = JSON.parse(sessionStorage.getItem('questionsOrder')) || [];
    let currentQuestionIndex = parseInt(sessionStorage.getItem('currentQuestionIndex'), 10); 

    if (currentQuestionIndex < questionsOrder.length) {
        window.location.href = questionsOrder[currentQuestionIndex];
    } else {
        window.location.href = 'feedback_aluno.html';
        sessionStorage.clear(); // Limpar dados do quiz
    }
    console.log('Indo para a próxima pergunta:', currentQuestionIndex);
}

// Atualiza a barra de progresso ao carregar a página
document.addEventListener("DOMContentLoaded", updateProgressBar);
console.log('DOMContentLoaded event listener adicionado');
