<?php
require_once 'config.php';

if (!isPostRequest()) {
    jsonResponse(false, 'Método não permitido');
}

// Obter e-mail do POST
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

if (empty($email)) {
    jsonResponse(false, 'Por favor, informe seu e-mail.');
}

// Conectar ao banco
$conn = getDBConnection();

// Verificar se e-mail existe
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    jsonResponse(false, 'E-mail não encontrado em nosso sistema.');
}

// Gerar token de recuperação (em produção, enviar por e-mail)
$token = bin2hex(random_bytes(32));
$expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

// Atualizar token no banco
$stmt = $conn->prepare("UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?");
$stmt->bind_param("sss", $token, $expires, $email);

if ($stmt->execute()) {
    // Em produção, enviar e-mail com o link de recuperação
    $resetLink = "https://seusite.com/reset-password.php?token=$token";
    
    jsonResponse(true, 'Um e-mail com as instruções foi enviado para seu endereço.', [
        'token' => $token, // Apenas para demonstração
        'reset_link' => $resetLink
    ]);
} else {
    jsonResponse(false, 'Erro ao processar sua solicitação. Tente novamente.');
}
?>