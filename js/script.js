// Funções gerais do site
document.addEventListener('DOMContentLoaded', function() {
    // Ativar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Suavizar scroll para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Atualizar ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Adicionar evento de clique para os botões "Adicionar ao Carrinho"
    document.querySelectorAll('.btn-add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.closest('.card').querySelector('.card-title').textContent;
            showToast(`"${productName}" adicionado ao carrinho!`);
        });
    });
});

// Função para mostrar toasts
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.zIndex = '1100';
        document.body.appendChild(container);
    }
    
    const toastEl = document.createElement('div');
    toastEl.className = 'toast show';
    toastEl.role = 'alert';
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Delícia Express</strong>
            <small>Agora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">${message}</div>
    `;
    
    document.getElementById('toast-container').appendChild(toastEl);
    
    // Remove o toast após 3 segundos
    setTimeout(() => {
        toastEl.remove();
    }, 3000);
}