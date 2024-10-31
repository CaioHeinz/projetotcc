let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

function entrar() {
  let usuario = document.querySelector('#usuario');
  let userLabel = document.querySelector('#userLabel');
  
  let senha = document.querySelector('#senha');
  let senhaLabel = document.querySelector('#senhaLabel');
  
  let msgError = document.querySelector('#msgError');
  let listaUser = [];
  
  let userValid = {
    nome: null,
    user: null,
    senha: null,
    email: null 
  };
  
  listaUser = JSON.parse(localStorage.getItem('listaUser'));

  listaUser?.forEach((item) => {
    if (usuario.value == item.userCad && senha.value == item.senhaCad) {
      userValid = {
        nome: item.nomeCad,
        user: item.userCad,
        senha: item.senhaCad,
        email: item.emailCad,
        telefone: item.telefoneCad,
        nomeEmpresa: item.nomeEmpresaCad, 
      };
    }
  });

  if (usuario.value == userValid.user && senha.value == userValid.senha) {
    let redirecionarPara = userValid.email ? '../html/telaPrestador.html' : '../html/inicio.html'; // Tela do prestador se tem email
    window.location.href = redirecionarPara;
    
    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;
    
    localStorage.setItem('token', token);
    localStorage.setItem('userLogado', JSON.stringify(userValid));
  } else {
    userLabel.setAttribute('style', 'color: red');
    usuario.setAttribute('style', 'border-color: red');
    senhaLabel.setAttribute('style', 'color: red');
    senha.setAttribute('style', 'border-color: red');
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = 'Usuário ou senha incorretos';
    usuario.focus();
  }
}
