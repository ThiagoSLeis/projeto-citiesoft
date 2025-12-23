// Dados iniciais - APENAS UMA PERGUNTA BÁSICA
let faqs = [
    { 
        id: 1,
        question: "Como adicionar uma nova pergunta?", 
        answer: "Clique no botão '+' no canto inferior direito da tela. Preencha o formulário com sua pergunta e resposta, então clique em 'Salvar'. Sua nova pergunta aparecerá automaticamente na lista." 
    }
];

// Estado da aplicação
let searchTerm = '';
let nextId = 2; // Para os próximos IDs

// Elementos DOM
const elements = {
    faqContainer: document.getElementById('faq'),
    emptyState: document.getElementById('emptyState'),
    emptyText: document.getElementById('emptyText'),
    addFirstBtn: document.getElementById('addFirstBtn'),
    searchInput: document.getElementById('search'),
    searchHint: document.getElementById('searchHint'),
    addBtn: document.getElementById('addBtn'),
    modal: document.getElementById('modal'),
    newQuestion: document.getElementById('newQuestion'),
    newAnswer: document.getElementById('newAnswer'),
    saveBtn: document.getElementById('saveBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    closeModal: document.getElementById('closeModal')
};

// Renderizar FAQ
function renderFAQ() {
    // Filtrar FAQs baseado na busca
    const filteredFAQs = searchTerm 
        ? faqs.filter(f => 
            f.question.toLowerCase().includes(searchTerm) ||
            f.answer.toLowerCase().includes(searchTerm)
        )
        : faqs;

    // Mostrar/ocultar estado vazio
    if (filteredFAQs.length === 0) {
        elements.faqContainer.style.display = 'none';
        elements.emptyState.style.display = 'block';
        
        if (searchTerm) {
            elements.emptyText.textContent = `Não encontramos resultados para "${searchTerm}".`;
        } else {
            elements.emptyText.textContent = 'Ainda não há perguntas cadastradas. Clique no botão "+" para adicionar a primeira.';
        }
    } else {
        elements.faqContainer.style.display = 'block';
        elements.emptyState.style.display = 'none';
        renderFAQItems(filteredFAQs);
    }
    
    // Atualizar hint da busca
    updateSearchHint(filteredFAQs.length);
}

// Renderizar itens da FAQ
function renderFAQItems(faqsToRender) {
    elements.faqContainer.innerHTML = '';
    
    faqsToRender.forEach(faq => {
        const faqItem = createFAQElement(faq);
        elements.faqContainer.appendChild(faqItem);
    });
    
    // Destacar termos da busca
    if (searchTerm) {
        highlightSearchTerms();
    }
}

// Criar elemento FAQ
function createFAQElement(faq) {
    const div = document.createElement('div');
    div.className = `faq-item ${faq.isNew ? 'new' : ''}`;
    div.dataset.id = faq.id;
    
    div.innerHTML = `
        <button class="question">
            <div class="question-text">${escapeHTML(faq.question)}</div>
            <div class="question-icon">
                <i class="fas fa-plus"></i>
            </div>
        </button>
        <div class="answer">${escapeHTML(faq.answer)}</div>
    `;
    
    // Adicionar evento de clique
    const questionBtn = div.querySelector('.question');
    questionBtn.addEventListener('click', () => toggleFAQ(div));
    
    // Remover flag "new" após animação
    if (faq.isNew) {
        setTimeout(() => {
            faq.isNew = false;
            div.classList.remove('new');
        }, 2000);
    }
    
    return div;
}

// Alternar FAQ (abrir/fechar)
function toggleFAQ(faqElement) {
    const isActive = faqElement.classList.contains('active');
    
    // Fechar todos os outros FAQs
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqElement) {
            item.classList.remove('active');
        }
    });
    
    // Alternar estado atual
    if (!isActive) {
        faqElement.classList.add('active');
    } else {
        faqElement.classList.remove('active');
    }
}

// Destacar termos da busca
function highlightSearchTerms() {
    if (!searchTerm) return;
    
    const searchRegex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    
    // Destacar nas perguntas
    document.querySelectorAll('.question-text').forEach(element => {
        const originalText = element.dataset.originalText || element.textContent;
        element.dataset.originalText = originalText;
        
        const highlighted = originalText.replace(
            searchRegex, 
            '<span class="highlight">$1</span>'
        );
        element.innerHTML = highlighted;
    });
    
    // Destacar nas respostas
    document.querySelectorAll('.answer').forEach(element => {
        const originalText = element.dataset.originalText || element.textContent;
        element.dataset.originalText = originalText;
        
        const highlighted = originalText.replace(
            searchRegex, 
            '<span class="highlight">$1</span>'
        );
        element.innerHTML = highlighted;
    });
}

// Atualizar hint da busca
function updateSearchHint(resultCount) {
    if (searchTerm) {
        elements.searchHint.textContent = `${resultCount} resultado${resultCount !== 1 ? 's' : ''}`;
        elements.searchHint.style.display = 'block';
    } else {
        elements.searchHint.style.display = 'none';
    }
}

// Adicionar nova FAQ
function addFAQ() {
    const question = elements.newQuestion.value.trim();
    const answer = elements.newAnswer.value.trim();
    
    if (!question || !answer) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Criar nova FAQ
    const newFAQ = {
        id: nextId++,
        question: question,
        answer: answer,
        isNew: true
    };
    
    // Adicionar no início
    faqs.unshift(newFAQ);
    
    // Limpar formulário
    elements.newQuestion.value = '';
    elements.newAnswer.value = '';
    
    // Fechar modal
    closeModal();
    
    // Limpar busca
    elements.searchInput.value = '';
    searchTerm = '';
    
    // Renderizar
    renderFAQ();
    
    // Mostrar mensagem
    alert('Pergunta adicionada com sucesso!');
    
    // Rolar para o topo e abrir nova FAQ
    setTimeout(() => {
        const newFaqElement = document.querySelector('.faq-item[data-id="' + newFAQ.id + '"]');
        if (newFaqElement) {
            newFaqElement.classList.add('active');
            newFaqElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
}

// Abrir modal
function openModal() {
    elements.modal.style.display = 'flex';
    elements.newQuestion.focus();
}

// Fechar modal
function closeModal() {
    elements.modal.style.display = 'none';
}

// Utilitários
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Inicializar aplicação
function init() {
    // Renderizar FAQs iniciais
    renderFAQ();
    
    // Eventos de busca
    let searchTimeout;
    elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchTerm = e.target.value.toLowerCase();
            renderFAQ();
        }, 300);
    });
    
    // Eventos dos botões
    elements.addBtn.addEventListener('click', openModal);
    elements.addFirstBtn.addEventListener('click', openModal);
    elements.saveBtn.addEventListener('click', addFAQ);
    elements.cancelBtn.addEventListener('click', closeModal);
    elements.closeModal.addEventListener('click', closeModal);
    
    // Fechar modal com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Fechar modal clicando fora
    elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) {
            closeModal();
        }
    });
    
    // Fechar FAQs ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.faq-item')) {
            document.querySelectorAll('.faq-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

// Iniciar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', init);