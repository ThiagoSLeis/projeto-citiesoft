// Estrutura de dados para o menu dinâmico - VERSÃO PROFISSIONAL
const menuConfig = [
    {
        id: 'painel',
        title: 'Painel Principal',
        icon: 'fas fa-chart-line',
        url: '#',
        active: true,
        submenu: null
    },
    {
        id: 'relatorios',
        title: 'Relatórios',
        icon: 'fas fa-file-alt',
        url: '#',
        active: false,
        badge: '3',
        submenu: [
            {
                id: 'relatorio-vendas',
                title: 'Relatório de Vendas',
                url: '#',
                icon: 'fas fa-chart-bar'
            },
            {
                id: 'relatorio-financeiro',
                title: 'Relatório Financeiro',
                url: '#',
                icon: 'fas fa-money-bill-wave'
            },
            {
                id: 'relatorio-clientes',
                title: 'Relatório de Clientes',
                url: '#',
                icon: 'fas fa-users'
            }
        ]
    },
    {
        id: 'cadastros',
        title: 'Cadastros',
        icon: 'fas fa-edit',
        url: '#',
        active: false,
        badge: '5',
        submenu: [
            {
                id: 'cadastro-clientes',
                title: 'Clientes',
                url: '#',
                icon: 'fas fa-user'
            },
            {
                id: 'cadastro-produtos',
                title: 'Produtos',
                url: '#',
                icon: 'fas fa-box'
            },
            {
                id: 'cadastro-usuarios',
                title: 'Usuários',
                url: '#',
                icon: 'fas fa-user-cog'
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
        id: 'separator-1',
        type: 'divider'
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
        id: 'suporte',
        title: 'Suporte',
        icon: 'fas fa-headset',
        url: '#',
        active: false,
        submenu: null
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIANDO DASHBOARD ===');
    
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');
    const dynamicMenu = document.getElementById('dynamicMenu');

    // Função para construir o menu dinâmico
    function buildDynamicMenu() {
        console.log('Construindo menu dinâmico...');
        dynamicMenu.innerHTML = '';
        
        menuConfig.forEach((item, index) => {
            if (item.type === 'divider') {
                const divider = document.createElement('div');
                divider.className = 'menu-divider';
                dynamicMenu.appendChild(divider);
                return;
            }

            const listItem = document.createElement('li');
            listItem.className = 'nav-item';
            
            if (item.submenu && item.submenu.length > 0) {
                // Item com submenu
                const menuLink = document.createElement('a');
                menuLink.className = `nav-link menu-toggle ${item.active ? 'active' : ''}`;
                menuLink.href = item.url;
                menuLink.setAttribute('data-bs-toggle', 'collapse');
                menuLink.setAttribute('data-bs-target', `#submenu-${item.id}`);
                menuLink.setAttribute('aria-expanded', 'false');
                menuLink.innerHTML = `<i class="${item.icon}"></i> <span class="menu-text">${item.title}</span>`;
                
                // Adicionar badge se existir
                if (item.badge) {
                    const badge = document.createElement('span');
                    badge.className = 'menu-badge';
                    badge.textContent = item.badge;
                    menuLink.appendChild(badge);
                }
                
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
                    subLink.innerHTML = `<i class="${subItem.icon}"></i> <span class="menu-text">${subItem.title}</span>`;
                    
                    subListItem.appendChild(subLink);
                    submenuList.appendChild(subListItem);
                });
                
                submenuDiv.appendChild(submenuList);
                listItem.appendChild(menuLink);
                listItem.appendChild(submenuDiv);
            } else {
                // Item simples sem submenu
                const menuLink = document.createElement('a');
                menuLink.className = `nav-link ${item.active ? 'active' : ''}`;
                menuLink.href = item.url;
                menuLink.innerHTML = `<i class="${item.icon}"></i> <span class="menu-text">${item.title}</span>`;
                
                // Adicionar badge se existir
                if (item.badge) {
                    const badge = document.createElement('span');
                    badge.className = 'menu-badge';
                    badge.textContent = item.badge;
                    menuLink.appendChild(badge);
                }
                
                listItem.appendChild(menuLink);
            }
            
            // Aplicar delay de animação
            const link = listItem.querySelector('.nav-link');
            if (link) {
                link.style.transitionDelay = `${0.1 + (index * 0.05)}s`;
            }
            
            dynamicMenu.appendChild(listItem);
        });
        
        console.log('Menu dinâmico construído com sucesso!');
    }

    // Inicializar o menu
    buildDynamicMenu();

    // Configuração do menu mobile
    if (sidebarToggle && sidebar && overlay) {
        console.log('Configurando menu mobile...');
        
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Fechar menu ao clicar em um link (mobile)
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && 
                sidebar.classList.contains('active') && 
                e.target.closest('.sidebar .nav-link')) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    }

    // Configuração do logout
    const logoutButtonMain = document.getElementById('logoutButton');
    const logoutButtonMobile = document.querySelector('.btn-outline-danger');

    if (logoutButtonMain) {
        logoutButtonMain.addEventListener('click', function(event) {
            event.preventDefault();
            const confirmarSaida = confirm('Tem certeza que deseja sair do sistema?');
            if (confirmarSaida) {
                this.closest('form').submit();
            }
        });
    }

    if (logoutButtonMobile) {
        logoutButtonMobile.addEventListener('click', function(event) {
            event.preventDefault();
            const confirmarSaida = confirm('Tem certeza que deseja sair do sistema?');
            if (confirmarSaida) {
                this.closest('form').submit();
            }
        });
    }

    // Inicializar submenus do Bootstrap :cite[6]
    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
        new bootstrap.Collapse(submenu, {
            toggle: false
        });
    });

    // Configurar eventos dos menu-toggle
    document.querySelectorAll('.menu-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth > 768) {
                e.preventDefault();
            }
            this.classList.toggle('collapsed');
        });
    });

    console.log('=== DASHBOARD INICIALIZADO COM SUCESSO ===');
});
// ✅ CÓDIGO PARA BLOQUEAR BOTÃO VOLTAR - Adicione no final do dashboard.js

// Detecta quando a página veio do cache (botão voltar)
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();
    }
});

// Bloqueio adicional para navegadores antigos
if (performance.navigation.type === 2) {
    window.location.reload();
}