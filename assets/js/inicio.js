document.addEventListener("DOMContentLoaded", () => {
    let userLogado = JSON.parse(localStorage.getItem("userLogado"));

    if (!userLogado) {
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "./entrar.html";
    } else {
        document.querySelector("#logado").innerHTML = `Olá, ${userLogado.nome}`;
    }
});

document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita o recarregamento da página

    // Obtém o valor do campo de texto
    const newComment = document.getElementById('newComment').value;

    let userLogado = JSON.parse(localStorage.getItem("userLogado"));

    // Verifica se o comentário não está vazio
    if (newComment.trim() !== "") {
        // Cria um novo elemento de comentário
        const reviewSection = document.querySelector('.reviews');
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `<p><strong>${userLogado?.nome}:</strong> "${newComment}"</p>`;

        // Adiciona o novo comentário antes do campo de adicionar comentários
        reviewSection.appendChild(newReview);

        // Limpa o campo de texto
        document.getElementById('newComment').value = "";
    } else {
        alert("Por favor, insira um comentário.");
    }
});

function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "./entrar.html";
}