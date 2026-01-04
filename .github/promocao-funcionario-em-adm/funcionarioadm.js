// ===== DADOS DE EXEMPLO =====

// Tipos de usuário
const USER_TYPES = {
    ADMIN: 'admin',
    EMPLOYEE: 'employee',
    CLIENT: 'client'
};

// Funcionários (dados de exemplo)
let employees = [
    {
        id: 1,
        name: "Carlos Silva",
        role: "Analista de Sistemas",
        department: "ti",
        email: "carlos.silva@citiesoft.com",
        avatarInitials: "CS",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 4,
        performance: 92,
        hireDate: "2020-03-15",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 2,
        name: "Maria Santos",
        role: "Analista de Suporte",
        department: "ti",
        email: "maria.santos@citiesoft.com",
        avatarInitials: "MS",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 3,
        performance: 95,
        hireDate: "2021-05-20",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 3,
        name: "João Oliveira",
        role: "Desenvolvedor Sênior",
        department: "ti",
        email: "joao.oliveira@citiesoft.com",
        avatarInitials: "JO",
        userType: USER_TYPES.ADMIN,
        tenure: 5,
        performance: 98,
        hireDate: "2019-01-10",
        lastPromotion: "2023-06-15",
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: true,
        adminLevel: "admin_sistema",
        accessLevel: "5"
    },
    {
        id: 4,
        name: "Ana Costa",
        role: "Analista de Sistemas",
        department: "ti",
        email: "ana.costa@citiesoft.com",
        avatarInitials: "AC",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 1,
        performance: 85,
        hireDate: "2023-02-28",
        lastPromotion: null,
        hasManagementTraining: false,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 5,
        name: "Pedro Almeida",
        role: "Técnico de Redes",
        department: "ti",
        email: "pedro.almeida@citiesoft.com",
        avatarInitials: "PA",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 2,
        performance: 89,
        hireDate: "2022-08-12",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: "2024-01-15",
        isAdmin: false
    },
    {
        id: 6,
        name: "Juliana Lima",
        role: "Analista de RH",
        department: "rh",
        email: "juliana.lima@citiesoft.com",
        avatarInitials: "JL",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 3,
        performance: 94,
        hireDate: "2021-03-10",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 7,
        name: "Roberto Santos",
        role: "Contador",
        department: "financeiro",
        email: "roberto.santos@citiesoft.com",
        avatarInitials: "RS",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 6,
        performance: 96,
        hireDate: "2018-11-05",
        lastPromotion: "2022-09-20",
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 8,
        name: "Fernanda Oliveira",
        role: "Gerente de Projetos",
        department: "ti",
        email: "fernanda.oliveira@citiesoft.com",
        avatarInitials: "FO",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 5,
        performance: 97,
        hireDate: "2019-06-15",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 9,
        name: "Ricardo Mendes",
        role: "Analista de Dados",
        department: "ti",
        email: "ricardo.mendes@citiesoft.com",
        avatarInitials: "RM",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 3,
        performance: 91,
        hireDate: "2021-08-22",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 10,
        name: "Patrícia Rocha",
        role: "Designer UX/UI",
        department: "marketing",
        email: "patricia.rocha@citiesoft.com",
        avatarInitials: "PR",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 4,
        performance: 93,
        hireDate: "2020-04-10",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 11,
        name: "Lucas Ferreira",
        role: "Analista de Qualidade",
        department: "ti",
        email: "lucas.ferreira@citiesoft.com",
        avatarInitials: "LF",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 2,
        performance: 88,
        hireDate: "2022-03-18",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    },
    {
        id: 12,
        name: "Camila Alves",
        role: "Analista Financeira",
        department: "financeiro",
        email: "camila.alves@citiesoft.com",
        avatarInitials: "CA",
        userType: USER_TYPES.EMPLOYEE,
        tenure: 3,
        performance: 95,
        hireDate: "2021-09-05",
        lastPromotion: null,
        hasManagementTraining: true,
        lastWarning: null,
        isAdmin: false
    }
];

// Histórico de promoções
let promotionHistory = [
    {
        id: 1,
        employeeId: 3,
        employeeName: "João Oliveira",
        oldRole: "Desenvolvedor Pleno",
        newRole: "Desenvolvedor Sênior",
        adminLevel: "admin_sistema",
        accessLevel: "5",
        promotionDate: "2023-06-15",
        reason: "Excelente desempenho técnico e liderança em projetos críticos.",
        approvedBy: "Administrador Sistema",
        status: "active",
        undoDate: null,
        undoneBy: null
    }
];

// ===== ESTADO DA APLICAÇÃO =====
let selectedEmployee = null;
let employeeSearchTerm = '';
let selectedHistoryFilter = 'all';
let lastPromotionUndone = null;

// ===== ELEMENTOS DOM =====
const employeeCount = document.getElementById('employeeCount');
const employeeSearch = document.getElementById('employeeSearch');
const employeesContainer = document.getElementById('employeesContainer');
const btnUndoPromotion = document.getElementById('btnUndoPromotion');
const btnHistory = document.getElementById('btnHistory');
const btnRefresh = document.getElementById('btnRefresh');
const btnCancel = document.getElementById('btnCancel');
const btnPromote = document.getElementById('btnPromote');
const newPosition = document.getElementById('newPosition');
const promotionDate = document.getElementById('promotionDate');
const promotionReason = document.getElementById('promotionReason');
const accessLevel = document.getElementById('accessLevel');
const historyModal = document.getElementById('historyModal');
const closeHistoryModal = document.getElementById('closeHistoryModal');
const btnCloseHistoryModal = document.getElementById('btnCloseHistoryModal');
const historyFilter = document.getElementById('historyFilter');
const historyList = document.getElementById('historyList');
const confirmationModal = document.getElementById('confirmationModal');
const closeConfirmationModal = document.getElementById('closeConfirmationModal');
const btnCancelPromotion = document.getElementById('btnCancelPromotion');
const btnConfirmPromotion = document.getElementById('btnConfirmPromotion');
const confirmationModalBody = document.getElementById('confirmationModalBody');
const undoModal = document.getElementById('undoModal');
const closeUndoModal = document.getElementById('closeUndoModal');
const btnCancelUndo = document.getElementById('btnCancelUndo');
const btnConfirmUndo = document.getElementById('btnConfirmUndo');
const undoModalBody = document.getElementById('undoModalBody');
const toastContainer = document.getElementById('toastContainer');

// Elementos do painel de promoção
const promoEmployeeAvatar = document.getElementById('promoEmployeeAvatar');
const promoEmployeeName = document.getElementById('promoEmployeeName');
const promoEmployeeRole = document.getElementById('promoEmployeeRole');
const promoEmployeeDept = document.getElementById('promoEmployeeDept');
const promoEmployeeTenure = document.getElementById('promoEmployeeTenure');
const promoEmployeeType = document.getElementById('promoEmployeeType');

// Elementos do painel de informações
const eligibilityStatus = document.getElementById('eligibilityStatus');
const infoTenure = document.getElementById('infoTenure');
const infoPerformance = document.getElementById('infoPerformance');
const infoTraining = document.getElementById('infoTraining');
const infoWarning = document.getElementById('infoWarning');

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== SISTEMA DE PROMOÇÃO PARA ADMINISTRADOR - INICIANDO ===');
    
    // Configurar data padrão para hoje
    const today = new Date().toISOString().split('T')[0];
    promotionDate.value = today;
    promotionDate.min = today;
    
    // Carregar dados iniciais
    renderEmployees();
    updateUndoButton();
    setupEventListeners();
    
    // Mostrar mensagem de boas-vindas
    setTimeout(() => {
        showToast('Sistema de promoção para administrador carregado com sucesso!', 'success');
    }, 1000);
});

// ===== CONFIGURAR EVENT LISTENERS =====
function setupEventListeners() {
    // Busca de funcionários
    employeeSearch.addEventListener('input', debounce((e) => {
        employeeSearchTerm = e.target.value.toLowerCase();
        renderEmployees();
    }, 300));
    
    // Botão histórico
    btnHistory.addEventListener('click', showHistory);
    
    // Botão atualizar
    btnRefresh.addEventListener('click', refreshData);
    
    // Botões do modal de histórico
    closeHistoryModal.addEventListener('click', closeHistoryModalFunc);
    btnCloseHistoryModal.addEventListener('click', closeHistoryModalFunc);
    
    // Filtro de histórico
    historyFilter.addEventListener('change', (e) => {
        selectedHistoryFilter = e.target.value;
        renderHistory();
    });
    
    // Botões do painel de promoção
    btnCancel.addEventListener('click', resetPromotionForm);
    btnPromote.addEventListener('click', showConfirmationModal);
    btnUndoPromotion.addEventListener('click', showUndoModal);
    
    // Campos do formulário
    newPosition.addEventListener('change', validateForm);
    accessLevel.addEventListener('change', validateForm);
    promotionReason.addEventListener('input', validateForm);
    
    // Modal de confirmação
    closeConfirmationModal.addEventListener('click', closeConfirmationModalFunc);
    btnCancelPromotion.addEventListener('click', closeConfirmationModalFunc);
    btnConfirmPromotion.addEventListener('click', confirmPromotion);
    
    // Modal de desfazer
    closeUndoModal.addEventListener('click', closeUndoModalFunc);
    btnCancelUndo.addEventListener('click', closeUndoModalFunc);
    btnConfirmUndo.addEventListener('click', confirmUndoPromotion);
    
    // Fechar modais clicando fora
    historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) {
            closeHistoryModalFunc();
        }
    });
    
    confirmationModal.addEventListener('click', (e) => {
        if (e.target === confirmationModal) {
            closeConfirmationModalFunc();
        }
    });
    
    undoModal.addEventListener('click', (e) => {
        if (e.target === undoModal) {
            closeUndoModalFunc();
        }
    });
    
    // Tecla ESC para fechar modais
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (historyModal.classList.contains('active')) {
                closeHistoryModalFunc();
            }
            if (confirmationModal.classList.contains('active')) {
                closeConfirmationModalFunc();
            }
            if (undoModal.classList.contains('active')) {
                closeUndoModalFunc();
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
    
    // Filtrar por busca
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
        const isEligible = checkEligibility(employee);
        const isSelected = selectedEmployee?.id === employee.id;
        const isAdmin = employee.userType === USER_TYPES.ADMIN;
        const isClient = employee.userType === USER_TYPES.CLIENT;
        
        const employeeCard = document.createElement('div');
        employeeCard.className = `employee-card ${isSelected ? 'selected' : ''}`;
        
        employeeCard.innerHTML = `
            <div class="employee-info">
                <div class="employee-avatar">${employee.avatarInitials}</div>
                <div class="employee-details">
                    <h6 class="employee-name">${employee.name}</h6>
                    <p class="employee-role">
                        <i class="fas fa-briefcase me-1 text-muted"></i>${employee.role}
                        <span class="badge-${employee.userType} user-type-badge ms-2">
                            <i class="fas fa-${employee.userType === USER_TYPES.ADMIN ? 'user-shield' : employee.userType === USER_TYPES.EMPLOYEE ? 'user-tie' : 'user'}"></i>
                            ${employee.userType === USER_TYPES.ADMIN ? 'Administrador' : employee.userType === USER_TYPES.EMPLOYEE ? 'Funcionário' : 'Cliente'}
                        </span>
                    </p>
                </div>
            </div>
            <div class="employee-stats">
                <div class="stat-item">
                    <div class="employee-stat-number">${employee.tenure} anos</div>
                    <div class="employee-stat-label">Tempo</div>
                </div>
                <div class="stat-item">
                    <div class="employee-stat-number">${employee.performance}%</div>
                    <div class="employee-stat-label">Desempenho</div>
                </div>
                <div class="stat-item">
                    <div class="employee-stat-number ${isEligible ? 'text-success' : 'text-danger'}">
                        <i class="fas fa-${isEligible ? 'check' : 'times'}"></i>
                    </div>
                    <div class="employee-stat-label">Elegível</div>
                </div>
            </div>
        `;
        
        employeeCard.addEventListener('click', () => {
            selectEmployee(employee);
        });
        
        employeesContainer.appendChild(employeeCard);
    });
}

// ===== SELECIONAR FUNCIONÁRIO =====
function selectEmployee(employee) {
    // Remover seleção anterior
    document.querySelectorAll('.employee-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Selecionar novo
    selectedEmployee = employee;
    
    // Atualizar painel de promoção
    updatePromotionPanel(employee);
    
    // Atualizar informações
    updateEmployeeInfo(employee);
    
    // Atualizar botão desfazer
    updateUndoButton();
}

// ===== ATUALIZAR PAINEL DE PROMOÇÃO =====
function updatePromotionPanel(employee) {
    if (!employee) return;
    
    // Atualizar informações básicas
    promoEmployeeAvatar.innerHTML = employee.avatarInitials;
    promoEmployeeName.textContent = employee.name;
    promoEmployeeRole.textContent = employee.role;
    promoEmployeeDept.textContent = getDepartmentText(employee.department);
    promoEmployeeTenure.textContent = `${employee.tenure} anos`;
    promoEmployeeType.textContent = getUserTypeText(employee.userType);
    
    // Se for administrador, preencher campos com dados atuais
    if (employee.userType === USER_TYPES.ADMIN) {
        newPosition.value = employee.adminLevel || '';
        accessLevel.value = employee.accessLevel || '';
    } else {
        // Resetar campos
        newPosition.value = '';
        accessLevel.value = '';
    }
    
    // Habilitar/desabilitar botão de promoção
    validateForm();
}

// ===== ATUALIZAR INFORMAÇÕES DO FUNCIONÁRIO =====
function updateEmployeeInfo(employee) {
    if (!employee) {
        // Resetar informações
        eligibilityStatus.textContent = 'Selecione um funcionário para verificar elegibilidade';
        eligibilityStatus.className = 'status-text pending';
        
        infoTenure.textContent = '-';
        infoPerformance.textContent = '-';
        infoTraining.textContent = '-';
        infoWarning.textContent = '-';
        
        return;
    }
    
    // Verificar elegibilidade
    const isEligible = checkEligibility(employee);
    
    if (employee.userType === USER_TYPES.ADMIN) {
        eligibilityStatus.textContent = 'Este funcionário já é administrador';
        eligibilityStatus.className = 'status-text not-eligible';
    } else if (isEligible) {
        eligibilityStatus.textContent = 'Funcionário elegível para promoção para administrador!';
        eligibilityStatus.className = 'status-text eligible';
    } else {
        eligibilityStatus.textContent = 'Funcionário não elegível para promoção para administrador';
        eligibilityStatus.className = 'status-text not-eligible';
    }
    
    // Atualizar informações básicas
    infoTenure.textContent = `${employee.tenure} anos`;
    infoPerformance.textContent = `${employee.performance}%`;
    infoTraining.textContent = employee.hasManagementTraining ? 'Concluído' : 'Não concluído';
    infoWarning.textContent = employee.lastWarning ? formatDate(employee.lastWarning) : 'Nenhuma';
}

// ===== VERIFICAR ELEGIBILIDADE =====
function checkEligibility(employee) {
    if (!employee) return false;
    
    // Verificar se já é administrador
    if (employee.userType === USER_TYPES.ADMIN) return false;
    
    // Verificar se é cliente
    if (employee.userType === USER_TYPES.CLIENT) return false;
    
    // Regras de elegibilidade para administrador
    const hasMinimumTenure = employee.tenure >= 2;
    const hasGoodPerformance = employee.performance >= 85;
    const hasTraining = employee.hasManagementTraining;
    const noRecentWarnings = !employee.lastWarning || 
        new Date(employee.lastWarning) < new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000);
    
    return hasMinimumTenure && hasGoodPerformance && hasTraining && noRecentWarnings;
}

// ===== ATUALIZAR BOTÃO DESFAZER =====
function updateUndoButton() {
    if (selectedEmployee && selectedEmployee.userType === USER_TYPES.ADMIN) {
        btnUndoPromotion.disabled = false;
    } else {
        btnUndoPromotion.disabled = true;
    }
}

// ===== VALIDAR FORMULÁRIO =====
function validateForm() {
    if (!selectedEmployee) {
        btnPromote.disabled = true;
        return false;
    }
    
    // Se já for administrador, não pode promover novamente
    if (selectedEmployee.userType === USER_TYPES.ADMIN) {
        btnPromote.disabled = true;
        return false;
    }
    
    // Se for cliente, não pode promover
    if (selectedEmployee.userType === USER_TYPES.CLIENT) {
        btnPromote.disabled = true;
        return false;
    }
    
    const isFormValid = 
        newPosition.value !== '' && 
        accessLevel.value !== '' &&
        promotionReason.value.trim().length >= 10;
    
    const isEmployeeEligible = checkEligibility(selectedEmployee);
    
    btnPromote.disabled = !(isFormValid && isEmployeeEligible);
    return isFormValid && isEmployeeEligible;
}

// ===== RESETAR FORMULÁRIO =====
function resetPromotionForm() {
    selectedEmployee = null;
    
    // Remover seleção
    document.querySelectorAll('.employee-card.selected').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Resetar formulário
    newPosition.value = '';
    accessLevel.value = '';
    promotionReason.value = '';
    
    // Resetar painel
    promoEmployeeAvatar.innerHTML = '<i class="fas fa-user"></i>';
    promoEmployeeName.textContent = 'Nenhum funcionário selecionado';
    promoEmployeeRole.textContent = 'Selecione um funcionário na lista ao lado';
    promoEmployeeDept.textContent = '-';
    promoEmployeeTenure.textContent = '-';
    promoEmployeeType.textContent = '-';
    
    // Resetar informações
    updateEmployeeInfo(null);
    
    // Desabilitar botões
    btnPromote.disabled = true;
    btnUndoPromotion.disabled = true;
}

// ===== ATUALIZAR DADOS =====
function refreshData() {
    // Animação de loading
    const originalHTML = btnRefresh.innerHTML;
    btnRefresh.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btnRefresh.disabled = true;
    
    setTimeout(() => {
        renderEmployees();
        btnRefresh.innerHTML = originalHTML;
        btnRefresh.disabled = false;
        showToast('Dados atualizados com sucesso!', 'success');
    }, 800);
}

// ===== MOSTRAR MODAL DE CONFIRMAÇÃO =====
function showConfirmationModal() {
    if (!validateForm()) {
        showToast('Preencha todos os campos obrigatórios e selecione um funcionário elegível', 'warning');
        return;
    }
    
    // Criar conteúdo do modal
    confirmationModalBody.innerHTML = `
        <div class="confirmation-details">
            <div class="detail-section">
                <h5><i class="fas fa-user-shield"></i> Detalhes da Promoção</h5>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Funcionário:</span>
                        <span class="detail-value">${selectedEmployee.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Cargo Atual:</span>
                        <span class="detail-value">${selectedEmployee.role}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nível de Administrador:</span>
                        <span class="detail-value">${getPositionText(newPosition.value)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nível de Acesso:</span>
                        <span class="detail-value">Nível ${accessLevel.value}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Data da Promoção:</span>
                        <span class="detail-value">${formatDate(promotionDate.value)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h5><i class="fas fa-comment-alt"></i> Motivo</h5>
                <div class="justification">
                    <p>${promotionReason.value}</p>
                </div>
            </div>
            
            <div class="warning-note" style="background: rgba(0, 166, 255, 0.05); border: 1px solid rgba(0, 166, 255, 0.2); padding: 15px; border-radius: var(--radius-md); margin-top: 20px;">
                <i class="fas fa-exclamation-triangle" style="color: var(--primary-blue);"></i>
                <span><strong>Atenção:</strong> Esta ação concederá acesso administrativo completo ao sistema.</span>
            </div>
        </div>
    `;
    
    confirmationModal.classList.add('active');
}

// ===== CONFIRMAR PROMOÇÃO =====
function confirmPromotion() {
    if (!selectedEmployee) {
        showToast('Nenhum funcionário selecionado', 'error');
        return;
    }
    
    // Criar registro de promoção
    const promotionRecord = {
        id: promotionHistory.length + 1,
        employeeId: selectedEmployee.id,
        employeeName: selectedEmployee.name,
        oldRole: selectedEmployee.role,
        oldUserType: selectedEmployee.userType,
        newRole: selectedEmployee.role,
        adminLevel: newPosition.value,
        accessLevel: accessLevel.value,
        promotionDate: promotionDate.value,
        reason: promotionReason.value,
        approvedBy: "Administrador Sistema",
        status: "active",
        undoDate: null,
        undoneBy: null
    };
    
    // Adicionar ao histórico
    promotionHistory.push(promotionRecord);
    
    // Atualizar dados do funcionário
    const employeeIndex = employees.findIndex(e => e.id === selectedEmployee.id);
    if (employeeIndex !== -1) {
        // Atualizar dados
        employees[employeeIndex].userType = USER_TYPES.ADMIN;
        employees[employeeIndex].isAdmin = true;
        employees[employeeIndex].lastPromotion = promotionRecord.promotionDate;
        employees[employeeIndex].adminLevel = promotionRecord.adminLevel;
        employees[employeeIndex].accessLevel = promotionRecord.accessLevel;
    }
    
    // Mostrar notificação
    showToast(`${selectedEmployee.name} foi promovido(a) com sucesso para ${getPositionText(newPosition.value)}!`, 'success');
    
    // Fechar modal
    closeConfirmationModalFunc();
    
    // Atualizar interface
    renderEmployees();
    updatePromotionPanel(selectedEmployee);
    updateEmployeeInfo(selectedEmployee);
    updateUndoButton();
    renderHistory();
}

// ===== MOSTRAR MODAL DESFAZER =====
function showUndoModal() {
    if (!selectedEmployee || selectedEmployee.userType !== USER_TYPES.ADMIN) {
        showToast('Selecione um administrador para desfazer a promoção', 'warning');
        return;
    }
    
    // Encontrar a última promoção ativa do funcionário
    const lastPromotion = promotionHistory
        .filter(p => p.employeeId === selectedEmployee.id && p.status === "active")
        .sort((a, b) => new Date(b.promotionDate) - new Date(a.promotionDate))[0];
    
    if (!lastPromotion) {
        showToast('Não foi encontrada promoção ativa para este funcionário', 'warning');
        return;
    }
    
    lastPromotionUndone = lastPromotion;
    
    // Criar conteúdo do modal
    undoModalBody.innerHTML = `
        <div class="confirmation-details">
            <div class="detail-section">
                <h5><i class="fas fa-exclamation-triangle text-warning"></i> Confirmar Desfazer Promoção</h5>
                <div class="warning-note" style="background: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.3); padding: 15px; border-radius: var(--radius-md); margin-bottom: 20px;">
                    <i class="fas fa-exclamation-triangle" style="color: var(--warning-orange);"></i>
                    <span><strong>Atenção:</strong> Esta ação removerá os privilégios administrativos do funcionário.</span>
                </div>
                
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Funcionário:</span>
                        <span class="detail-value">${selectedEmployee.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Cargo Atual:</span>
                        <span class="detail-value">${selectedEmployee.role}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Nível de Administrador:</span>
                        <span class="detail-value">${getPositionText(lastPromotion.adminLevel)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Data da Promoção:</span>
                        <span class="detail-value">${formatDate(lastPromotion.promotionDate)}</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h5><i class="fas fa-history"></i> Esta ação irá:</h5>
                <ul style="padding-left: 20px; margin-bottom: 0;">
                    <li>Reverter o status para "${getUserTypeText(lastPromotion.oldUserType)}"</li>
                    <li>Remover privilégios administrativos</li>
                    <li>Restaurar o tipo de usuário anterior</li>
                    <li>Marcar a promoção como desfeita no histórico</li>
                </ul>
            </div>
        </div>
    `;
    
    undoModal.classList.add('active');
}

// ===== CONFIRMAR DESFAZER PROMOÇÃO =====
function confirmUndoPromotion() {
    if (!lastPromotionUndone || !selectedEmployee) {
        showToast('Erro ao processar desfazer promoção', 'error');
        return;
    }
    
    // Atualizar registro de promoção
    const promotionIndex = promotionHistory.findIndex(p => p.id === lastPromotionUndone.id);
    if (promotionIndex !== -1) {
        promotionHistory[promotionIndex].status = "undone";
        promotionHistory[promotionIndex].undoDate = new Date().toISOString().split('T')[0];
        promotionHistory[promotionIndex].undoneBy = "Administrador Sistema";
    }
    
    // Atualizar dados do funcionário
    const employeeIndex = employees.findIndex(e => e.id === selectedEmployee.id);
    if (employeeIndex !== -1) {
        // Reverter para tipo de usuário anterior
        employees[employeeIndex].userType = lastPromotionUndone.oldUserType;
        employees[employeeIndex].isAdmin = false;
        employees[employeeIndex].adminLevel = null;
        employees[employeeIndex].accessLevel = null;
    }
    
    // Mostrar notificação
    showToast(`Promoção de ${selectedEmployee.name} desfeita com sucesso!`, 'success');
    
    // Fechar modal
    closeUndoModalFunc();
    
    // Atualizar interface
    renderEmployees();
    updatePromotionPanel(selectedEmployee);
    updateEmployeeInfo(selectedEmployee);
    updateUndoButton();
    renderHistory();
    
    lastPromotionUndone = null;
}

// ===== MOSTRAR HISTÓRICO =====
function showHistory() {
    renderHistory();
    historyModal.classList.add('active');
}

function closeHistoryModalFunc() {
    historyModal.classList.remove('active');
}

function closeConfirmationModalFunc() {
    confirmationModal.classList.remove('active');
}

function closeUndoModalFunc() {
    undoModal.classList.remove('active');
}

// ===== RENDERIZAR HISTÓRICO =====
function renderHistory() {
    historyList.innerHTML = '';
    
    // Filtrar histórico
    let filteredHistory = [...promotionHistory];
    
    if (selectedHistoryFilter === 'last-month') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        
        filteredHistory = promotionHistory.filter(record => {
            const recordDate = new Date(record.promotionDate);
            return recordDate >= oneMonthAgo;
        });
    } else if (selectedHistoryFilter === 'last-year') {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
        filteredHistory = promotionHistory.filter(record => {
            const recordDate = new Date(record.promotionDate);
            return recordDate >= oneYearAgo;
        });
    } else if (selectedHistoryFilter === 'active') {
        filteredHistory = promotionHistory.filter(record => 
            record.status === "active"
        );
    } else if (selectedHistoryFilter === 'undone') {
        filteredHistory = promotionHistory.filter(record => 
            record.status === "undone"
        );
    }
    
    // Se não houver histórico
    if (filteredHistory.length === 0) {
        historyList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-history fa-3x mb-3"></i>
                <h5 class="text-muted">Nenhuma promoção encontrada</h5>
                <p class="text-muted">Nenhuma promoção corresponde aos filtros selecionados</p>
            </div>
        `;
        return;
    }
    
    // Ordenar por data (mais recente primeiro)
    filteredHistory.sort((a, b) => new Date(b.promotionDate) - new Date(a.promotionDate));
    
    // Renderizar cada item
    filteredHistory.forEach(record => {
        const isUndone = record.status === "undone";
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${isUndone ? 'undo' : record.adminLevel === 'usuario_cliente' ? 'client' : 'admin'}`;
        
        historyItem.innerHTML = `
            <div class="history-header">
                <div class="history-employee">${record.employeeName}</div>
                <div class="history-date">${formatDate(record.promotionDate)}</div>
            </div>
            <div class="history-details">
                <div class="history-detail">
                    <i class="fas fa-arrow-right"></i>
                    <span><strong>${getUserTypeText(record.oldUserType)}</strong> → <strong style="color: ${isUndone ? 'var(--warning-orange)' : record.adminLevel === 'usuario_cliente' ? 'var(--success-green)' : 'var(--primary-blue)'};">${isUndone ? 'DESFEITO' : getPositionText(record.adminLevel)}</strong></span>
                </div>
                <div class="history-detail">
                    <i class="fas fa-user-tag"></i>
                    <span>${isUndone ? `${getPositionText(record.adminLevel)} → ${getUserTypeText(record.oldUserType)}` : `${getUserTypeText(record.oldUserType)} → ${getPositionText(record.adminLevel)}`}</span>
                </div>
                <div class="history-detail">
                    <i class="fas fa-key"></i>
                    <span>Nível de Acesso: ${record.accessLevel}</span>
                </div>
            </div>
            ${record.reason ? `
                <div class="history-reason">
                    <strong>Motivo:</strong> ${record.reason}
                </div>
            ` : ''}
            <div class="mt-2">
                <small class="text-muted">
                    <i class="fas fa-user-check"></i> ${isUndone ? 'Desfeito por' : 'Aprovado por'}: ${isUndone ? record.undoneBy : record.approvedBy}
                    ${isUndone && record.undoDate ? ` em ${formatDate(record.undoDate)}` : ''}
                </small>
            </div>
        `;
        
        historyList.appendChild(historyItem);
    });
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

function getDepartmentText(department) {
    const map = { 
        'ti': 'Tecnologia da Informação', 
        'rh': 'Recursos Humanos', 
        'financeiro': 'Financeiro', 
        'vendas': 'Vendas',
        'marketing': 'Marketing',
        'administracao': 'Administração'
    };
    return map[department] || department;
}

function getPositionText(position) {
    const map = { 
        'admin_sistema': 'Administrador de Sistema',
        'usuario_cliente': 'Usuário Cliente',
        'usuario_funcionario': 'Usuário Funcionário Citiesoft'
    };
    return map[position] || position;
}

function getUserTypeText(userType) {
    const map = { 
        'admin': 'Administrador',
        'employee': 'Funcionário',
        'client': 'Cliente'
    };
    return map[userType] || userType;
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type} show`;
    
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-header">
            <div class="toast-title">
                <i class="fas fa-${icons[type] || 'info-circle'}"></i>
                ${type === 'success' ? 'Sucesso!' : type === 'error' ? 'Erro!' : type === 'warning' ? 'Atenção!' : 'Informação!'}
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