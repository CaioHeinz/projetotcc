
commentForm.addEventListener('submit', (event) => {

  const newComment = document.getElementById('new-comment').value;
  
  event.preventDefault();

  console.log(newComment, 'commentText')
  localStorage.setItem('comentario', newComment)

  console.log('Comentário enviado:', newComment);
  newComment.value = '';

});