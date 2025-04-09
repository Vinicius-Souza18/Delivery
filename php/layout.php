<?php
if (!isset($_SESSION)) session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard - <?php echo ucfirst($_SESSION['tipo']); ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<header>
    <h1>Delivery - Painel <?php echo ucfirst($_SESSION['tipo']); ?></h1>
    <a href="logout.php">Sair</a>
</header>
<main>
