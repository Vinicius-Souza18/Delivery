<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $users = [
        'admin' => ['senha' => 'admin123', 'tipo' => 'admin'],
        'gerente' => ['senha' => 'gerente123', 'tipo' => 'gerente'],
        'caixa' => ['senha' => 'caixa123', 'tipo' => 'caixa'],
        'entregador' => ['senha' => 'entregador123', 'tipo' => 'entregador'],
    ];
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];

    if (isset($users[$usuario]) && $users[$usuario]['senha'] === $senha) {
        $_SESSION['usuario'] = $usuario;
        $_SESSION['tipo'] = $users[$usuario]['tipo'];
        header("Location: dashboard-" . $users[$usuario]['tipo'] . ".php");
        exit;
    } else {
        $erro = "Usuário ou senha inválidos!";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="login-box">
    <h2>Login Delivery</h2>
    <?php if (isset($erro)) echo "<p class='erro'>$erro</p>"; ?>
    <form method="POST">
        <input type="text" name="usuario" placeholder="Usuário" required>
        <input type="password" name="senha" placeholder="Senha" required>
        <button type="submit">Entrar</button>
    </form>
</div>
</body>
</html>
