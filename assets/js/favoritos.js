document.addEventListener("DOMContentLoaded", () => {
    const favoritesList = document.getElementById('favorites-list');

    function buscarServicoPorId(id) {
        const listaServicos = JSON.parse(localStorage.getItem('favorites')) || [];
        return listaServicos.find(servico => servico.id === id);
    }

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.map(item => {
        const servico = buscarServicoPorId(item?.id);
        if (servico) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${servico.slug}">${servico.name}</a>`;
            favoritesList.appendChild(li);
        }
    });
});
