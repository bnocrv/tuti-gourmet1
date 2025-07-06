// ---------------------- VARIÁVEIS GLOBAIS ----------------------

// Botões de navegação do carrossel
let prevButton = document.getElementById('prev');
let nextButton = document.getElementById('next');

// Container principal e itens do carrossel
let container = document.querySelector('.container');
let items = container.querySelectorAll('.list .item');

// Indicadores (bolinhas e número)
let indicator = document.querySelector('.indicators');
let dots = indicator.querySelectorAll('ul li');
let list = container.querySelector('.list');

// Controle do índice ativo (item que está visível)
let active = 0;

// Último índice possível (último item do carrossel)
let lastPosition = items.length - 1;

// ---------------------- FUNÇÃO PARA ATUALIZAR SLIDE ----------------------

/**
 * Atualiza o carrossel para mostrar o slide de índice newIndex.
 * Aplica a direção para animação visual (slide para esquerda ou direita).
 * @param {number} newIndex - Índice do novo slide a ser exibido.
 * @param {string} direction - 'left' ou 'right', para direção da animação.
 */
function updateSlide(newIndex, direction) {
    // Remove as classes da imagem e conteúdo do slide atualmente ativo
    let currentItem = items[active];
    currentItem.classList.remove('active');
    currentItem.classList.remove('to-left');
    currentItem.classList.remove('to-right');

    // Remove classes de direção do novo slide para "resetar"
    let newItem = items[newIndex];
    newItem.classList.remove('to-left');
    newItem.classList.remove('to-right');

    // Aplica a direção da animação ao novo slide
    if (direction === 'right') {
        newItem.classList.add('to-right');
    } else {
        newItem.classList.add('to-left');
    }

    // Força reflow para garantir que a animação aconteça corretamente
    void newItem.offsetWidth;

    // Ativa o novo slide (torna visível)
    newItem.classList.add('active');

    // Atualiza o indicador visual (bolinha e número)
    indicator.querySelector('ul li.active').classList.remove('active');
    dots[newIndex].classList.add('active');
    indicator.querySelector('.number').innerHTML = '0' + (newIndex + 1);

    // Atualiza o índice ativo para o novo slide
    active = newIndex;
}

// ---------------------- CONTROLES DOS BOTÕES ----------------------

// Clique no botão "Próximo"
nextButton.onclick = () => {
    // Calcula o próximo índice (loopando para o início se chegar no fim)
    let newIndex = active + 1 > lastPosition ? 0 : active + 1;

    // Atualiza o slide para o próximo com animação para a direita
    updateSlide(newIndex, 'right');
};

// Clique no botão "Anterior"
prevButton.onclick = () => {
    // Calcula o índice anterior (loopando para o último se chegar no início)
    let newIndex = active - 1 < 0 ? lastPosition : active - 1;

    // Atualiza o slide para o anterior com animação para a esquerda
    updateSlide(newIndex, 'left');
};

// ---------------------- MODAIS - JANELAS FLUTUANTES ----------------------

/*
Aqui criamos uma função para abrir e fechar os modais correspondentes a cada item
com a descrição detalhada, que aparece quando clicamos no botão "Saiba Mais".
*/

// Pega todos os botões "Saiba Mais" dos itens
let buttons = document.querySelectorAll('.information');

// Para cada botão, adicionamos o evento de abrir o modal correto
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        openModal(index);
    });
});

/**
 * Função para abrir o modal e mostrar a descrição do item correspondente.
 * @param {number} index - Índice do item no carrossel.
 */
function openModal(index) {
    // Cria o elemento do modal dinamicamente
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Conteúdo do modal
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <h3>${items[index].querySelector('h2').textContent}</h3>
        <p>${items[index].querySelector('.description').textContent}</p>
      </div>
    `;

    // Adiciona o modal ao body para ficar visível
    document.body.appendChild(modal);

    // Exibe o modal com flexbox (visível)
    modal.style.display = 'flex';

    // Evento para fechar modal ao clicar no "X"
    modal.querySelector('.close').onclick = () => {
        closeModal(modal);
    };

    // Fecha modal ao clicar fora do conteúdo (na área escura)
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    };
}

/**
 * Remove o modal da tela
 * @param {HTMLElement} modal - Elemento modal a ser removido
 */
function closeModal(modal) {
    modal.style.display = 'none';
    modal.remove();
}
