document.getElementById('formCriarServico').addEventListener('submit', function (e) { 
  e.preventDefault();

  let descricaoServico = document.getElementById('textAreaServico').value;
  const inputNomeEmpresa = document.getElementById('textAreaNomeEmpresa');
  const inputTelefone = document.getElementById('textAreaTelefone');
  const inputEmail = document.getElementById('textAreaEmail');
  const inputLocalizacao = document.getElementById('textAreaLocalizacao');
  const foto = document.getElementById('docpicker');
  

  if (!descricaoServico.trim()) {
      document.getElementById('msgError').innerHTML = '<strong>Por favor, insira a descrição do serviço.</strong>';
      document.getElementById('msgError').style.display = 'block';
      return;
  }

  let servico = {
      descricao: descricaoServico,
      name: inputNomeEmpresa.value,
      telefone: inputTelefone.value,
      email: inputEmail.value,
      localizacao: inputLocalizacao.value,
      imagens: [] // Inicializa um array para armazenar a imagem
  };

  // Verifica se há um arquivo e lê o conteúdo
  if (foto.files && foto.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
          servico.imagens.push(e.target.result); // Adiciona o base64 da imagem ao objeto `servico`
          salvarServicoEAdicionarCard(servico); 
      };
      reader.readAsDataURL(foto.files[0]); // Lê a imagem como base64
  } else {
      // Caso não tenha imagem, apenas salva o serviço sem a imagem
      salvarServicoEAdicionarCard(servico);
  }

  // Limpa os campos após o envio
  document.getElementById('textAreaServico').value = '';
  inputNomeEmpresa.value = '';
  inputTelefone.value = '';
  inputEmail.value = '';
  foto.value = ''; // Limpa o campo de arquivo
});

function salvarServicoEAdicionarCard(servico) {


  let listaServicos = JSON.parse(localStorage.getItem('listaServicos') || '[]');
  listaServicos.push(servico);
  localStorage.setItem('listaServicos', JSON.stringify(listaServicos));

  document.getElementById('msgSuccess').innerHTML = '<strong>Serviço criado com sucesso!</strong>';
  document.getElementById('msgError').style.display = 'none';

  criarServiceCard(servico);
}

function criarServiceCard(servico) {
  const servicosContainer = document.querySelector('.services');

  servicosContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('service-card');
  card.setAttribute('onclick', "window.location.href='#'");

  const content = document.createElement('div');
  content.classList.add('service-content');

  const titulo = document.createElement('h3');
  titulo.textContent = servico.descricao;

  const localizacao = document.createElement('span');
  localizacao.classList.add('location');
  localizacao.innerHTML = '<i class="fas fa-map-marker-alt"></i>';

  content.appendChild(titulo);
  content.appendChild(localizacao);
  card.appendChild(content);

  servicosContainer.appendChild(card);
}

document.addEventListener("DOMContentLoaded", () => {

  const userLogado = JSON.parse(localStorage.getItem('userLogado'))

  const inputNomeEmpresa = document.getElementById('textAreaNomeEmpresa');
  const inputTelefone = document.getElementById('textAreaTelefone');
  const inputEmail = document.getElementById('textAreaEmail');
  
  inputNomeEmpresa.value = userLogado?.nomeEmpresa
  inputTelefone.value = userLogado?.telefone
  inputEmail.value = userLogado?.email

  criarServiceCard()

});
