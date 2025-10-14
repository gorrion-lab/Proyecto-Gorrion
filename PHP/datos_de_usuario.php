<?php
session_start();
require 'Conn.php';

// Verifica si hay sesión activa
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.html");
    exit;
}

// Recuperar datos del usuario logueado
$id_docente = $_SESSION['ID_docente'] ?? null;

if (!$id_docente) {
    echo "<div class='error'>No se pudo obtener el ID del docente.</div>";
    exit;
}

$sql = "SELECT ID_docente, Nombre, Apellido_paterno, Apellido_materno, Institucion, CCT, Municipio, Comunidad, Correo_electronico, contacto 
        FROM docentes WHERE ID_docente = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_docente);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $docente = $result->fetch_assoc();
} else {
    echo "<div class='error'>No se encontraron datos del docente.</div>";
    exit;
}

$stmt->close();
$conn->close();

// Asignar imagen según institución
$institucion = strtolower(trim($docente['Institucion']));
$imagenFondo = "../IMG/default.jpg";

if (strpos($institucion, "177") !== false) {
    $imagenFondo = "../Imagenes/EPO177.png";
} elseif (strpos($institucion, "epo 240") !== false) {
    $imagenFondo = "../Imagenes/epo50.png";
} elseif (strpos($institucion, "prepa 12") !== false) {
    $imagenFondo = "../Imagenes/CBT.png";
} elseif (strpos($institucion, "conalep") !== false) {
    $imagenFondo = "../Imagenes/logo-proyecto.png";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi Perfil</title>
    <link rel="stylesheet" href="../CSS/datos_de_usuario.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <h1 class="logo">Perfil Docente</h1>
            <ul class="menu">
                <li><a href="../PHP/perfil.php">Inicio</a></li>
                <li><a href="../PHP/cambiar_contra.php">Cambiar Contraseña</a></li>
                <li><a href="../PHP/Cerrar_sesion.php">Cerrar Sesión</a></li>
            </ul>
        </nav>
    </header>

    <main class="perfil-container">
        <div class="card">
            <h2>Datos del Usuario</h2>
            <!-- Imagen de la institución -->
            <div class="institucion-img">
                <img src="<?= htmlspecialchars($imagenFondo) ?>" alt="Imagen de la institución">
            </div>
            <div class="info">
                <p><strong>Clave Docente:</strong> <?= htmlspecialchars($docente['ID_docente']) ?></p>
                <p><strong>Nombre:</strong> <?= htmlspecialchars($docente['Nombre'] . " " . $docente['Apellido_paterno'] . " " . $docente['Apellido_materno']) ?></p>
                <p><strong>Institución:</strong> <?= htmlspecialchars($docente['Institucion']) ?></p>
                <p><strong>CCT:</strong> <?= htmlspecialchars($docente['CCT']) ?></p>
                <p><strong>Municipio:</strong> <?= htmlspecialchars($docente['Municipio']) ?></p>
                <p><strong>Comunidad:</strong> <?= htmlspecialchars($docente['Comunidad']) ?></p>
                <p><strong>Correo electrónico:</strong> <?= htmlspecialchars($docente['Correo_electronico']) ?></p>
                <p><strong>Teléfono:</strong> <?= htmlspecialchars($docente['contacto']) ?></p>
            </div>
        </div>
    </main>

    <footer>
        © 2025 Derechos reservados - UPA
    </footer>
</body>
</html>
