document.addEventListener("DOMContentLoaded", () => {
    let userLogado = JSON.parse(localStorage.getItem("userLogado"));

    if (!userLogado) {
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "./entrar.html";
    } else {
        document.querySelector("#logado").innerHTML = `Olá, ${userLogado.nome}`;
    }

    // Função para carregar os serviços salvos e exibi-los na página
    function carregarServicos() {
        let listaServicos = JSON.parse(localStorage.getItem('listaServicos') || '[]');
        const servicosContainer = document.querySelector('.services'); // Container onde os serviços serão exibidos

        listaServicos.forEach(servico => {
            // Criar o card de serviço
            const card = document.createElement('div');
            card.classList.add('service-card');

            // Criar conteúdo do card
            const content = document.createElement('div');
            content.classList.add('service-content');

            const titulo = document.createElement('h3');
            titulo.textContent = servico.descricao;

            const localizacao = document.createElement('span');
            localizacao.classList.add('location');
            localizacao.innerHTML = '<i class="fas fa-map-marker-alt"></i> Localização não especificada';

            content.appendChild(titulo);
            content.appendChild(localizacao);
            card.appendChild(content);

            // Se houver imagens, adiciona as imagens
            if (servico.imagens && servico.imagens.length > 0) {
                const img = document.createElement('img');
                img.src = servico.imagens[0]; // Usando a primeira imagem
                img.classList.add('service-icon');
                card.appendChild(img);
            }

            // Adiciona o card ao container de serviços
            servicosContainer.appendChild(card);
        });
    }

    // Chama a função de carregar os serviços ao carregar a página
    carregarServicos();

    // Função para pesquisar serviços
    function pesquisarServicos() {
        const input = document.querySelector('#search-input'); 
        const filtro = input.value.toLowerCase();
        const cards = document.querySelectorAll('.service-card'); 
        cards.forEach(card => {
            const titulo = card.querySelector('h3').textContent.toLowerCase(); 
            if (titulo.includes(filtro)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    document.querySelector('#search-input').addEventListener('input', pesquisarServicos);

    const searchForm = document.querySelector('#search-form');
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        pesquisarServicos(); 
    });
});


document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const newComment = document.getElementById('newComment').value;

    let userLogado = JSON.parse(localStorage.getItem("userLogado"));

    if (newComment.trim() !== "") {
        const reviewSection = document.querySelector('.reviews');
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `<p><strong>${userLogado?.nome}:</strong> "${newComment}"</p>`;

        reviewSection.appendChild(newReview);

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
