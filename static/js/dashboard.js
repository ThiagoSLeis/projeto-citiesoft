// static/js/dashboard.js - VERSÃO 100% FUNCIONAL

// ===== ESTRUTURA DE DADOS PARA O MENU DINÂMICO =====
const menuConfig = [
    {
        id: 'painel',
        title: 'Painel Principal',
        icon: 'fas fa-tachometer-alt',
        url: '#',
        active: true,
        submenu: null
    },
    {
        id: 'inventarios',
        title: 'Inventários',
        icon: 'fas fa-clipboard-list',
        url: '#',
        active: false,
        submenu: [
            {
                id: 'inventario-ativos',
                title: 'Ativos',
                url: '#',
                icon: 'fas fa-laptop'
            },
            {
                id: 'inventario-tickets',
                title: 'Tickets',
                url: '#',
                icon: 'fas fa-ticket-alt'
            },
            {
                id: 'inventario-chamados',
                title: 'Chamados (OCS)',
                url: '#',
                icon: 'fas fa-headset'
            }
        ]
    },
    {
        id: 'relatorios',
        title: 'Relatórios',
        icon: 'fas fa-file-alt',
        url: '#',
        active: false,
        submenu: [
            {
                id: 'relatorio-ativos',
                title: 'Relatório de Ativos',
                url: '#',
                icon: 'fas fa-laptop'
            },
            {
                id: 'relatorio-tickets',
                title: 'Relatório de Tickets',
                url: '#',
                icon: 'fas fa-ticket-alt'
            },
            {
                id: 'relatorio-usuarios',
                title: 'Relatório de Usuários',
                url: '#',
                icon: 'fas fa-users'
            },
            {
                id: 'relatorio-analise',
                title: 'Análise e Métricas',
                url: '#',
                icon: 'fas fa-chart-pie'
            }
        ]
    },
    {
        id: 'cadastros',
        title: 'Cadastros',
        icon: 'fas fa-edit',
        url: '#',
        active: false,
        submenu: [
            {
                id: 'cadastro-usuarios',
                title: 'Usuários',
                url: '#',
                icon: 'fas fa-user-cog'
            },
            {
                id: 'cadastro-clientes',
                title: 'Clientes',
                url: '#',
                icon: 'fas fa-user'
            },
            {
                id: 'cadastro-ativos',
                title: 'Ativos',
                url: '#',
                icon: 'fas fa-laptop'
            },
            {
                id: 'cadastro-fornecedores',
                title: 'Fornecedores',
                url: '#',
                icon: 'fas fa-truck'
            }
        ]
    },
    {
        id: 'configuracoes',
        title: 'Configurações',
        icon: 'fas fa-cogs',
        url: '#',
        active: false,
        submenu: [
            {
                id: 'config-geral',
                title: 'Configurações Gerais',
                url: '#',
                icon: 'fas fa-sliders-h'
            },
            {
                id: 'config-perfis',
                title: 'Perfis de Acesso',
                url: '#',
                icon: 'fas fa-user-shield'
            }
        ]
    },
    {
        id: 'base-conhecimento',
        title: 'Base de Conhecimento',
        icon: 'fas fa-book',
        url: '#',
        active: false,
        submenu: [
            {
                id: 'dicas-manutencao',
                title: 'Dicas de Manutenção',
                url: '#',
                icon: 'fas fa-tools'
            },
            {
                id: 'glossario',
                title: 'Glossário',
                url: '#',
                icon: 'fas fa-book-open'
            },
            {
                id: 'dicionario-software',
                title: 'Dicionário de Software',
                url: '#',
                icon: 'fas fa-laptop-code'
            },
            {
                id: 'artigos',
                title: 'Artigos',
                url: '#',
                icon: 'fas fa-newspaper'
            }
        ]
    },
    {
        id: 'suporte',
        title: 'Suporte',
        icon: 'fas fa-life-ring',
        url: '#',
        active: false,
        submenu: [
            {
                id: 'suporte-contato',
                title: 'Contato Suporte',
                url: '#',
                icon: 'fas fa-headset'
            }
        ]
    }
];

// ===== INICIALIZAÇÃO DO DASHBOARD =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIANDO DASHBOARD CITIESOFT ===');
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const dynamicMenu = document.getElementById('dynamicMenu');

    // Função para construir o menu dinâmico - VERSÃO 100% FUNCIONAL
    function buildDynamicMenu() {
        if (!dynamicMenu) {
            console.log('Menu dinâmico não encontrado');
            return;
        }
        
        console.log('Construindo menu dinâmico...');
        dynamicMenu.innerHTML = '';
        
        menuConfig.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'nav-item';
            
            if (item.submenu && item.submenu.length > 0) {
                // Item com submenu - VERSÃO COMPLETAMENTE FUNCIONAL
                const menuLink = document.createElement('a');
                menuLink.className = `nav-link menu-toggle ${item.active ? 'active' : ''}`;
                menuLink.href = item.url;
                menuLink.setAttribute('role', 'button');
                menuLink.setAttribute('aria-expanded', 'false');
                menuLink.innerHTML = `
                    <i class="${item.icon}"></i> 
                    <span class="menu-text">${item.title}</span>
                    <i class="fas fa-chevron-down dropdown-arrow ms-auto"></i>
                `;
                
                const submenuDiv = document.createElement('div');
                submenuDiv.className = 'submenu collapse';
                submenuDiv.id = `submenu-${item.id}`;
                
                const submenuList = document.createElement('ul');
                submenuList.className = 'nav flex-column';
                
                item.submenu.forEach(subItem => {
                    const subListItem = document.createElement('li');
                    subListItem.className = 'nav-item';
                    
                    const subLink = document.createElement('a');
                    subLink.className = 'nav-link';
                    subLink.href = subItem.url;
                    subLink.innerHTML = `
                        <i class="${subItem.icon}"></i> 
                        <span class="menu-text">${subItem.title}</span>
                    `;
                    
                    subListItem.appendChild(subLink);
                    submenuList.appendChild(subListItem);
                });
                
                submenuDiv.appendChild(submenuList);
                listItem.appendChild(menuLink);
                listItem.appendChild(submenuDiv);

                // EVENTO TOTALMENTE CORRIGIDO - FUNCIONA EM MOBILE E DESKTOP
                menuLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const isMobile = window.innerWidth <= 768;
                    const isCurrentlyOpen = submenuDiv.classList.contains('show');
                    
                    console.log(`Submenu click: ${item.id}, Mobile: ${isMobile}, Aberto: ${isCurrentlyOpen}`);
                    
                    if (isMobile) {
                        // COMPORTAMENTO MOBILE - CORREÇÃO TOTAL
                        if (!isCurrentlyOpen) {
                            // Fecha todos os outros submenus
                            const allSubmenus = document.querySelectorAll('.submenu');
                            const allMenuToggles = document.querySelectorAll('.menu-toggle');
                            
                            allSubmenus.forEach(sub => {
                                if (sub !== submenuDiv) {
                                    sub.classList.remove('show');
                                }
                            });
                            
                            allMenuToggles.forEach(toggle => {
                                if (toggle !== menuLink) {
                                    toggle.classList.add('collapsed');
                                }
                            });
                        }
                        
                        // Alterna o submenu atual
                        submenuDiv.classList.toggle('show');
                        menuLink.classList.toggle('collapsed');
                        
                    } else {
                        // COMPORTAMENTO DESKTOP
                        if (!isCurrentlyOpen) {
                            // Fecha outros submenus abertos
                            const allSubmenus = document.querySelectorAll('.submenu');
                            const allMenuToggles = document.querySelectorAll('.menu-toggle');
                            
                            allSubmenus.forEach(sub => {
                                if (sub !== submenuDiv) {
                                    sub.classList.remove('show');
                                }
                            });
                            
                            allMenuToggles.forEach(toggle => {
                                if (toggle !== menuLink && !toggle.classList.contains('collapsed')) {
                                    toggle.classList.add('collapsed');
                                }
                            });
                        }
                        
                        // Alterna o submenu atual
                        submenuDiv.classList.toggle('show');
                        menuLink.classList.toggle('collapsed');
                    }
                });
                
                // Adicionar evento para links do submenu (mobile)
                submenuDiv.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.stopPropagation();
                    }
                });
                
            } else {
                // Item simples sem submenu
                const menuLink = document.createElement('a');
                menuLink.className = `nav-link ${item.active ? 'active' : ''}`;
                menuLink.href = item.url;
                menuLink.innerHTML = `
                    <i class="${item.icon}"></i> 
                    <span class="menu-text">${item.title}</span>
                `;
                
                listItem.appendChild(menuLink);
            }
            
            // Aplicar delay de animação apenas no desktop
            const link = listItem.querySelector('.nav-link');
            if (link && window.innerWidth > 768) {
                link.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
            }
            
            dynamicMenu.appendChild(listItem);
        });
        
        console.log('Menu dinâmico construído com sucesso!');
    }

    // CORREÇÃO: Gerenciamento de clicks nos links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href="#"]');
        if (link && !link.classList.contains('menu-toggle')) {
            e.preventDefault();
        }
    });

    // Inicializar o menu
    buildDynamicMenu();

    // ===== CONFIGURAÇÃO DO LOGOUT - VERSÃO CORRIGIDA =====
    function setupLogout() {
        console.log('Configurando botão de logout...');
        
        const logoutButton = document.getElementById('logoutButton');
        const mobileLogoutButton = document.getElementById('mobileLogoutButton');
        
        function setupButton(button) {
            if (!button) return;
            
            let isLoggingOut = false;
            
            button.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                if (isLoggingOut) {
                    console.log('Logout já em andamento...');
                    return;
                }
                
                console.log('Clique no logout detectado');
                
                const confirmarSaida = confirm('Tem certeza que deseja sair do sistema?');
                
                if (confirmarSaida) {
                    console.log('Usuário confirmou logout');
                    isLoggingOut = true;
                    
                    // Feedback visual
                    const originalHTML = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Saindo...</span>';
                    this.disabled = true;
                    
                    // Desabilita todos os botões de logout
                    disableAllLogoutButtons();
                    
                    // Fechar menu mobile se estiver aberto
                    if (sidebar && sidebar.classList.contains('active')) {
                        sidebar.classList.remove('active');
                        if (overlay) overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Executar logout após delay
                    setTimeout(() => {
                        console.log('Executando logout...');
                        fazerLogoutCorrigido();
                    }, 800);
                }
            });
        }
        
        // Configurar ambos os botões
        setupButton(logoutButton);
        setupButton(mobileLogoutButton);
        
        function disableAllLogoutButtons() {
            const allLogoutButtons = document.querySelectorAll('#logoutButton, #mobileLogoutButton, .logout-btn');
            allLogoutButtons.forEach(btn => {
                btn.disabled = true;
                if (!btn.innerHTML.includes('fa-spinner')) {
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Saindo...</span>';
                }
            });
        }
        
        function fazerLogoutCorrigido() {
            const csrfToken = getCSRFToken();
            
            if (csrfToken) {
                // CORREÇÃO: Remove o nextInput que estava forçando redirecionamento para '/'
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '/logout/';
                form.style.display = 'none';
                
                const csrfInput = document.createElement('input');
                csrfInput.type = 'hidden';
                csrfInput.name = 'csrfmiddlewaretoken';
                csrfInput.value = csrfToken;
                form.appendChild(csrfInput);
                
                document.body.appendChild(form);
                form.submit();
            } else {
                console.log('CSRF token não encontrado, usando fallback...');
                window.location.href = '/logout/';
            }
        }
        
        function getCSRFToken() {
            const csrfInput = document.querySelector('[name=csrfmiddlewaretoken]');
            if (csrfInput) return csrfInput.value;
            
            const csrfCookie = getCookie('csrftoken');
            if (csrfCookie) return csrfCookie;
            
            const metaToken = document.querySelector('meta[name="csrf-token"]');
            if (metaToken) return metaToken.getAttribute('content');
            
            return null;
        }
        
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    }

    // ===== CONFIGURAÇÃO DO MENU MOBILE - VERSÃO 100% FUNCIONAL =====
    function setupMobileMenu() {
        if (sidebarToggle && sidebar && overlay) {
            console.log('Configurando menu mobile...');
            
            // Botão toggle do menu mobile
            sidebarToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
                
                // Fechar todos os submenus ao abrir/fechar menu mobile
                if (!sidebar.classList.contains('active')) {
                    const submenus = document.querySelectorAll('.submenu');
                    const menuToggles = document.querySelectorAll('.menu-toggle');
                    
                    submenus.forEach(sub => sub.classList.remove('show'));
                    menuToggles.forEach(toggle => toggle.classList.add('collapsed'));
                }
            });

            // Overlay para fechar menu
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                
                // Fechar submenus ao fechar overlay
                const submenus = document.querySelectorAll('.submenu');
                const menuToggles = document.querySelectorAll('.menu-toggle');
                
                submenus.forEach(sub => sub.classList.remove('show'));
                menuToggles.forEach(toggle => toggle.classList.add('collapsed'));
            });

            // Fechar menu ao clicar em um link (mobile) - CORREÇÃO TOTAL
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                    const link = e.target.closest('.sidebar .nav-link');
                    if (link) {
                        const hasSubmenu = link.classList.contains('menu-toggle');
                        const isSubmenuLink = e.target.closest('.submenu .nav-link');
                        
                        // Fecha o menu apenas se for um link sem submenu OU um link dentro do submenu
                        if (!hasSubmenu || isSubmenuLink) {
                            setTimeout(() => {
                                sidebar.classList.remove('active');
                                overlay.classList.remove('active');
                                document.body.style.overflow = '';
                            }, 10);
                        }
                    }
                }
            });

            // Fechar menu ao redimensionar para desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    if (sidebar.classList.contains('active')) {
                        sidebar.classList.remove('active');
                        overlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Fechar todos os submenus no desktop ao redimensionar
                    const submenus = document.querySelectorAll('.submenu');
                    const menuToggles = document.querySelectorAll('.menu-toggle');
                    
                    submenus.forEach(sub => sub.classList.remove('show'));
                    menuToggles.forEach(toggle => toggle.classList.add('collapsed'));
                }
            });
        }
    }

    // ===== INICIALIZAÇÃO DAS CONFIGURAÇÕES =====
    setupLogout();
    setupMobileMenu();
    initializeDashboard();

    // ===== CORREÇÃO: REBUILD MENU EM REDIMENSIONAMENTO =====
    window.addEventListener('resize', function() {
        const currentWidth = window.innerWidth;
        
        // Reaplicar delays de animação quando voltar para desktop
        if (currentWidth > 768) {
            const navLinks = document.querySelectorAll('.sidebar .nav-link');
            navLinks.forEach((link, index) => {
                link.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
            });
        } else {
            // Remover delays no mobile
            const navLinks = document.querySelectorAll('.sidebar .nav-link');
            navLinks.forEach(link => {
                link.style.transitionDelay = '0s';
            });
        }
    });

    console.log('=== DASHBOARD CITIESOFT INICIALIZADO COM SUCESSO ===');
});

// ===== FUNÇÕES GLOBAIS PARA O DASHBOARD =====

// Função para animar valores (contadores)
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        obj.textContent = Math.floor(current);
    }, 16);
}

// Função para abrir modais
function openModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// Função para fechar modais
function closeModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
}

// ===== FUNÇÕES ESPECÍFICAS DO DASHBOARD =====

// Função para popular tabelas
function populateTables() {
    console.log('Populando tabelas...');
    
    // Dados de exemplo para as tabelas
    const ticketsData = [
        { id: '#1234', tipo: 'Hardware', solicitante: 'João Silva', prioridade: 'Alta', status: 'Aberto', abertura: '03/11/2025', produto: 'Notebook', categoria: 'TI' },
        { id: '#1233', tipo: 'Software', solicitante: 'Maria Santos', prioridade: 'Normal', status: 'Em Andamento', abertura: '03/11/2025', produto: 'Windows', categoria: 'Sistema' },
        { id: '#1232', tipo: 'Rede', solicitante: 'Pedro Costa', prioridade: 'Urgente', status: 'Aberto', abertura: '02/11/2025', produto: 'Rede', categoria: 'Infra' },
        { id: '#1231', tipo: 'Instalação', solicitante: 'Ana Lima', prioridade: 'Baixa', status: 'Resolvido', abertura: '02/11/2025', produto: 'Software', categoria: 'TI' },
        { id: '#1230', tipo: 'Hardware', solicitante: 'Carlos Souza', prioridade: 'Normal', status: 'Em Andamento', abertura: '01/11/2025', produto: 'Impressora', categoria: 'TI' }
    ];

    const ativosData = [
        { patrimonio: 'NB-2025-001', tipo: 'Notebook', departamento: 'TI', status: 'Ativo' },
        { patrimonio: 'DT-2025-045', tipo: 'Desktop', departamento: 'Financeiro', status: 'Ativo' },
        { patrimonio: 'MN-2025-012', tipo: 'Monitor', departamento: 'RH', status: 'Ativo' },
        { patrimonio: 'NB-2024-089', tipo: 'Notebook', departamento: 'Vendas', status: 'Manutenção' },
        { patrimonio: 'IM-2025-003', tipo: 'Impressora', departamento: 'Admin', status: 'Ativo' }
    ];

    const chamadosData = [
        { id: 'OCS-567', tipo: 'Hardware', assunto: 'Reparo de teclado', tecnico: 'Marcos Tech', status: 'Em Atendimento' },
        { id: 'OCS-566', tipo: 'Software', assunto: 'Instalação Office', tecnico: 'Paula Lima', status: 'Concluído' },
        { id: 'OCS-565', tipo: 'Rede', assunto: 'Configuração Wi-Fi', tecnico: 'Roberto Net', status: 'Pendente' },
        { id: 'OCS-564', tipo: 'Hardware', assunto: 'Troca de monitor', tecnico: 'Marcos Tech', status: 'Em Atendimento' },
        { id: 'OCS-563', tipo: 'Instalação', assunto: 'Setup novo usuário', tecnico: 'Paula Lima', status: 'Concluído' }
    ];

    const gestaoTicketsData = [
        { id: 'TKT-001', assunto: 'Impressora não imprime', prioridade: 'Alta', tecnico: 'Marcos Tech', status: 'Em Andamento', tempo: '2h 30m' },
        { id: 'TKT-002', assunto: 'Lentidão no sistema', prioridade: 'Normal', tecnico: 'Paula Lima', status: 'Atribuído', tempo: '1h 15m' },
        { id: 'TKT-003', assunto: 'Acesso à rede', prioridade: 'Urgente', tecnico: 'Roberto Net', status: 'Pendente', tempo: '4h 45m' },
        { id: 'TKT-004', assunto: 'Instalação software', prioridade: 'Baixa', tecnico: 'Carla Silva', status: 'Solucionado', tempo: '45m' }
    ];

    // Popular tabelas se existirem
    populateTable('ticketsTable', ticketsData, (ticket) => `
        <tr>
            <td><strong>${ticket.id}</strong></td>
            <td>${ticket.tipo}</td>
            <td>${ticket.solicitante}</td>
            <td><span class="status-badge ${getPriorityClass(ticket.prioridade)}">${ticket.prioridade}</span></td>
            <td><span class="status-badge ${getStatusClass(ticket.status)}">${ticket.status}</span></td>
            <td>${ticket.abertura}</td>
            <td>${ticket.produto}</td>
            <td>${ticket.categoria}</td>
        </tr>
    `);

    populateTable('ativosTable', ativosData, (ativo) => `
        <tr>
            <td><strong>${ativo.patrimonio}</strong></td>
            <td><i class="fas fa-laptop me-2"></i>${ativo.tipo}</td>
            <td>${ativo.departamento}</td>
            <td><span class="status-badge ${ativo.status === 'Ativo' ? 'success' : 'warning'}">${ativo.status}</span></td>
        </tr>
    `);

    populateTable('chamadosTable', chamadosData, (chamado) => `
        <tr>
            <td><strong>${chamado.id}</strong></td>
            <td><i class="fas fa-tools me-2"></i>${chamado.tipo}</td>
            <td>${chamado.assunto}</td>
            <td>${chamado.tecnico}</td>
            <td><span class="status-badge ${getStatusClass(chamado.status)}">${chamado.status}</span></td>
        </tr>
    `);

    populateTable('gestaoTicketsTable', gestaoTicketsData, (ticket) => `
        <tr>
            <td><strong>${ticket.id}</strong></td>
            <td>${ticket.assunto}</td>
            <td><span class="status-badge ${getPriorityClass(ticket.prioridade)}">${ticket.prioridade}</span></td>
            <td>${ticket.tecnico}</td>
            <td><span class="status-badge ${getStatusClass(ticket.status)}">${ticket.status}</span></td>
            <td>${ticket.tempo}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="atribuirTicket('${ticket.id}')">
                    <i class="fas fa-user-check"></i>
                </button>
                <button class="btn btn-sm btn-success" onclick="registrarSolucao('${ticket.id}')">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-warning" onclick="escalonarTicket('${ticket.id}')">
                    <i class="fas fa-level-up-alt"></i>
                </button>
            </td>
        </tr>
    `);
}

// Função auxiliar para popular tabelas
function populateTable(tableId, data, rowTemplate) {
    const table = document.getElementById(tableId);
    if (table && table.querySelector('tbody')) {
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';
        data.forEach(item => {
            tbody.innerHTML += rowTemplate(item);
        });
    }
}

// Funções auxiliares para classes CSS
function getPriorityClass(prioridade) {
    const classes = {
        'Baixa': 'success',
        'Normal': 'info',
        'Alta': 'warning',
        'Urgente': 'danger'
    };
    return classes[prioridade] || 'info';
}

function getStatusClass(status) {
    const classes = {
        'Aberto': 'danger',
        'Em Andamento': 'warning',
        'Resolvido': 'success',
        'Pendente': 'info',
        'Atribuído': 'info',
        'Concluído': 'success',
        'Em Atendimento': 'warning'
    };
    return classes[status] || 'info';
}

// Função para inicializar gráficos
function initializeCharts() {
    console.log('Inicializando gráficos...');
    
    // Gráfico: Ativos por Status
    const ctxAtivos = document.getElementById('ativosChart');
    if (ctxAtivos) {
        new Chart(ctxAtivos.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Ativos', 'Em Manutenção', 'Desativados', 'Reserva'],
                datasets: [{
                    data: [198, 15, 22, 12],
                    backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#17a2b8'],
                    borderWidth: 3,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: { size: 12 }
                        }
                    }
                }
            }
        });
    }

    // Gráfico: Tickets por Prioridade
    const ctxTickets = document.getElementById('ticketsChart');
    if (ctxTickets) {
        new Chart(ctxTickets.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Baixa', 'Normal', 'Alta', 'Urgente'],
                datasets: [{
                    label: 'Tickets',
                    data: [8, 15, 7, 4],
                    backgroundColor: ['#28a745', '#00A6FF', '#ffc107', '#dc3545'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 5 }
                    }
                }
            }
        });
    }
}

// ===== INICIALIZAÇÃO DO DASHBOARD =====
function initializeDashboard() {
    console.log('Inicializando componentes do dashboard...');
    
    // Inicializar data atual
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Inicializar contadores animados
    const counters = [
        { id: 'activosCount', value: 247 },
        { id: 'ativosAtivosCount', value: 198 },
        { id: 'ativosManutencaoCount', value: 15 },
        { id: 'ticketsAbertosCount', value: 34 },
        { id: 'chamadosCount', value: 12 },
        { id: 'usuariosCount', value: 89 }
    ];
    
    counters.forEach(counter => {
        if (document.getElementById(counter.id)) {
            animateValue(counter.id, 0, counter.value, 1500);
        }
    });

    // Popular tabelas e gráficos
    populateTables();
    initializeCharts();
}

// ===== FUNÇÕES DOS MODAIS =====
function saveAtivo() {
    alert('Ativo salvo com sucesso!');
    closeModal('novoAtivoModal');
}

function saveTicket() {
    alert('Ticket aberto com sucesso!');
    closeModal('novoTicketModal');
}

function saveChamado() {
    alert('Chamado registrado com sucesso!');
    closeModal('novoChamadoModal');
}

function gerarRelatorio() {
    alert('Relatório gerado com sucesso!');
    closeModal('relatoriosModal');
}

// ===== FUNÇÕES DOS CHAMADOS =====
function abrirNovoChamado() {
    openModal('novoChamadoModal');
}

function filtrarChamadosAbertos() {
    alert('Filtrando chamados abertos...');
}

function filtrarChamadosAndamento() {
    alert('Filtrando chamados em andamento...');
}

function filtrarChamadosConcluidos() {
    alert('Filtrando chamados concluídos...');
}

function filtrarChamadosAguardando() {
    alert('Filtrando chamados aguardando ação...');
}

function verHistoricoChamados() {
    alert('Abrindo histórico de chamados...');
}

// ===== FUNÇÕES DOS TICKETS =====
function atribuirTicketsAutomaticamente() {
    alert('Atribuição automática de tickets executada!');
}

function escalonarTicketsCriticos() {
    alert('Tickets críticos escalonados!');
}

function filtrarTickets(tipo) {
    alert(`Filtrando tickets: ${tipo}`);
}

function atribuirTicket(ticketId) {
    alert(`Atribuindo ticket: ${ticketId}`);
}

function registrarSolucao(ticketId) {
    alert(`Registrando solução para: ${ticketId}`);
}

function escalonarTicket(ticketId) {
    alert(`Escalonando ticket: ${ticketId}`);
}

// ===== BLOQUEIO DO BOTÃO VOLTAR =====
history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function(event) {
    const confirmarSaida = confirm('Deseja realmente sair do sistema?');
    if (confirmarSaida) {
        const logoutEvent = new Event('logoutRequired');
        window.dispatchEvent(logoutEvent);
    } else {
        history.pushState(null, null, window.location.href);
    }
});

// Event listener para logout via botão voltar
window.addEventListener('logoutRequired', function() {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.click();
    } else {
        window.location.href = '/logout/';
    }
});

// ===== EXPORTAR FUNÇÕES PARA USO GLOBAL =====
window.animateValue = animateValue;
window.openModal = openModal;
window.closeModal = closeModal;
window.initializeDashboard = initializeDashboard;
window.saveAtivo = saveAtivo;
window.saveTicket = saveTicket;
window.saveChamado = saveChamado;
window.gerarRelatorio = gerarRelatorio;
window.abrirNovoChamado = abrirNovoChamado;
window.filtrarChamadosAbertos = filtrarChamadosAbertos;
window.filtrarChamadosAndamento = filtrarChamadosAndamento;
window.filtrarChamadosConcluidos = filtrarChamadosConcluidos;
window.filtrarChamadosAguardando = filtrarChamadosAguardando;
window.verHistoricoChamados = verHistoricoChamados;
window.atribuirTicketsAutomaticamente = atribuirTicketsAutomaticamente;
window.escalonarTicketsCriticos = escalonarTicketsCriticos;
window.filtrarTickets = filtrarTickets;
window.atribuirTicket = atribuirTicket;
window.registrarSolucao = registrarSolucao;
window.escalonarTicket = escalonarTicket;