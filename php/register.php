<?php
require_once 'config.php';

if (!isPostRequest()) {
    jsonResponse(false, 'Método não permitido');
}

// Obter dados do POST
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$password = $_POST['password'];

// Validações básicas
if (empty($name) || empty($email) || empty($phone) || empty($password)) {
    jsonResponse(false, 'Por favor, preencha todos os campos.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'E-mail inválido.');
}

if (strlen($password) < 6) {
    jsonResponse(false, 'A senha deve ter pelo menos 6 caracteres.');
}

// Conectar ao banco
$conn = getDBConnection();

// Verificar se e-mail já existe
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    jsonResponse(false, 'Este e-mail já está cadastrado.');
}

// Hash da senha
$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// Inserir novo usuário
$stmt = $conn->prepare("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $phone, $passwordHash);

if ($stmt->execute()) {
    jsonResponse(true, 'Cadastro realizado com sucesso!');
} else {
    jsonResponse(false, 'Erro ao cadastrar. Tente novamente mais tarde.');
}
?>