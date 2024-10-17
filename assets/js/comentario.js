const commentForm = document.getElementById('comment-form');
const newComment = document.getElementById('newComment');

commentForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém o valor do comentário
  const commentText = newComment.value;

  localStorage.setItem('comentario', commentText)

  console.log('Comentário enviado:', commentText);
  // Limpa o campo de texto
  newComment.value = '';

});