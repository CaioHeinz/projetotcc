document.addEventListener("DOMContentLoaded", function () {
    const favoriteButton = document.getElementById("favorite-button");
    const favoriteIcon = document.getElementById("favorite-icon");
    const productId = "comidas_de_mae"; // Use um identificador único para cada produto

    // Verifica se o produto já está favoritado
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(productId)) {
        favoriteIcon.style.color = "red"; // Muda a cor do ícone se já estiver favoritado
    }

    // Adiciona evento de clique no botão de favoritar
    favoriteButton.addEventListener("click", function () {
        if (favorites.includes(productId)) {
            // Se já está favoritado, remove da lista
            const index = favorites.indexOf(productId);
            if (index > -1) {
                favorites.splice(index, 1);
            }
            favoriteIcon.style.color = "gray"; // Volta a cor do ícone
        } else {
            // Se não está favoritado, adiciona à lista
            favorites.push(productId);
            favoriteIcon.style.color = "red"; // Muda a cor do ícone para indicar que foi favoritado
        }
        // Atualiza o localStorage
        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
});
