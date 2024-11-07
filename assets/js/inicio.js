document.addEventListener("DOMContentLoaded", () => {
    let userLogado = JSON.parse(localStorage.getItem("userLogado"));

    if (!userLogado) {
        alert("Você precisa estar logado para acessar essa página");
        window.location.href = "./entrar.html";
    } 
    
    function carregarServicos() {
        let listaServicos = JSON.parse(localStorage.getItem('listaServicos') || '[]');
        const servicosContainer = document.querySelector('.services');
        listaServicos.forEach(servico => {
    
            const card = document.createElement('div');
            card.classList.add('service-card');

            card.onclick = () => {}

            const content = document.createElement('div');
            content.classList.add('service-content');

            const titulo = document.createElement('h3');
            titulo.textContent = servico.descricao;

            const localizacao = document.createElement('span');
            localizacao.classList.add('location');
            localizacao.innerHTML = `<i class="fas fa-map-marker-alt"></i>${servico.localizacao}`;


            content.appendChild(titulo);
            content.appendChild(localizacao);
            card.appendChild(content);

            if (servico.imagens && servico.imagens.length > 0) {
                const img = document.createElement('img');
                img.src = servico.imagens[0]; 
                img.classList.add('service-icon');
                card.appendChild(img);
            }

            servicosContainer.appendChild(card);
        });
    }

    carregarServicos();

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




function sair() {
    localStorage.removeItem("token");
    localStorage.removeItem("userLogado");
    window.location.href = "./entrar.html";
}
