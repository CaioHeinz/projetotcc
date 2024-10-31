document.addEventListener("DOMContentLoaded", () => {

    const userLogado = JSON.parse(localStorage.getItem('userLogado'))

    const inputNomeEmpresa = document.getElementById('textAreaNomeEmpresa');
    const inputTelefone = document.getElementById('textAreaTelefone');
    const inputEmail = document.getElementById('textAreaEmail');

    console.log(userLogado, 'user logado')

    inputNomeEmpresa.value = userLogado?.nomeEmpresa
    inputTelefone.value = userLogado?.telefone
    inputEmail.value = userLogado?.email
  
});


document.getElementById('formCriarServico').addEventListener('submit', function (e) {
  e.preventDefault();

  // Obtém a descrição do serviço
  let descricaoServico = document.getElementById('textAreaServico').value;
  const inputNomeEmpresa = document.getElementById('textAreaNomeEmpresa');
  const inputTelefone = document.getElementById('textAreaTelefone');
  const inputEmail = document.getElementById('textAreaEmail');

  if (!descricaoServico.trim()) {
      document.getElementById('msgError').innerHTML = '<strong>Por favor, insira a descrição do serviço.</strong>';
      document.getElementById('msgError').style.display = 'block';
      return;
  }

  // Cria o objeto do serviço sem a necessidade de imagem
  let servico = {
      descricao: descricaoServico,
      name: inputNomeEmpresa.value,
      telefone: inputTelefone.value,
      email: inputEmail.value
  };

  // Salva o serviço no localStorage e cria o card dinamicamente
  salvarServicoEAdicionarCard(servico);

  // Limpa os campos do formulário
  document.getElementById('textAreaServico').value = '';
});

// Função para salvar o serviço no localStorage e criar o card dinamicamente
function salvarServicoEAdicionarCard(servico) {



  let listaServicos = JSON.parse(localStorage.getItem('listaServicos') || '[]');
  listaServicos.push(servico);
  localStorage.setItem('listaServicos', JSON.stringify(listaServicos));

  // Exibe a mensagem de sucesso
  document.getElementById('msgSuccess').innerHTML = '<strong>Serviço criado com sucesso!</strong>';
  document.getElementById('msgError').style.display = 'none';

  // Cria o card dinamicamente
  criarServiceCard(servico);
}

// Função para criar dinamicamente um card de serviço
function criarServiceCard(servico) {
  const servicosContainer = document.querySelector('.services');

  // Limpa todos os cards existentes no container
  servicosContainer.innerHTML = '';

  // Cria a div principal do card
  const card = document.createElement('div');
  card.classList.add('service-card');
  card.setAttribute('onclick', "window.location.href='#'");

  // Cria o conteúdo do card
  const content = document.createElement('div');
  content.classList.add('service-content');

  const titulo = document.createElement('h3');
  titulo.textContent = servico.descricao;

  const localizacao = document.createElement('span');
  localizacao.classList.add('location');
  localizacao.innerHTML = '<i class="fas fa-map-marker-alt"></i> Localização não especificada'; // Personalize a localização

  content.appendChild(titulo);
  content.appendChild(localizacao);
  card.appendChild(content);

  // Adiciona o card ao container
  servicosContainer.appendChild(card);
}
