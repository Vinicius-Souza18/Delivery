<?php
require_once 'config.php';

if (!isPostRequest()) {
    jsonResponse(false, 'Método não permitido');
}

// Obter dados do POST
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$password = $_POST['password'];

// Validações básicas
if (empty($email) || empty($password)) {
    jsonResponse(false, 'Por favor, preencha todos os campos.');
}

// Conectar ao banco
$conn = getDBConnection();

// Verificar credenciais
$stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    jsonResponse(false, 'E-mail não cadastrado.');
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password'])) {
    jsonResponse(false, 'Senha incorreta.');
}

// Login bem-sucedido (em produção, iniciar sessão aqui)
jsonResponse(true, 'Login realizado com sucesso!', [
    'user_id' => $user['id'],
    'name' => $user['name']
]);
?>