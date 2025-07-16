/*
  Projeto: JavaScript responsável pelas animações 
  Autor: Bruno dos Santos Carvalho
  GitHub: https://github.com/bnocrv
  Contato: bnocrv@proton.me
  Criação: 06/07/2025
  Última Atualização: 16/07/2025
  Mudanças: Adicionado footer e correção no carrossel dos itens
  Licença: MIT
  Versão 1.0
*/


// ======================= VARIÁVEIS GLOBAIS =======================

// Botões de navegação do carrossel
let prevButton = document.getElementById('prev');     // Botão de voltar (esquerda)
let nextButton = document.getElementById('next');     // Botão de avançar (direita)

// Container principal (seção inteira) e itens do carrossel
let container = document.querySelector('.container');         // Seção onde está o carrossel
let items = container.querySelectorAll('.list .item');        // Todos os itens (doces) no carrossel

// Elementos dos indicadores (bolinhas e número)
let indicator = document.querySelector('.indicators');        // Div que contém número + bolinhas
let dots = indicator.querySelectorAll('ul li');               // Lista de bolinhas
let list = container.querySelector('.list');                  // Lista que agrupa os slides

// Índice atual visível (começa no 0 = primeiro slide)
let active = 0;

// Último índice possível (quantidade de itens - 1)
let lastPosition = items.length - 1;

// ======================= FUNÇÃO DE TROCA DE SLIDE =======================

/**
 * Atualiza o carrossel para mostrar um novo slide
 * @param {number} newIndex - Índice do slide desejado (0, 1, 2...)
 * @param {string} direction - 'left' ou 'right' (define direção da transição)
 */
function updateSlide(newIndex, direction) {
  // Remove a classe "active" do slide atual
  items[active].classList.remove('active');

  // Adiciona a classe "active" ao novo slide
  items[newIndex].classList.add('active');

  // Atualiza os indicadores (bolinhas)
  dots[active].classList.remove('active');      // Remove o destaque do antigo
  dots[newIndex].classList.add('active');       // Destaca o novo slide

  // Atualiza o número exibido (01, 02, 03)
  indicator.querySelector('.number').textContent = '0' + (newIndex + 1);

  // Atualiza o índice atual
  active = newIndex;
}

// ======================= BOTÃO "PRÓXIMO" =======================

nextButton.onclick = () => {
  // Se estiver no último, volta para o primeiro
  let nextIndex = active + 1 > lastPosition ? 0 : active + 1;

  // Atualiza o slide com direção "direita"
  updateSlide(nextIndex, 'right');
};

// ======================= BOTÃO "ANTERIOR" =======================

prevButton.onclick = () => {
  // Se estiver no primeiro, volta para o último
  let prevIndex = active - 1 < 0 ? lastPosition : active - 1;

  // Atualiza o slide com direção "esquerda"
  updateSlide(prevIndex, 'left');
};

// ======================= MODAIS - SAIBA MAIS =======================

/**
 * Captura todos os botões "Saiba Mais" visíveis nos produtos
 */
let buttons = document.querySelectorAll('.information');

/**
 * Para cada botão, adiciona o evento de abrir o modal correspondente
 */
buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    openModal(index);
  });
});

/**
 * Função que cria e exibe um modal com os dados do produto clicado
 * @param {number} index - Índice do item no carrossel
 */
function openModal(index) {
  // Cria o elemento do modal
  const modal = document.createElement('div');     // Cria uma div
  modal.classList.add('modal');                    // Adiciona a classe "modal"

  // Pega o título e descrição do produto
  const title = items[index].querySelector('h2').textContent;
  const description = items[index].querySelector('.description').textContent;

  // Conteúdo interno do modal (HTML)
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;

  // Adiciona o modal na página
  document.body.appendChild(modal);

  // Torna o modal visível com display: flex
  modal.style.display = 'flex';

  // Evento para fechar o modal ao clicar no X
  modal.querySelector('.close').onclick = () => {
    closeModal(modal);
  };

  // Evento para fechar o modal ao clicar fora da caixa de conteúdo
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  };
}

/**
 * Função que fecha e remove o modal da tela
 * @param {HTMLElement} modal - Modal a ser removido
 */
function closeModal(modal) {
  modal.style.display = 'none';   // Esconde
  modal.remove();                 // Remove da estrutura da página
}
