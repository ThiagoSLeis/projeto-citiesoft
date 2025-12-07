// ===== DADOS DO CLIENTE =====
const meusTickets = [
    { id: 'TK-2025-015', assunto: 'Impressora não reconhece', status: 'Em Andamento', data: '15/01/2025', prioridade: 'Alta', tecnico: 'Marcos Tech' },
    { id: 'TK-2025-014', assunto: 'Acesso ao sistema ERP', status: 'Aberto', data: '14/01/2025', prioridade: 'Normal', tecnico: 'Paula Lima' },
    { id: 'TK-2025-012', assunto: 'Problema com e-mail', status: 'Resolvido', data: '12/01/2025', prioridade: 'Alta', tecnico: 'Roberto Net' },
    { id: 'TK-2025-010', assunto: 'Instalação de software', status: 'Resolvido', data: '10/01/2025', prioridade: 'Baixa', tecnico: 'Carla Silva' },
    { id: 'TK-2025-008', assunto: 'Computador lento', status: 'Resolvido', data: '08/01/2025', prioridade: 'Normal', tecnico: 'João Santos' }
];

const meusEquipamentos = [
    { patrimonio: 'NB-2024-001', tipo: 'Notebook', modelo: 'Dell Latitude 5420', status: 'Ativo', garantia: 'Até 15/12/2025' },
    { patrimonio: 'DT-2024-002', tipo: 'Desktop', modelo: 'HP ProDesk 400', status: 'Ativo', garantia: 'Até 20/10/2025' },
    { patrimonio: 'IMP-2024-003', tipo: 'Impressora', modelo: 'Epson L3150', status: 'Manutenção', garantia: 'Até 30/06/2025' },
    { patrimonio: 'MN-2023-005', tipo: 'Monitor', modelo: 'LG 24" UltraGear', status: 'Ativo', garantia: 'Expirada' }
];

const baseConhecimento = [
    { titulo: 'Como acessar o sistema ERP remotamente', categoria: 'Dicionário de Software', visualizacoes: '245' },
    { titulo: 'Solução para problemas de impressão com Epson', categoria: 'FAQ', visualizacoes: '189' },
    { titulo: 'Configuração de VPN para home office', categoria: 'Dicionário de Software', visualizacoes: '156' },
    { titulo: 'Como usar a assinatura digital no sistema', categoria: 'FAQ', visualizacoes: '132' }
];

// ===== CONTROLE DOS SUBMENUS =====
let menuAberto = null;

function toggleSubMenu(element) {
    const submenu = element.nextElementSibling;
    const arrow = element.querySelector('.dropdown-arrow');
    
    // Fecha o submenu anterior se estiver aberto
    if (menuAberto && menuAberto !== element) {
        menuAberto.classList.remove('collapsed');
        const submenuAnterior = menuAberto.nextElementSibling;
        submenuAnterior.classList.remove('show');
        const arrowAnterior = menuAberto.querySelector('.dropdown-arrow');
        arrowAnterior.style.transform = 'rotate(0deg)';
    }
    
    // Alterna o estado do submenu atual
    element.classList.toggle('collapsed');
    submenu.classList.toggle('show');
    
    // Rotaciona a seta
    if (element.classList.contains('collapsed')) {
        arrow.style.transform = 'rotate(-90deg)';
        menuAberto = element;
    } else {
        arrow.style.transform = 'rotate(0deg)';
        menuAberto = null;
    }
    
    // No mobile, não fecha outros submenus automaticamente
    if (window.innerWidth <= 768) {
        return;
    }
}

function setActive(element) {
    // Remove active de todos os itens
    document.querySelectorAll('.nav-link').forEach(item => {
        item.classList.remove('active');
    });
    
    // Adiciona active ao item clicado
    element.classList.add('active');
    
    // Fecha sidebar no mobile
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Reseta menu aberto quando sidebar fecha
    if (!sidebar.classList.contains('active')) {
        menuAberto = null;
    }
}

function logout() {
    if (confirm('Deseja realmente sair do sistema?')) {
        alert('Saindo do sistema...');
        // Redirecionar para página de login
        // window.location.href = '/login';
    }
}

// ===== FUNÇÕES DE SUPORTE =====
function abrirEmailSuporte() {
    // Abre diretamente o cliente de email padrão do usuário
    window.location.href = 'mailto:suporte@citiesoft.com?subject=Suporte%20Citiesoft&body=Olá,%20preciso%20de%20ajuda%20com:';
    
    // Fecha sidebar no mobile após clicar
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
    
    // Ativa o item do menu
    const menuItem = document.querySelector('.nav-link[onclick*="abrirEmailSuporte"]');
    if (menuItem) {
        setActive(menuItem);
    }
}

function abrirChamadoTelefonico() {
    // Em dispositivos móveis, tenta abrir o discador
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = 'tel:+5511999998888';
    } else {
        alert('Telefone: (11) 9999-8888\nLigue para nosso suporte!');
    }
    
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

function verHorarioAtendimento() {
    alert('Horário de Atendimento:\n\nSegunda a Sexta: 8h às 18h\nSábado: 9h às 13h\nDomingo: Fechado\n\nEmergências: 24h por dia');
    
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }
}

// ===== FUNÇÕES DE INVENTÁRIOS =====
function verMeusTickets() {
    alert('Abrindo página de Meus Tickets...');
}

function verInventarios() {
    alert('Abrindo página de Inventários...');
}

// ===== FUNÇÕES DE RELATÓRIOS =====
function abrirRelatoriosTickets() {
    alert('Abrindo Relatório de Tickets...');
}

function abrirRelatoriosEquipamentos() {
    alert('Abrindo Relatório de Equipamentos...');
}

function abrirRelatoriosSLA() {
    alert('Abrindo Relatório de SLA...');
}

// ===== FUNÇÕES DE BASE DE CONHECIMENTO =====
function verDicionarioSoftware() {
    alert('Abrindo dicionário de software...');
}

function verFAQ() {
    alert('Abrindo FAQ...');
}

function verBaseConhecimento() {
    alert('Abrindo base de conhecimento...');
}

// ===== FUNÇÕES DE INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Atualizar data atual
    atualizarData();
    
    // Popular dados
    popularMeusTickets();
    popularEquipamentos();
    popularBaseConhecimento();
    
    // Adicionar efeito de fade-in nos cards
    document.querySelectorAll('.content-card, .stat-card').forEach(card => {
        card.classList.add('fade-in');
    });

    // Fechar sidebar se clicar fora (mobile)
    document.querySelector('.overlay').addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    });

    // Ajustar sidebar quando redimensionar
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
            menuAberto = null;
            
            // Reseta todos os submenus
            document.querySelectorAll('.menu-toggle').forEach(item => {
                item.classList.remove('collapsed');
                const arrow = item.querySelector('.dropdown-arrow');
                arrow.style.transform = 'rotate(0deg)';
            });
            
            document.querySelectorAll('.submenu').forEach(submenu => {
                submenu.classList.remove('show');
            });
        }
    });

    // Fecha submenus ao clicar fora no mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 768 && menuAberto) {
            const clickedInsideMenu = event.target.closest('.menu-toggle') || 
                                    event.target.closest('.submenu');
            if (!clickedInsideMenu) {
                menuAberto.classList.remove('collapsed');
                const submenu = menuAberto.nextElementSibling;
                submenu.classList.remove('show');
                const arrow = menuAberto.querySelector('.dropdown-arrow');
                arrow.style.transform = 'rotate(0deg)';
                menuAberto = null;
            }
        }
    });
});

function atualizarData() {
    const currentDateElement = document.getElementById('currentDate');
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = now.toLocaleDateString('pt-BR', options);
}

// ===== POPULAR DADOS =====
function popularMeusTickets() {
    const tabela = document.getElementById('meusTicketsTable');
    tabela.innerHTML = '';
    
    meusTickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${ticket.id}</strong></td>
            <td>${ticket.assunto}</td>
            <td><span class="badge ${getStatusClassCliente(ticket.status)}">${ticket.status}</span></td>
            <td>${ticket.data}</td>
            <td><span class="badge ${getPriorityClassCliente(ticket.prioridade)}">${ticket.prioridade}</span></td>
            <td>${ticket.tecnico}</td>
            <td>
                <button class="btn btn-outline-primary btn-sm" onclick="verDetalhesTicket('${ticket.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        tabela.appendChild(row);
    });
}

function popularEquipamentos() {
    const grid = document.getElementById('equipamentosGrid');
    grid.innerHTML = '';
    
    meusEquipamentos.forEach(equipamento => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-6 mb-3';
        col.innerHTML = `
            <div class="equipamento-card ${equipamento.status === 'Manutenção' ? 'manutencao' : ''}">
                <div class="equipamento-icon">
                    <i class="fas fa-${getEquipamentoIcon(equipamento.tipo)}"></i>
                </div>
                <div class="equipamento-info">
                    <h6>${equipamento.tipo}</h6>
                    <p class="mb-1"><small>${equipamento.modelo}</small></p>
                    <p class="mb-1"><strong>${equipamento.patrimonio}</strong></p>
                    <span class="badge ${getStatusClassCliente(equipamento.status)}">${equipamento.status}</span>
                    <p class="mt-2"><small>Garantia: ${equipamento.garantia}</small></p>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

function popularBaseConhecimento() {
    const grid = document.getElementById('artigosGrid');
    grid.innerHTML = '';
    
    baseConhecimento.forEach(artigo => {
        const col = document.createElement('div');
        col.className = 'col-md-3 col-sm-6 mb-3';
        col.innerHTML = `
            <div class="artigo-card">
                <div class="artigo-categoria">${artigo.categoria}</div>
                <div class="artigo-titulo">${artigo.titulo}</div>
                <div class="artigo-footer">
                    <span><i class="fas fa-eye"></i> ${artigo.visualizacoes}</span>
                    <button class="btn btn-sm btn-link p-0 text-decoration-none" onclick="abrirArtigo()">Ler mais</button>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

// ===== FUNÇÕES AUXILIARES =====
function getEquipamentoIcon(tipo) {
    switch(tipo.toLowerCase()) {
        case 'notebook': return 'laptop';
        case 'desktop': return 'desktop';
        case 'impressora': return 'print';
        case 'monitor': return 'tv';
        default: return 'laptop';
    }
}

function getStatusClassCliente(status) {
    switch(status) {
        case 'Aberto': return 'bg-warning';
        case 'Em Andamento': return 'bg-primary';
        case 'Resolvido': return 'bg-success';
        case 'Ativo': return 'bg-success';
        case 'Manutenção': return 'bg-warning';
        default: return 'bg-secondary';
    }
}

function getPriorityClassCliente(prioridade) {
    switch(prioridade) {
        case 'Baixa': return 'bg-info';
        case 'Normal': return 'bg-success';
        case 'Alta': return 'bg-warning';
        case 'Urgente': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

// ===== FUNÇÕES DE AÇÃO =====
function verDetalhesTicket(ticketId) {
    alert(`Abrindo detalhes do ticket: ${ticketId}`);
}

function abrirTicket() {
    alert('Ticket enviado com sucesso! Você receberá um e-mail de confirmação.');
    bootstrap.Modal.getInstance(document.getElementById('novoTicketModal')).hide();
}

function abrirArtigo() {
    alert('Abrindo artigo...');
}

function openModal(modalId) {
    const modal = new bootstrap.Modal(document.getElementById(modalId));
    modal.show();
}

// ===== ATUALIZAÇÃO EM TEMPO REAL =====
function simularAtualizacao() {
    // Simula atualização de notificações a cada 30 segundos
    setInterval(() => {
        const agora = new Date();
        console.log(`Dashboard atualizado em: ${agora.toLocaleTimeString()}`);
    }, 30000);
}

// Iniciar simulação de atualização
simularAtualizacao();