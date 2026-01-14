// ========================================
// SIQUEIRA ENGENHARIA - JAVASCRIPT PRINCIPAL
// ========================================

// === NAVEGAÇÃO MOBILE ===
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }
    
    // Header fixo ao rolar
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });
});

// === MODAL DE ORÇAMENTO ===
const orcamentoModal = document.getElementById('orcamentoModal');
const openOrcamentoButtons = [
    document.getElementById('openOrcamentoModal'),
    document.getElementById('openOrcamentoModalCTA'),
    document.getElementById('openOrcamentoModalSidebar')
];
const closeModal = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');

// Abrir modal
openOrcamentoButtons.forEach(button => {
    if (button) {
        button.addEventListener('click', function() {
            orcamentoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
});

// Fechar modal
function closeOrcamentoModal() {
    orcamentoModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (closeModal) {
    closeModal.addEventListener('click', closeOrcamentoModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeOrcamentoModal);
}

// Fechar modal com ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && orcamentoModal.classList.contains('active')) {
        closeOrcamentoModal();
    }
});

// === FORMULÁRIO DE ORÇAMENTO ===
const orcamentoForm = document.getElementById('orcamentoForm');
const successMessage = document.getElementById('successMessage');

if (orcamentoForm) {
    orcamentoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            tipoVistoria: document.getElementById('tipoVistoria').value,
            endereco: document.getElementById('endereco').value,
            descricao: document.getElementById('descricao').value,
            horario: document.getElementById('horario').value,
            whatsappContato: document.getElementById('whatsappContato').checked
        };
        
        // Validação
        if (!formData.nome || !formData.email || !formData.telefone || !formData.tipoVistoria || !formData.endereco) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Simular envio (em produção, enviar para backend/API)
        console.log('Dados do orçamento:', formData);
        
        // Se o usuário quiser contato via WhatsApp, redirecionar
        if (formData.whatsappContato) {
            const tiposVistoria = {
                'residencial': 'Vistoria Residencial',
                'comercial': 'Vistoria Comercial',
                'reforma': 'Vistoria para Reforma',
                'laudo': 'Laudo Técnico',
                'consultoria': 'Consultoria em Reformas'
            };
            
            const mensagem = `Olá! Gostaria de solicitar um orçamento para ${tiposVistoria[formData.tipoVistoria]}.\n\nNome: ${formData.nome}\nEndereço do imóvel: ${formData.endereco}\nMelhor horário: ${formData.horario}\n\n${formData.descricao ? 'Descrição: ' + formData.descricao : ''}`;
            
            const whatsappURL = `https://wa.me/5511937426549?text=${encodeURIComponent(mensagem)}`;
            
            // Mostrar mensagem de sucesso
            orcamentoForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Redirecionar após 2 segundos
            setTimeout(function() {
                window.open(whatsappURL, '_blank');
                closeOrcamentoModal();
                orcamentoForm.reset();
                orcamentoForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 2000);
        } else {
            // Mostrar mensagem de sucesso
            orcamentoForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Resetar após 3 segundos
            setTimeout(function() {
                closeOrcamentoModal();
                orcamentoForm.reset();
                orcamentoForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
}

// === FUNÇÃO PARA ABRIR MODAL COM SERVIÇO PRÉ-SELECIONADO ===
function openOrcamentoModalWithService(serviceType) {
    const tipoVistoriaSelect = document.getElementById('tipoVistoria');
    if (tipoVistoriaSelect) {
        tipoVistoriaSelect.value = serviceType;
    }
    orcamentoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// === FORMULÁRIO DE CONTATO ===
const contatoForm = document.getElementById('contatoForm');
const contatoSuccessMessage = document.getElementById('contatoSuccessMessage');

if (contatoForm) {
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados
        const formData = {
            nome: document.getElementById('nomeContato').value,
            email: document.getElementById('emailContato').value,
            telefone: document.getElementById('telefoneContato').value,
            assunto: document.getElementById('assunto').value,
            mensagem: document.getElementById('mensagem').value
        };
        
        // Validação
        if (!formData.nome || !formData.email || !formData.telefone || !formData.assunto || !formData.mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }
        
        // Simular envio
        console.log('Dados do contato:', formData);
        
        // Mostrar mensagem de sucesso
        contatoForm.style.display = 'none';
        contatoSuccessMessage.style.display = 'block';
        
        // Resetar após 4 segundos
        setTimeout(function() {
            contatoForm.reset();
            contatoForm.style.display = 'block';
            contatoSuccessMessage.style.display = 'none';
        }, 4000);
    });
}

// === SMOOTH SCROLL PARA ÂNCORAS ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// === MÁSCARA DE TELEFONE ===
function maskPhone(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    } else {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{1})(\d{4})(\d)/, '$1 $2-$3');
    }
    
    input.value = value;
}

// Aplicar máscara aos campos de telefone
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', function() {
        maskPhone(this);
    });
});

// === ANIMAÇÃO DE SCROLL ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.feature-card, .service-card, .blog-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// === VALIDAÇÃO EM TEMPO REAL ===
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.value && !emailRegex.test(this.value)) {
            this.style.borderColor = '#DC3545';
        } else {
            this.style.borderColor = '#DEE2E6';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#1E3A5F';
    });
});

// === LOG PARA DEBUG ===
console.log('✅ Siqueira Engenharia - Website carregado com sucesso!');
console.log('📞 Telefone: (11) 9 3742-6549');
console.log('📍 Endereço: Rua Solidonio Leite, 131 - Vila Santa Clara - São Paulo');
