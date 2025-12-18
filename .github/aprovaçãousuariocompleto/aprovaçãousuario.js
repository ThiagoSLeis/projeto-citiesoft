// ===== DADOS DE EXEMPLO =====
const users = [
    {
        id: 1,
        name: "Carlos Silva",
        email: "carlos.silva@empresa.com",
        department: "TI",
        role: "Analista de Sistemas",
        phone: "(11) 98765-4321",
        requestDate: "2025-01-15",
        status: "pending",
        avatarInitials: "CS",
        justification: "Necessário acesso ao sistema de tickets para suporte técnico.",
        document: "RG: 12.345.678-9, CPF: 123.456.789-00"
    },
    {
        id: 2,
        name: "Maria Santos",
        email: "maria.santos@empresa.com",
        department: "RH",
        role: "Recrutadora",
        phone: "(11) 91234-5678",
        requestDate: "2025-01-14",
        status: "approved",
        avatarInitials: "MS",
        justification: "Acesso necessário para cadastro de novos funcionários.",
        document: "RG: 98.765.432-1, CPF: 987.654.321-00"
    },
    {
        id: 3,
        name: "João Oliveira",
        email: "joao.oliveira@empresa.com",
        department: "Financeiro",
        role: "Contador",
        phone: "(11) 99876-5432",
        requestDate: "2025-01-13",
        status: "rejected",
        avatarInitials: "JO",
        justification: "Acesso para análise de relatórios financeiros.",
        document: "RG: 45.678.912-3, CPF: 456.789.123-00"
    },
    {
        id: 4,
        name: "Ana Costa",
        email: "ana.costa@empresa.com",
        department: "Marketing",
        role: "Gerente",
        phone: "(11) 97654-3210",
        requestDate: "2025-01-12",
        status: "pending",
        avatarInitials: "AC",
        justification: "Acesso para campanhas de marketing e análise de dados.",
        document: "RG: 23.456.789-0, CPF: 234.567.890-00"
    },
    {
        id: 5,
        name: "Pedro Almeida",
        email: "pedro.almeida@empresa.com",
        department: "Vendas",
        role: "Vendedor Sênior",
        phone: "(11) 96543-2109",
        requestDate: "2025-01-11",
        status: "approved",
        avatarInitials: "PA",
        justification: "Acesso ao CRM para gerenciamento de clientes.",
        document: "RG: 34.567.890-1, CPF: 345.678.901-00"
    },
    {
        id: 6,
        name: "Juliana Lima",
        email: "juliana.lima@empresa.com",
        department: "Operações",
        role: "Coordenadora",
        phone: "(11) 95432-1098",
        requestDate: "2025-01-10",
        status: "pending",
        avatarInitials: "JL",
        justification: "Acesso necessário para gestão de operações.",
        document: "RG: 56.789.012-3, CPF: 567.890.123-00"
    },
    {
        id: 7,
        name: "Roberto Santos",
        email: "roberto.santos@empresa.com",
        department: "TI",
        role: "Desenvolvedor",
        phone: "(11) 94321-0987",
        requestDate: "2025-01-09",
        status: "approved",
        avatarInitials: "RS",
        justification: "Acesso ao sistema para desenvolvimento de novas features.",
        document: "RG: 67.890.123-4, CPF: 678.901.234-00"
    },
    {
        id: 8,
        name: "Fernanda Oliveira",
        email: "fernanda.oliveira@empresa.com",
        department: "RH",
        role: "Analista",
        phone: "(11) 93210-9876",
        requestDate: "2025-01-08",
        status: "rejected",
        avatarInitials: "FO",
        justification: "Acesso para análise de desempenho de funcionários.",
        document: "RG: 78.901.234-5, CPF: 789.012.345-00"
    },
    {
        id: 9,
        name: "Marcos Souza",
        email: "marcos.souza@empresa.com",
        department: "Financeiro",
        role: "Analista Financeiro",
        phone: "(11) 92109-8765",
        requestDate: "2025-01-07",
        status: "pending",
        avatarInitials: "MS",
        justification: "Acesso para relatórios financeiros e controle de orçamento.",
        document: "RG: 89.012.345-6, CPF: 890.123.456-00"
    },
    {
        id: 10,
        name: "Patrícia Alves",
        email: "patricia.alves@empresa.com",
        department: "Marketing",
        role: "Designer",
        phone: "(11) 91098-7654",
        requestDate: "2025-01-06",
        status: "approved",
        avatarInitials: "PA",
        justification: "Acesso para criação de materiais de marketing.",
        document: "RG: 90.123.456-7, CPF: 901.234.567-00"
    }
];

// ===== ESTADO DA APLICAÇÃO =====
let currentFilter = 'all';
let currentSearch = '';
let currentStatus = 'all';
let currentPage = 1;
const itemsPerPage = 5;

// Data de referência para os filtros (2025-01-15)
const referenceDate = new Date('2025-01-15');

// ===== ELEMENTOS DOM =====
const usersTableBody = document.getElementById('usersTableBody');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('userModal');
const closeModalBtn = document.getElementById('closeModal');
const toastContainer = document.getElementById('toastContainer');
const refreshBtn = document.getElementById('refreshBtn');

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== APROVAÇÃO DE USUÁRIOS - INICIANDO ===');
    
    // Carregar dados iniciais
    renderUsersTable();
    updateStats();
    setupEventListeners();
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        showToast('Sistema de aprovação carregado com sucesso!', 'success');
    }, 1000);
});

// ===== CONFIGURAR EVENT LISTENERS =====
function setupEventListeners() {
    // Busca em tempo real
    searchInput.addEventListener('input', debounce((e) => {
        currentSearch = e.target.value.toLowerCase();
        currentPage = 1;
        renderUsersTable();
    }, 300));

    // Filtro de status
    statusFilter.addEventListener('change', (e) => {
        currentStatus = e.target.value;
        currentPage = 1;
        renderUsersTable();
    });

    // Filtros por data
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            currentPage = 1;
            renderUsersTable();
        });
    });

    // Fechar modal
    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    // Fechar modal clicando fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Botão de refresh
    refreshBtn.addEventListener('click', () => {
        refreshData();
    });

    // Tecla ESC para fechar modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===== DEBOUNCE PARA BUSCA =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== FUNÇÕES PRINCIPAIS =====

// Obter usuários filtrados
function getFilteredUsers() {
    return users.filter(user => {
        // Filtro de busca
        const searchMatch = !currentSearch || 
            user.name.toLowerCase().includes(currentSearch) ||
            user.email.toLowerCase().includes(currentSearch) ||
            user.department.toLowerCase().includes(currentSearch) ||
            user.role.toLowerCase().includes(currentSearch);

        // Filtro de status
        const statusMatch = currentStatus === 'all' || user.status === currentStatus;

        // Filtro de data
        let dateMatch = true;
        if (currentFilter !== 'all') {
            const requestDate = new Date(user.requestDate);
            
            switch(currentFilter) {
                case 'today':
                    // Filtrar solicitações do dia de referência (2024-01-15)
                    const todayStr = referenceDate.toISOString().split('T')[0];
                    dateMatch = user.requestDate === todayStr;
                    break;
                case 'week':
                    // Filtrar solicitações dos últimos 7 dias a partir da data de referência
                    const weekAgo = new Date(referenceDate);
                    weekAgo.setDate(referenceDate.getDate() - 7);
                    dateMatch = requestDate >= weekAgo && requestDate <= referenceDate;
                    break;
                case 'month':
                    // Filtrar solicitações dos últimos 30 dias a partir da data de referência
                    const monthAgo = new Date(referenceDate);
                    monthAgo.setMonth(referenceDate.getMonth() - 1);
                    dateMatch = requestDate >= monthAgo && requestDate <= referenceDate;
                    break;
                default:
                    dateMatch = true;
            }
        }

        return searchMatch && statusMatch && dateMatch;
    });
}

// Renderizar tabela de usuários
function renderUsersTable() {
    const filteredUsers = getFilteredUsers();
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    // Garantir que a página atual é válida
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    } else if (totalPages === 0) {
        currentPage = 1;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // Atualizar informações de paginação
    document.getElementById('startItem').textContent = totalItems > 0 ? startIndex + 1 : 0;
    document.getElementById('endItem').textContent = endIndex;
    document.getElementById('totalItems').textContent = totalItems;

    // Limpar tabela
    usersTableBody.innerHTML = '';

    // Se não houver usuários
    if (paginatedUsers.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="6" class="text-center py-5">
                <div class="empty-state">
                    <i class="fas fa-search fa-3x mb-3"></i>
                    <h5 class="text-muted">Nenhum usuário encontrado</h5>
                    <p class="text-muted">Tente ajustar os filtros de busca</p>
                </div>
            </td>
        `;
        usersTableBody.appendChild(row);
        return;
    }

    // Adicionar usuários com animação
    paginatedUsers.forEach((user, index) => {
        const row = document.createElement('tr');
        row.style.animationDelay = `${index * 0.1}s`;
        row.classList.add('fade-in');
        
        let statusText, statusClass;
        switch(user.status) {
            case 'pending':
                statusText = 'Pendente';
                statusClass = 'status-pending';
                break;
            case 'approved':
                statusText = 'Aprovado';
                statusClass = 'status-approved';
                break;
            case 'rejected':
                statusText = 'Rejeitado';
                statusClass = 'status-rejected';
                break;
        }

        row.innerHTML = `
            <td>
                <div class="user-info">
                    <div class="user-avatar">${user.avatarInitials}</div>
                    <div class="user-details">
                        <h6>${user.name}</h6>
                        <p><i class="fas fa-briefcase me-1 text-muted"></i>${user.role}</p>
                    </div>
                </div>
            </td>
            <td><i class="fas fa-envelope me-2 text-muted"></i>${user.email}</td>
            <td><span class="badge">${user.department}</span></td>
            <td><i class="fas fa-calendar me-2 text-muted"></i>${formatDate(user.requestDate)}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-view" onclick="viewUserDetails(${user.id})" title="Ver detalhes">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${user.status === 'pending' ? `
                        <button class="btn-action btn-approve" onclick="approveUser(${user.id})" title="Aprovar">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="btn-action btn-reject" onclick="rejectUser(${user.id})" title="Rejeitar">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                </div>
            </td>
        `;

        usersTableBody.appendChild(row);
    });

    // Atualizar botões de paginação
    updatePaginationButtons(totalItems, totalPages);
}

// Atualizar botões de paginação
function updatePaginationButtons(totalItems, totalPages) {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const paginationContainer = document.querySelector('.pagination');
    
    // Atualizar botões anterior/próximo
    prevBtn.classList.toggle('disabled', currentPage === 1);
    nextBtn.classList.toggle('disabled', currentPage === totalPages || totalPages === 0);
    
    // Configurar eventos dos botões de seta
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderUsersTable();
            scrollToTable();
        }
    };
    
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderUsersTable();
            scrollToTable();
        }
    };
    
    // Limpar números das páginas (exceto os botões de seta)
    const pageButtons = paginationContainer.querySelectorAll('.page-btn:not(#prevPage):not(#nextPage)');
    pageButtons.forEach(btn => btn.remove());
    
    // Limpar elipses
    const ellipses = paginationContainer.querySelectorAll('.page-ellipsis');
    ellipses.forEach(el => el.remove());
    
    // Se não houver páginas, retornar
    if (totalPages === 0) return;
    
    // Configurar visibilidade das páginas
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Adicionar primeira página se necessário
    if (startPage > 1) {
        const firstBtn = createPageButton(1);
        paginationContainer.insertBefore(firstBtn, nextBtn);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'page-ellipsis';
            ellipsis.innerHTML = '...';
            paginationContainer.insertBefore(ellipsis, nextBtn);
        }
    }
    
    // Adicionar páginas visíveis
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i);
        paginationContainer.insertBefore(pageBtn, nextBtn);
    }
    
    // Adicionar última página se necessário
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'page-ellipsis';
            ellipsis.innerHTML = '...';
            paginationContainer.insertBefore(ellipsis, nextBtn);
        }
        
        const lastBtn = createPageButton(totalPages);
        paginationContainer.insertBefore(lastBtn, nextBtn);
    }
}

// Criar botão de página
function createPageButton(pageNumber) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-btn ${pageNumber === currentPage ? 'active' : ''}`;
    pageBtn.textContent = pageNumber;
    pageBtn.onclick = () => {
        currentPage = pageNumber;
        renderUsersTable();
        scrollToTable();
    };
    return pageBtn;
}

// Atualizar estatísticas
function updateStats() {
    const pendingCount = users.filter(u => u.status === 'pending').length;
    const approvedCount = users.filter(u => u.status === 'approved').length;
    const rejectedCount = users.filter(u => u.status === 'rejected').length;
    const totalCount = users.length;

    document.getElementById('pendingCount').textContent = pendingCount;
    document.getElementById('approvedCount').textContent = approvedCount;
    document.getElementById('rejectedCount').textContent = rejectedCount;
    document.getElementById('totalCount').textContent = totalCount;
}

// ===== FUNÇÕES UTILITÁRIAS =====

// Formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Scroll suave para a tabela
function scrollToTable() {
    const tableContainer = document.querySelector('.users-table-container');
    tableContainer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== FUNÇÕES DO MODAL =====

// Ver detalhes do usuário
function viewUserDetails(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) {
        showToast('Usuário não encontrado', 'error');
        return;
    }

    // Configurar conteúdo do modal
    document.getElementById('modalBody').innerHTML = `
        <div class="user-detail-item">
            <div class="user-detail-label">Nome Completo:</div>
            <div class="user-detail-value">${user.name}</div>
        </div>
        <div class="user-detail-item">
            <div class="user-detail-label">Email Corporativo:</div>
            <div class="user-detail-value">${user.email}</div>
        </div>
        <div class="user-detail-item">
            <div class="user-detail-label">Telefone:</div>
            <div class="user-detail-value">${user.phone}</div>
        </div>
        <div class="user-detail-item">
            <div class="user-detail-label">Departamento:</div>
            <div class="user-detail-value">${user.department}</div>
        </div>
        <div class="user-detail-item">
            <div class="user-detail-label">Cargo:</div>
            <div class="user-detail-value">${user.role}</div>
        </div>
        <div class="user-detail-item">
            <div class="user-detail-label">Data da Solicitação:</div>
            <div class="user-detail-value">${formatDate(user.requestDate)}</div>
        </div>
        <div class="user-detail-item">
            <div class="user-detail-label">Justificativa:</div>
            <div class="user-detail-value">${user.justification}</div>
        </div>
        <div class="user-document">
            <strong><i class="fas fa-id-card me-2"></i>Documentos:</strong><br>
            ${user.document}
        </div>
    `;

    // Configurar botões do modal
    const modalFooter = document.getElementById('modalFooter');
    modalFooter.innerHTML = '';

    if (user.status === 'pending') {
        modalFooter.innerHTML = `
            <button class="btn-modal btn-modal-secondary" onclick="closeModal()">
                <i class="fas fa-times me-2"></i>Fechar
            </button>
            <button class="btn-modal btn-modal-danger" onclick="rejectUser(${user.id})">
                <i class="fas fa-times me-2"></i>Rejeitar
            </button>
            <button class="btn-modal btn-modal-success" onclick="approveUser(${user.id})">
                <i class="fas fa-check me-2"></i>Aprovar
            </button>
        `;
    } else {
        modalFooter.innerHTML = `
            <button class="btn-modal btn-modal-primary" onclick="closeModal()">
                <i class="fas fa-times me-2"></i>Fechar
            </button>
        `;
    }

    // Mostrar modal
    modal.classList.add('active');
}

// Fechar modal
function closeModal() {
    modal.classList.remove('active');
}

// ===== FUNÇÕES DE APROVAÇÃO/REJEIÇÃO =====

// Aprovar usuário
function approveUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (confirm(`Deseja aprovar o acesso de ${user.name}?`)) {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users[userIndex].status = 'approved';
            renderUsersTable();
            updateStats();
            closeModal();
            showToast(`Acesso de ${user.name} foi aprovado com sucesso!`, 'success');
        }
    }
}

// Rejeitar usuário
function rejectUser(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    const reason = prompt(`Informe o motivo da rejeição do acesso de ${user.name}:`);
    if (reason !== null) {
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            users[userIndex].status = 'rejected';
            renderUsersTable();
            updateStats();
            closeModal();
            showToast(`Acesso de ${user.name} foi rejeitado. Motivo: ${reason}`, 'error');
        }
    }
}

// Atualizar dados
function refreshData() {
    // Animação de loading no botão
    const originalHTML = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    refreshBtn.disabled = true;
    
    // Simulação de carregamento
    setTimeout(() => {
        renderUsersTable();
        updateStats();
        refreshBtn.innerHTML = originalHTML;
        refreshBtn.disabled = false;
        showToast('Dados atualizados com sucesso!', 'success');
    }, 800);
}

// ===== SISTEMA DE NOTIFICAÇÕES =====

// Mostrar notificação
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    toast.innerHTML = `
        <div class="toast-header">
            <div class="toast-title">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
                ${type === 'success' ? 'Sucesso!' : 'Atenção!'}
            </div>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="toast-body">${message}</div>
    `;

    toastContainer.appendChild(toast);

    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
}

// ===== EXPORTAR FUNÇÕES PARA USO GLOBAL =====
window.viewUserDetails = viewUserDetails;
window.approveUser = approveUser;
window.rejectUser = rejectUser;
window.closeModal = closeModal;

// ===== INICIALIZAÇÃO FINAL =====
console.log('=== APROVAÇÃO DE USUÁRIOS - PRONTO PARA USO ===');