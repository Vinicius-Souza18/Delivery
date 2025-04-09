// Validação do formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if(!email || !password) {
        showAlert('Por favor, preencha todos os campos.', 'danger');
        return;
    }
    
    // Simulação de requisição AJAX
    fetch('php/login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            showAlert('Login realizado com sucesso! Redirecionando...', 'success');
            // Redirecionar ou atualizar a interface
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
                modal.hide();
                // window.location.href = 'perfil.html';
            }, 1500);
        } else {
            showAlert(data.message || 'Erro ao fazer login. Verifique seus dados.', 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Erro na comunicação com o servidor.', 'danger');
    });
});

// Validação do formulário de cadastro
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    if(password !== confirmPassword) {
        showAlert('As senhas não coincidem!', 'danger');
        return;
    }
    
    if(!acceptTerms) {
        showAlert('Você deve aceitar os termos de uso para se cadastrar.', 'warning');
        return;
    }
    
    // Simulação de requisição AJAX
    fetch('php/register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            showAlert('Cadastro realizado com sucesso! Bem-vindo(a)!', 'success');
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
                modal.hide();
                // Mostrar modal de login automaticamente
                const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
                loginModal.show();
            }, 1500);
        } else {
            showAlert(data.message || 'Erro ao cadastrar. Tente novamente.', 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Erro na comunicação com o servidor.', 'danger');
    });
});

// Validação do formulário de recuperação de senha
document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    
    if(!email) {
        showAlert('Por favor, informe seu e-mail cadastrado.', 'warning');
        return;
    }
    
    // Simulação de requisição AJAX
    fetch('php/forgot-password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}`
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            showAlert(`Um e-mail com as instruções foi enviado para ${email}`, 'success');
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('forgotPasswordModal'));
                modal.hide();
            }, 2000);
        } else {
            showAlert(data.message || 'Erro ao processar sua solicitação.', 'danger');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAlert('Erro na comunicação com o servidor.', 'danger');
    });
});

// Função para mostrar alertas
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Adiciona o alerta no modal correspondente
    const activeModal = document.querySelector('.modal.show');
    if(activeModal) {
        const modalBody = activeModal.querySelector('.modal-body');
        modalBody.insertBefore(alertDiv, modalBody.firstChild);
        
        // Remove o alerta após 5 segundos
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}

// Login social (simulação)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.classList.contains('btn-google') ? 'Google' : 'Facebook';
        showAlert(`Você escolheu fazer login com ${provider}. Em uma implementação real, isso redirecionaria para a API de autenticação.`, 'info');
    });
});