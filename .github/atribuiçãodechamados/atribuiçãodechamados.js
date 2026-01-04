// ===== SISTEMA DE DESFAZER =====
let actionHistory = []; // Pilha de ações para desfazer
let MAX_HISTORY = 10;   // Número máximo de ações armazenadas

// ===== DADOS DE EXEMPLO =====

// Usuário atual
const currentUser = {
    id: 1,
    name: "Carlos Silva",
    role: "Administrador",
    department: "TI",
    email: "carlos.silva@citiesoft.com",
    avatarInitials: "CS"
};

// Funcionários
let employees = [
    {
        id: 1,
        name: "Carlos Silva",
        role: "Administrador",
        department: "TI",
        email: "carlos.silva@citiessoft.com",
        avatarInitials: "CS",
        ticketsAssigned: 3,
        ticketsResolved: 45,
        status: "available"
    },
    {
        id: 2,
        name: "Maria Santos",
        role: "Analista de Suporte",
        department: "TI",
        email: "maria.santos@citiessoft.com",
        avatarInitials: "MS",
        ticketsAssigned: 5,
        ticketsResolved: 32,
        status: "busy"
    },
    {
        id: 3,
        name: "João Oliveira",
        role: "Desenvolvedor",
        department: "TI",
        email: "joao.oliveira@citiessoft.com",
        avatarInitials: "JO",
        ticketsAssigned: 2,
        ticketsResolved: 28,
        status: "available"
    },
    {
        id: 4,
        name: "Ana Costa",
        role: "Analista de Sistemas",
        department: "TI",
        email: "ana.costa@citiessoft.com",
        avatarInitials: "AC",
        ticketsAssigned: 4,
        ticketsResolved: 39,
        status: "available"
    },
    {
        id: 5,
        name: "Pedro Almeida",
        role: "Técnico de Redes",
        department: "TI",
        email: "pedro.almeida@citiessoft.com",
        avatarInitials: "PA",
        ticketsAssigned: 1,
        ticketsResolved: 21,
        status: "away"
    },
    {
        id: 6,
        name: "Juliana Lima",
        role: "Analista de RH",
        department: "RH",
        email: "juliana.lima@citiessoft.com",
        avatarInitials: "JL",
        ticketsAssigned: 2,
        ticketsResolved: 18,
        status: "available"
    },
    {
        id: 7,
        name: "Roberto Santos",
        role: "Contador",
        department: "Financeiro",
        email: "roberto.santos@citiessoft.com",
        avatarInitials: "RS",
        ticketsAssigned: 0,
        ticketsResolved: 12,
        status: "available"
    },
    {
        id: 8,
        name: "Fernanda Oliveira",
        role: "Vendedora",
        department: "Vendas",
        email: "fernanda.oliveira@citiessoft.com",
        avatarInitials: "FO",
        ticketsAssigned: 3,
        ticketsResolved: 25,
        status: "busy"
    }
];

// Chamados
let tickets = [
    {
        id: 1,
        ticketId: "TKT-2024-001",
        title: "Problema no acesso ao sistema ERP",
        description: "Usuário não consegue acessar o sistema ERP para lançamento de notas fiscais. Mensagem de erro: 'Acesso negado'. O problema começou hoje pela manhã.",
        priority: "high",
        status: "open",
        department: "ti",
        createdDate: "2024-01-15",
        dueDate: "2024-01-18",
        assignedTo: null,
        createdBy: "Financeiro",
        category: "Sistema"
    },
    {
        id: 2,
        ticketId: "TKT-2024-002",
        title: "Solicitação de novo usuário",
        description: "Necessário criar acesso para novo funcionário do departamento de Vendas. Nome: Marcos Souza, Cargo: Vendedor Júnior.",
        priority: "medium",
        status: "open",
        department: "ti",
        createdDate: "2024-01-14",
        dueDate: "2024-01-16",
        assignedTo: null,
        createdBy: "RH",
        category: "Acesso"
    },
    {
        id: 3,
        ticketId: "TKT-2024-003",
        title: "Impressora não está funcionando",
        description: "Impressora da sala de reuniões não está imprimindo. Já verifiquei conexões e reinstalei drivers, mas o problema persiste.",
        priority: "medium",
        status: "in-progress",
        department: "ti",
        createdDate: "2024-01-13",
        dueDate: "2024-01-15",
        assignedTo: 2,
        createdBy: "Marketing",
        category: "Hardware"
    },
    {
        id: 4,
        ticketId: "TKT-2024-004",
        title: "Erro no relatório financeiro",
        description: "Relatório de fluxo de caixa está apresentando valores inconsistentes. Parece haver um problema com os cálculos de impostos.",
        priority: "high",
        status: "open",
        department: "ti",
        createdDate: "2024-01-12",
        dueDate: "2024-01-17",
        assignedTo: null,
        createdBy: "Financeiro",
        category: "Sistema"
    },
    {
        id: 5,
        ticketId: "TKT-2024-005",
        title: "Atualização de software",
        description: "Necessário atualizar o pacote Office em todos os computadores do departamento de Vendas para a versão mais recente.",
        priority: "low",
        status: "open",
        department: "ti",
        createdDate: "2024-01-11",
        dueDate: "2024-01-25",
        assignedTo: null,
        createdBy: "Vendas",
        category: "Software"
    },
    {
        id: 6,
        ticketId: "TKT-2024-006",
        title: "Problema com VPN",
        description: "Usuário não consegue se conectar à VPN para trabalho remoto. Erro de autenticação aparece após inserir credenciais.",
        priority: "high",
        status: "in-progress",
        department: "ti",
        createdDate: "2024-01-10",
        dueDate: "2024-01-12",
        assignedTo: 4,
        createdBy: "Vendas",
        category: "Rede"
    },
    {
        id: 7,
        ticketId: "TKT-2024-007",
        title: "Configuração de email",
        description: "Novo funcionário precisa de configuração de email corporativo no Outlook. Já possui conta criada no Active Directory.",
        priority: "low",
        status: "open",
        department: "ti",
        createdDate: "2024-01-09",
        dueDate: "2024-01-11",
        assignedTo: null,
        createdBy: "RH",
        category: "Email"
    },
    {
        id: 8,
        ticketId: "TKT-2024-008",
        title: "Backup do servidor",
        description: "Verificar e executar backup completo do servidor de arquivos. Necessário validar integridade dos dados.",
        priority: "medium",
        status: "open",
        department: "ti",
        createdDate: "2024-01-08",
        dueDate: "2024-01-10",
        assignedTo: null,
        createdBy: "TI",
        category: "Backup"
    },
    {
        id: 9,
        ticketId: "TKT-2024-009",
        title: "Problema resolvido - exemplo",
        description: "Este é um exemplo de chamado já resolvido para demonstrar a funcionalidade.",
        priority: "low",
        status: "resolved",
        department: "ti",
        createdDate: "2024-01-05",
        dueDate: "2024-01-07",
        assignedTo: 1,
        createdBy: "Vendas",
        category: "Exemplo"
    }
];

// ===== ESTADO DA APLICAÇÃO =====
let selectedTicket = null;
let selectedEmployee = null;
let currentFilters = {
    priority: 'all',
    status: 'all',
    department: 'all',
    sort: 'date-desc'
};
let employeeSearchTerm = '';

// ===== ELEMENTOS DOM =====
const employeeCount = document.getElementById('employeeCount');
const employeeSearch = document.getElementById('employeeSearch');
const employeesContainer = document.getElementById('employeesContainer');
const pendingCount = document.getElementById('pendingCount');
const assignedCount = document.getElementById('assignedCount');
const resolvedCount = document.getElementById('resolvedCount');
const totalCount = document.getElementById('totalCount');
const ticketsList = document.getElementById('ticketsList');
const btnUndo = document.getElementById('btnUndo');
const btnToggleFilters = document.getElementById('btnToggleFilters');
const filtersContainer = document.getElementById('filtersContainer');
const filterPriority = document.getElementById('filterPriority');
const filterStatus = document.getElementById('filterStatus');
const filterDepartment = document.getElementById('filterDepartment');
const filterSort = document.getElementById('filterSort');
const btnRefresh = document.getElementById('btnRefresh');
const assignmentPanel = document.getElementById('assignmentPanel');
const panelTicketId = document.getElementById('panelTicketId');
const panelTicketTitle = document.getElementById('panelTicketTitle');
const panelEmployeeAvatar = document.getElementById('panelEmployeeAvatar');
const panelEmployeeName = document.getElementById('panelEmployeeName');
const panelEmployeeRole = document.getElementById('panelEmployeeRole');
const btnAssignToMe = document.getElementById('btnAssignToMe');
const btnConfirmAssignment = document.getElementById('btnConfirmAssignment');
const btnMarkResolved = document.getElementById('btnMarkResolved');
const closeAssignmentPanel = document.getElementById('closeAssignmentPanel');
const ticketModal = document.getElementById('ticketModal');
const ticketModalBody = document.getElementById('ticketModalBody');
const closeTicketModal = document.getElementById('closeTicketModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnTakeTicket = document.getElementById('btnTakeTicket');
const btnResolveTicket = document.getElementById('btnResolveTicket');
const toastContainer = document.getElementById('toastContainer');

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== ATRIBUIÇÃO DE CHAMADOS - INICIANDO ===');
    
    // Carregar dados iniciais
    renderEmployees();
    renderTickets();
    updateStats();
    setupEventListeners();
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        showToast('Sistema de atribuição carregado com sucesso!', 'success');
    }, 1000);
});

// ===== CONFIGURAR EVENT LISTENERS =====
function setupEventListeners() {
    // Busca de funcionários
    employeeSearch.addEventListener('input', debounce((e) => {
        employeeSearchTerm = e.target.value.toLowerCase();
        renderEmployees();
    }, 300));
    
    // Botão desfazer
    btnUndo.addEventListener('click', undoLastAction);
    
    // Botão toggle filters
    btnToggleFilters.addEventListener('click', () => {
        const isVisible = filtersContainer.style.display === 'block';
        filtersContainer.style.display = isVisible ? 'none' : 'block';
        btnToggleFilters.innerHTML = isVisible ? 
            '<i class="fas fa-filter"></i> Filtros' : 
            '<i class="fas fa-times"></i> Fechar';
    });
    
    // Filtros
    filterPriority.addEventListener('change', updateFilters);
    filterStatus.addEventListener('change', updateFilters);
    filterDepartment.addEventListener('change', updateFilters);
    filterSort.addEventListener('change', updateFilters);
    
    // Botão refresh
    btnRefresh.addEventListener('click', refreshTickets);
    
    // Painel de atribuição
    btnAssignToMe.addEventListener('click', assignToCurrentUser);
    btnConfirmAssignment.addEventListener('click', confirmAssignment);
    btnMarkResolved.addEventListener('click', markTicketAsResolved);
    closeAssignmentPanel.addEventListener('click', closeAssignmentPanelFunc);
    
    // Modal
    btnCloseModal.addEventListener('click', closeTicketModalFunc);
    closeTicketModal.addEventListener('click', closeTicketModalFunc);
    btnTakeTicket.addEventListener('click', takeTicket);
    btnResolveTicket.addEventListener('click', markTicketAsResolved);
    
    // Fechar modal clicando fora
    ticketModal.addEventListener('click', (e) => {
        if (e.target === ticketModal) {
            closeTicketModalFunc();
        }
    });
    
    // Tecla ESC para fechar modais
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (assignmentPanel.classList.contains('active')) {
                closeAssignmentPanelFunc();
            }
            if (ticketModal.classList.contains('active')) {
                closeTicketModalFunc();
            }
        }
        
        // Atalho Ctrl+Z para desfazer
        if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
            e.preventDefault();
            if (!btnUndo.disabled) {
                undoLastAction();
            }
        }
    });
}

// ===== DEBOUNCE =====
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

// ===== RENDERIZAR FUNCIONÁRIOS =====
function renderEmployees() {
    employeesContainer.innerHTML = '';
    
    // Filtrar funcionários
    let filteredEmployees = employees;
    
    if (employeeSearchTerm) {
        filteredEmployees = employees.filter(employee => 
            employee.name.toLowerCase().includes(employeeSearchTerm) ||
            employee.role.toLowerCase().includes(employeeSearchTerm) ||
            employee.department.toLowerCase().includes(employeeSearchTerm)
        );
    }
    
    // Atualizar contador
    employeeCount.textContent = filteredEmployees.length;
    
    // Se não houver funcionários
    if (filteredEmployees.length === 0) {
        employeesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-user-slash fa-3x mb-3"></i>
                <h5 class="text-muted">Nenhum funcionário encontrado</h5>
                <p class="text-muted">Tente ajustar sua busca</p>
            </div>
        `;
        return;
    }
    
    // Renderizar cada funcionário
    filteredEmployees.forEach(employee => {
        const employeeCard = document.createElement('div');
        employeeCard.className = `employee-card ${selectedEmployee?.id === employee.id ? 'selected' : ''} ${employee.status}`;
        
        employeeCard.innerHTML = `
            <div class="employee-info">
                <div class="employee-avatar">${employee.avatarInitials}</div>
                <div class="employee-details">
                    <h6 class="employee-name">${employee.name}</h6>
                    <p class="employee-role">
                        <i class="fas fa-briefcase me-1 text-muted"></i>${employee.role}
                        <span style="background: rgba(0, 166, 255, 0.1); color: var(--dark-blue); padding: 2px 8px; border-radius: var(--radius-sm); font-size: 0.75rem; margin-left: 8px;">${employee.department.toUpperCase()}</span>
                    </p>
                </div>
            </div>
            <div class="employee-stats">
                <div class="stat-item">
                    <div class="employee-stat-number">${employee.ticketsAssigned}</div>
                    <div class="employee-stat-label">Atribuídos</div>
                </div>
                <div class="stat-item">
                    <div class="employee-stat-number">${employee.ticketsResolved}</div>
                    <div class="employee-stat-label">Resolvidos</div>
                </div>
                <div class="stat-item">
                    <div class="employee-stat-number">
                        <i class="fas fa-circle" style="color: ${employee.status === 'available' ? '#28a745' : employee.status === 'busy' ? '#dc3545' : '#ffc107'}"></i>
                    </div>
                    <div class="employee-stat-label">${employee.status === 'available' ? 'Disponível' : employee.status === 'busy' ? 'Ocupado' : 'Ausente'}</div>
                </div>
            </div>
        `;
        
        employeeCard.addEventListener('click', () => {
            selectEmployee(employee);
        });
        
        employeesContainer.appendChild(employeeCard);
    });
}

// ===== RENDERIZAR CHAMADOS =====
function renderTickets() {
    ticketsList.innerHTML = '';
    
    // Filtrar e ordenar chamados
    let filteredTickets = filterTickets(tickets);
    filteredTickets = sortTickets(filteredTickets);
    
    // Se não houver chamados
    if (filteredTickets.length === 0) {
        ticketsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search fa-3x mb-3"></i>
                <h5 class="text-muted">Nenhum chamado encontrado</h5>
                <p class="text-muted">Tente ajustar os filtros de busca</p>
            </div>
        `;
        return;
    }
    
    // Renderizar cada chamado
    filteredTickets.forEach(ticket => {
        const assignedEmployee = ticket.assignedTo ? 
            employees.find(e => e.id === ticket.assignedTo) : null;
        
        const ticketCard = document.createElement('div');
        ticketCard.className = `ticket-card ${selectedTicket?.id === ticket.id ? 'selected' : ''} ${ticket.priority}-priority ${ticket.assignedTo ? 'assigned' : ''} ${ticket.status === 'resolved' ? 'resolved' : ''}`;
        
        ticketCard.innerHTML = `
            <div class="ticket-header">
                <div style="display: flex; align-items: center;">
                    <h6 class="ticket-title">${ticket.title}</h6>
                    <span class="ticket-id">${ticket.ticketId}</span>
                </div>
                <span class="ticket-priority priority-${ticket.priority}">
                    ${getPriorityText(ticket.priority)}
                </span>
            </div>
            <p class="ticket-description">${ticket.description}</p>
            <div class="ticket-meta">
                <div class="meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>Criado: ${formatDate(ticket.createdDate)}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>Prazo: ${formatDate(ticket.dueDate)}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-building"></i>
                    <span>Dept: ${getDepartmentText(ticket.department)}</span>
                </div>
            </div>
            <div class="ticket-footer">
                <span class="ticket-status status-${ticket.status}">
                    ${getStatusText(ticket.status)}
                </span>
                ${assignedEmployee ? `
                    <div class="assigned-info">
                        <div class="assigned-avatar">${assignedEmployee.avatarInitials}</div>
                        <div>
                            <div class="assigned-name">${assignedEmployee.name}</div>
                            <div class="assigned-text">Atribuído</div>
                        </div>
                    </div>
                ` : `
                    <div class="not-assigned">
                        <i class="fas fa-user-clock"></i>
                        <span>Aguardando atribuição</span>
                    </div>
                `}
            </div>
            ${ticket.status === 'in-progress' && ticket.assignedTo === currentUser.id ? `
                <div class="ticket-actions">
                    <button class="btn btn-success btn-sm mark-resolved-btn" data-ticket-id="${ticket.id}">
                        <i class="fas fa-check-circle"></i> Marcar como Resolvido
                    </button>
                </div>
            ` : ''}
        `;
        
        ticketCard.addEventListener('click', (e) => {
            // Não selecionar o ticket se clicamos no botão de resolver
            if (!e.target.closest('.mark-resolved-btn')) {
                selectTicket(ticket);
            }
        });
        
        // Adicionar evento ao botão de resolver dentro do card
        const resolveBtn = ticketCard.querySelector('.mark-resolved-btn');
        if (resolveBtn) {
            resolveBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Impedir que o clique no botão selecione o ticket
                markTicketAsResolvedFromCard(ticket.id);
            });
        }
        
        ticketsList.appendChild(ticketCard);
    });
}

// ===== FILTRAR CHAMADOS =====
function filterTickets(tickets) {
    return tickets.filter(ticket => {
        // Filtro de prioridade
        if (currentFilters.priority !== 'all' && ticket.priority !== currentFilters.priority) {
            return false;
        }
        
        // Filtro de status
        if (currentFilters.status !== 'all' && ticket.status !== currentFilters.status) {
            return false;
        }
        
        // Filtro de departamento
        if (currentFilters.department !== 'all' && ticket.department !== currentFilters.department) {
            return false;
        }
        
        return true;
    });
}

// ===== ORDENAR CHAMADOS =====
function sortTickets(tickets) {
    return [...tickets].sort((a, b) => {
        switch(currentFilters.sort) {
            case 'date-asc':
                return new Date(a.createdDate) - new Date(b.createdDate);
            case 'date-desc':
                return new Date(b.createdDate) - new Date(a.createdDate);
            case 'priority':
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return new Date(b.createdDate) - new Date(a.createdDate);
        }
    });
}

// ===== ATUALIZAR FILTROS =====
function updateFilters() {
    currentFilters.priority = filterPriority.value;
    currentFilters.status = filterStatus.value;
    currentFilters.department = filterDepartment.value;
    currentFilters.sort = filterSort.value;
    
    renderTickets();
}

// ===== ATUALIZAR ESTATÍSTICAS =====
function updateStats() {
    const pending = tickets.filter(t => t.status === 'open').length;
    const assigned = tickets.filter(t => t.assignedTo !== null && t.status !== 'resolved').length;
    const resolved = tickets.filter(t => t.status === 'resolved').length;
    const total = tickets.length;
    
    pendingCount.textContent = pending;
    assignedCount.textContent = assigned;
    resolvedCount.textContent = resolved;
    totalCount.textContent = total;
}

// ===== SELECIONAR CHAMADO =====
function selectTicket(ticket) {
    // Remover seleção anterior
    document.querySelectorAll('.ticket-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Selecionar novo
    selectedTicket = ticket;
    
    // Se já houver um funcionário selecionado, mostrar painel
    if (selectedEmployee) {
        showAssignmentPanel();
    } else {
        // Mostrar detalhes
        showTicketDetails(ticket);
    }
}

// ===== SELECIONAR FUNCIONÁRIO =====
function selectEmployee(employee) {
    // Remover seleção anterior
    document.querySelectorAll('.employee-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Selecionar novo
    selectedEmployee = employee;
    
    // Se já houver um chamado selecionado, mostrar painel
    if (selectedTicket) {
        showAssignmentPanel();
    }
}

// ===== PAINEL DE ATRIBUIÇÃO =====
function showAssignmentPanel() {
    if (!selectedTicket) return;
    
    // Atualizar informações
    panelTicketId.textContent = `#${selectedTicket.ticketId}`;
    panelTicketTitle.textContent = selectedTicket.title;
    
    if (selectedEmployee) {
        panelEmployeeAvatar.textContent = selectedEmployee.avatarInitials;
        panelEmployeeName.textContent = selectedEmployee.name;
        panelEmployeeRole.textContent = selectedEmployee.role;
        
        // Habilitar botão de confirmação
        btnConfirmAssignment.disabled = false;
        
        // Mostrar/ocultar botão de marcar como resolvido
        if (selectedTicket.assignedTo === selectedEmployee.id && selectedTicket.status === 'in-progress') {
            btnMarkResolved.style.display = 'inline-block';
        } else {
            btnMarkResolved.style.display = 'none';
        }
    } else {
        panelEmployeeAvatar.textContent = '??';
        panelEmployeeName.textContent = 'Nenhum selecionado';
        panelEmployeeRole.textContent = 'Selecione um funcionário';
        btnConfirmAssignment.disabled = true;
        btnMarkResolved.style.display = 'none';
    }
    
    // Mostrar painel
    assignmentPanel.classList.add('active');
    
    // Scroll para o painel
    assignmentPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeAssignmentPanelFunc() {
    selectedTicket = null;
    selectedEmployee = null;
    
    // Remover seleções
    document.querySelectorAll('.ticket-card.selected, .employee-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Desabilitar botão
    btnConfirmAssignment.disabled = true;
    btnMarkResolved.style.display = 'none';
    
    // Esconder painel
    assignmentPanel.classList.remove('active');
}

// ===== SISTEMA DE DESFAZER - FUNÇÕES =====
function saveActionToHistory(action) {
    // Limitar o histórico ao máximo definido
    if (actionHistory.length >= MAX_HISTORY) {
        actionHistory.shift(); // Remove a ação mais antiga
    }
    
    actionHistory.push({
        ...action,
        timestamp: new Date().toISOString()
    });
    
    // Habilitar botão desfazer
    btnUndo.disabled = false;
    
    console.log('Ação salva no histórico:', action.type);
}

function undoLastAction() {
    if (actionHistory.length === 0) {
        showToast('Não há ações para desfazer', 'warning');
        return;
    }
    
    const lastAction = actionHistory.pop();
    
    switch (lastAction.type) {
        case 'ASSIGNMENT':
            undoAssignment(lastAction);
            break;
        case 'RESOLUTION':
            undoResolution(lastAction);
            break;
        case 'SELF_ASSIGNMENT':
            undoSelfAssignment(lastAction);
            break;
        default:
            console.warn('Tipo de ação não reconhecido:', lastAction.type);
    }
    
    // Se não houver mais ações, desabilitar botão desfazer
    if (actionHistory.length === 0) {
        btnUndo.disabled = true;
    }
    
    // Atualizar interface
    renderTickets();
    renderEmployees();
    updateStats();
    
    showToast(`Ação "${lastAction.description}" desfeita com sucesso!`, 'success');
}

function undoAssignment(action) {
    // Encontrar o ticket
    const ticketIndex = tickets.findIndex(t => t.id === action.ticketId);
    if (ticketIndex === -1) return;
    
    // Restaurar estado anterior
    tickets[ticketIndex].assignedTo = action.oldAssignedTo;
    tickets[ticketIndex].status = action.oldStatus;
    
    // Restaurar estatísticas dos funcionários
    if (action.oldAssignedTo) {
        const oldEmployeeIndex = employees.findIndex(e => e.id === action.oldAssignedTo);
        if (oldEmployeeIndex !== -1) {
            employees[oldEmployeeIndex].ticketsAssigned += 1;
        }
    }
    
    if (action.newAssignedTo) {
        const newEmployeeIndex = employees.findIndex(e => e.id === action.newAssignedTo);
        if (newEmployeeIndex !== -1) {
            employees[newEmployeeIndex].ticketsAssigned -= 1;
        }
    }
    
    console.log('Atribuição desfeita para:', tickets[ticketIndex].ticketId);
}

function undoResolution(action) {
    const ticketIndex = tickets.findIndex(t => t.id === action.ticketId);
    if (ticketIndex === -1) return;
    
    // Restaurar estado anterior
    tickets[ticketIndex].status = action.oldStatus;
    
    // Restaurar estatísticas do funcionário
    const employeeIndex = employees.findIndex(e => e.id === action.assignedTo);
    if (employeeIndex !== -1) {
        employees[employeeIndex].ticketsAssigned += 1;
        employees[employeeIndex].ticketsResolved -= 1;
    }
    
    console.log('Resolução desfeita para:', tickets[ticketIndex].ticketId);
}

function undoSelfAssignment(action) {
    const ticketIndex = tickets.findIndex(t => t.id === action.ticketId);
    if (ticketIndex === -1) return;
    
    // Restaurar estado anterior
    tickets[ticketIndex].assignedTo = action.oldAssignedTo;
    tickets[ticketIndex].status = action.oldStatus;
    
    // Restaurar estatísticas do funcionário
    const employeeIndex = employees.findIndex(e => e.id === action.employeeId);
    if (employeeIndex !== -1) {
        employees[employeeIndex].ticketsAssigned -= 1;
    }
    
    console.log('Auto-atribuição desfeita para:', tickets[ticketIndex].ticketId);
}

// ===== ATRIBUIR AO USUÁRIO ATUAL =====
function assignToCurrentUser() {
    if (!selectedTicket) {
        showToast('Selecione um chamado primeiro', 'warning');
        return;
    }
    
    // Encontrar funcionário correspondente ao usuário atual
    const currentEmployee = employees.find(e => e.id === currentUser.id);
    
    if (!currentEmployee) {
        showToast('Você não está na lista de funcionários', 'error');
        return;
    }
    
    selectedEmployee = currentEmployee;
    
    // Salvar estado anterior para histórico
    const action = {
        type: 'SELF_ASSIGNMENT',
        description: 'Auto-atribuição',
        ticketId: selectedTicket.id,
        ticketTitle: selectedTicket.title,
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        oldAssignedTo: selectedTicket.assignedTo,
        oldStatus: selectedTicket.status
    };
    
    saveActionToHistory(action);
    
    // Atualizar painel
    panelEmployeeAvatar.textContent = selectedEmployee.avatarInitials;
    panelEmployeeName.textContent = selectedEmployee.name;
    panelEmployeeRole.textContent = selectedEmployee.role;
    
    // Habilitar botão de confirmação
    btnConfirmAssignment.disabled = false;
    
    // Mostrar botão de marcar como resolvido se já estiver atribuído
    if (selectedTicket.assignedTo === selectedEmployee.id && selectedTicket.status === 'in-progress') {
        btnMarkResolved.style.display = 'inline-block';
    }
}

// ===== CONFIRMAR ATRIBUIÇÃO =====
function confirmAssignment() {
    if (!selectedTicket || !selectedEmployee) {
        showToast('Selecione um chamado e um funcionário', 'warning');
        return;
    }
    
    // Salvar estado anterior para histórico
    const action = {
        type: 'ASSIGNMENT',
        description: 'Atribuição de chamado',
        ticketId: selectedTicket.id,
        ticketTitle: selectedTicket.title,
        oldAssignedTo: selectedTicket.assignedTo,
        oldStatus: selectedTicket.status,
        newAssignedTo: selectedEmployee.id,
        employeeName: selectedEmployee.name
    };
    
    saveActionToHistory(action);
    
    // Verificar se o chamado já está atribuído
    if (selectedTicket.assignedTo && selectedTicket.assignedTo !== selectedEmployee.id) {
        const previousEmployee = employees.find(e => e.id === selectedTicket.assignedTo);
        if (previousEmployee) {
            previousEmployee.ticketsAssigned -= 1;
        }
    }
    
    // Atualizar chamado
    const ticketIndex = tickets.findIndex(t => t.id === selectedTicket.id);
    
    if (ticketIndex !== -1) {
        tickets[ticketIndex].assignedTo = selectedEmployee.id;
        tickets[ticketIndex].status = 'in-progress';
        
        // Atualizar contador do funcionário
        const employeeIndex = employees.findIndex(e => e.id === selectedEmployee.id);
        if (employeeIndex !== -1) {
            employees[employeeIndex].ticketsAssigned += 1;
        }
        
        // Mostrar notificação
        showToast(`Chamado ${selectedTicket.ticketId} atribuído a ${selectedEmployee.name}!`, 'success');
        
        // Atualizar interface
        renderTickets();
        renderEmployees();
        updateStats();
        
        // Atualizar botão no painel
        btnMarkResolved.style.display = 'inline-block';
    }
}

// ===== MARCAR CHAMADO COMO RESOLVIDO =====
function markTicketAsResolved() {
    if (!selectedTicket) {
        showToast('Nenhum chamado selecionado', 'warning');
        return;
    }
    
    // Verificar se o chamado está atribuído
    if (!selectedTicket.assignedTo) {
        showToast('Este chamado não está atribuído a ninguém', 'warning');
        return;
    }
    
    // Verificar se o usuário atual é o responsável (ou admin)
    if (selectedTicket.assignedTo !== currentUser.id && currentUser.id !== 1) {
        showToast('Você não tem permissão para marcar este chamado como resolvido', 'error');
        return;
    }
    
    // Salvar estado anterior para histórico
    const action = {
        type: 'RESOLUTION',
        description: 'Resolução de chamado',
        ticketId: selectedTicket.id,
        ticketTitle: selectedTicket.title,
        assignedTo: selectedTicket.assignedTo,
        oldStatus: selectedTicket.status,
        employeeName: employees.find(e => e.id === selectedTicket.assignedTo)?.name || 'Desconhecido'
    };
    
    saveActionToHistory(action);
    
    // Atualizar o ticket
    const ticketIndex = tickets.findIndex(t => t.id === selectedTicket.id);
    const employeeIndex = employees.findIndex(e => e.id === selectedTicket.assignedTo);
    
    if (ticketIndex !== -1) {
        tickets[ticketIndex].status = 'resolved';
        
        // Atualizar estatísticas do funcionário
        if (employeeIndex !== -1) {
            employees[employeeIndex].ticketsAssigned -= 1;
            employees[employeeIndex].ticketsResolved += 1;
        }
        
        // Mostrar notificação
        showToast(`Chamado ${selectedTicket.ticketId} marcado como RESOLVIDO!`, 'success');
        
        // Atualizar interface
        renderTickets();
        renderEmployees();
        updateStats();
        
        // Fechar painel/modal
        if (assignmentPanel.classList.contains('active')) {
            closeAssignmentPanelFunc();
        }
        if (ticketModal.classList.contains('active')) {
            closeTicketModalFunc();
        }
    }
}

// ===== MARCAR COMO RESOLVIDO A PARTIR DO CARD =====
function markTicketAsResolvedFromCard(ticketId) {
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (!ticket) return;
    
    // Verificar se o chamado está atribuído ao usuário atual
    if (ticket.assignedTo !== currentUser.id) {
        showToast('Você não pode marcar este chamado como resolvido', 'error');
        return;
    }
    
    // Salvar estado anterior para histórico
    const action = {
        type: 'RESOLUTION',
        description: 'Resolução de chamado (card)',
        ticketId: ticketId,
        ticketTitle: ticket.title,
        assignedTo: ticket.assignedTo,
        oldStatus: ticket.status,
        employeeName: employees.find(e => e.id === ticket.assignedTo)?.name || 'Desconhecido'
    };
    
    saveActionToHistory(action);
    
    const ticketIndex = tickets.findIndex(t => t.id === ticketId);
    const employeeIndex = employees.findIndex(e => e.id === ticket.assignedTo);
    
    if (ticketIndex !== -1) {
        tickets[ticketIndex].status = 'resolved';
        
        // Atualizar estatísticas do funcionário
        if (employeeIndex !== -1) {
            employees[employeeIndex].ticketsAssigned -= 1;
            employees[employeeIndex].ticketsResolved += 1;
        }
        
        // Mostrar notificação
        showToast(`Chamado ${ticket.ticketId} marcado como RESOLVIDO!`, 'success');
        
        // Atualizar interface
        renderTickets();
        renderEmployees();
        updateStats();
    }
}

// ===== MODAL DETALHES =====
function showTicketDetails(ticket) {
    const assignedEmployee = ticket.assignedTo ? 
        employees.find(e => e.id === ticket.assignedTo) : null;
    
    ticketModalBody.innerHTML = `
        <div class="ticket-details">
            <div class="detail-item" style="margin-bottom: 20px;">
                <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">ID do Chamado</div>
                <div class="detail-value" style="font-size: 1.2rem; color: var(--primary-blue); font-weight: 700;">${ticket.ticketId}</div>
            </div>
            
            <div class="detail-item" style="margin-bottom: 20px;">
                <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Título</div>
                <div class="detail-value" style="font-size: 1.1rem; color: var(--text-primary);">${ticket.title}</div>
            </div>
            
            <div class="detail-item" style="margin-bottom: 20px;">
                <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Descrição</div>
                <div class="detail-value" style="color: var(--text-primary); line-height: 1.6;">${ticket.description}</div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
                <div class="detail-item">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Prioridade</div>
                    <div class="detail-value">
                        <span class="ticket-priority priority-${ticket.priority}" style="display: inline-block;">
                            ${getPriorityText(ticket.priority)}
                        </span>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Status</div>
                    <div class="detail-value">
                        <span class="ticket-status status-${ticket.status}" style="display: inline-block;">
                            ${getStatusText(ticket.status)}
                        </span>
                    </div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Departamento</div>
                    <div class="detail-value">${getDepartmentText(ticket.department)}</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Categoria</div>
                    <div class="detail-value">${ticket.category}</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 25px;">
                <div class="detail-item">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Criado em</div>
                    <div class="detail-value">${formatDate(ticket.createdDate)}</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Prazo</div>
                    <div class="detail-value">${formatDate(ticket.dueDate)}</div>
                </div>
                
                <div class="detail-item">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Criado por</div>
                    <div class="detail-value">${ticket.createdBy}</div>
                </div>
            </div>
            
            ${assignedEmployee ? `
                <div class="detail-item" style="margin-bottom: 20px;">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Atribuído a</div>
                    <div class="detail-value" style="display: flex; align-items: center; gap: 10px;">
                        <div class="employee-avatar" style="width: 40px; height: 40px; font-size: 1rem;">${assignedEmployee.avatarInitials}</div>
                        <div>
                            <div style="font-weight: 600;">${assignedEmployee.name}</div>
                            <div style="font-size: 0.9rem; color: var(--text-secondary);">${assignedEmployee.role}</div>
                        </div>
                    </div>
                </div>
            ` : `
                <div class="detail-item" style="margin-bottom: 20px;">
                    <div class="detail-label" style="font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">Atribuição</div>
                    <div class="detail-value" style="color: var(--warning-orange);">
                        <i class="fas fa-user-clock"></i> Aguardando atribuição
                    </div>
                </div>
            `}
        </div>
    `;
    
    // Configurar botões do modal
    btnTakeTicket.style.display = 'none';
    btnResolveTicket.style.display = 'none';
    
    if (ticket.status === 'resolved') {
        // Se já estiver resolvido, não mostrar botões de ação
        btnTakeTicket.style.display = 'none';
        btnResolveTicket.style.display = 'none';
    } else if (ticket.assignedTo === currentUser.id) {
        // Se o ticket está atribuído ao usuário atual, mostrar botão de resolver
        btnTakeTicket.style.display = 'none';
        btnResolveTicket.style.display = 'inline-block';
    } else if (!ticket.assignedTo) {
        // Se o ticket não está atribuído, mostrar botão de atribuir a mim
        btnTakeTicket.style.display = 'inline-block';
        btnResolveTicket.style.display = 'none';
    } else {
        // Se o ticket está atribuído a outra pessoa, não mostrar botões
        btnTakeTicket.style.display = 'none';
        btnResolveTicket.style.display = 'none';
    }
    
    ticketModal.classList.add('active');
}

function closeTicketModalFunc() {
    ticketModal.classList.remove('active');
}

function takeTicket() {
    if (!selectedTicket) {
        showToast('Nenhum chamado selecionado', 'warning');
        return;
    }
    
    // Verificar se o chamado já está atribuído
    if (selectedTicket.assignedTo) {
        showToast('Este chamado já está atribuído', 'warning');
        return;
    }
    
    // Salvar estado anterior para histórico
    const action = {
        type: 'SELF_ASSIGNMENT',
        description: 'Auto-atribuição (modal)',
        ticketId: selectedTicket.id,
        ticketTitle: selectedTicket.title,
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        oldAssignedTo: selectedTicket.assignedTo,
        oldStatus: selectedTicket.status
    };
    
    saveActionToHistory(action);
    
    // Atribuir ao usuário atual
    const ticketIndex = tickets.findIndex(t => t.id === selectedTicket.id);
    const employeeIndex = employees.findIndex(e => e.id === currentUser.id);
    
    if (ticketIndex !== -1 && employeeIndex !== -1) {
        tickets[ticketIndex].assignedTo = currentUser.id;
        tickets[ticketIndex].status = 'in-progress';
        employees[employeeIndex].ticketsAssigned += 1;
        
        showToast(`Chamado ${selectedTicket.ticketId} atribuído a você!`, 'success');
        
        renderTickets();
        renderEmployees();
        updateStats();
        
        // Atualizar botões do modal
        btnTakeTicket.style.display = 'none';
        btnResolveTicket.style.display = 'inline-block';
        
        // Atualizar detalhes no modal
        showTicketDetails(tickets[ticketIndex]);
    }
}

// ===== FUNÇÕES UTILITÁRIAS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

function getPriorityText(priority) {
    const map = { high: 'Alta', medium: 'Média', low: 'Baixa' };
    return map[priority] || priority;
}

function getStatusText(status) {
    const map = { 
        'open': 'Aberto', 
        'in-progress': 'Em Andamento', 
        'resolved': 'Resolvido' 
    };
    return map[status] || status;
}

function getDepartmentText(department) {
    const map = { 
        'ti': 'TI', 
        'rh': 'Recursos Humanos', 
        'financeiro': 'Financeiro', 
        'vendas': 'Vendas',
        'marketing': 'Marketing'
    };
    return map[department] || department;
}

function refreshTickets() {
    // Animação de loading
    const originalHTML = btnRefresh.innerHTML;
    btnRefresh.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btnRefresh.disabled = true;
    
    setTimeout(() => {
        renderTickets();
        btnRefresh.innerHTML = originalHTML;
        btnRefresh.disabled = false;
        showToast('Chamados atualizados com sucesso!', 'success');
    }, 800);
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle'
    };
    
    toast.innerHTML = `
        <div class="toast-header">
            <div class="toast-title">
                <i class="fas fa-${icons[type] || 'info-circle'}"></i>
                ${type === 'success' ? 'Sucesso!' : type === 'error' ? 'Erro!' : 'Atenção!'}
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    
    // Fechar toast
    toast.querySelector('.toast-close').addEventListener('click', () => {
        removeToast(toast);
    });
    
    toastContainer.appendChild(toast);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        removeToast(toast);
    }, 5000);
}

function removeToast(toast) {
    if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }
}

// ===== INICIALIZAÇÃO FINAL =====
console.log('Sistema pronto para uso');
console.log('Usuário:', currentUser.name);
console.log('Total de funcionários:', employees.length);
console.log('Total de chamados:', tickets.length);
console.log('Sistema de desfazer: PRONTO (Ctrl+Z disponível)');