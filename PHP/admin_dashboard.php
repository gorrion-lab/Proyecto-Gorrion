<?php
session_start();
require 'Conn.php';

// --- Verificar que el usuario es administrador ---
if (!isset($_SESSION['rol']) || $_SESSION['rol'] !== 'admin') {
    echo "Acceso denegado. Solo administradores.";
    exit;
}

// --- Parámetros de búsqueda, orden y paginación ---
$busqueda = $_GET['busqueda'] ?? '';
$orden = $_GET['orden'] ?? 'ID_docente'; 
$direccion = $_GET['direccion'] ?? 'ASC'; 
$pagina = isset($_GET['pagina']) ? (int)$_GET['pagina'] : 1;
$por_pagina = 25;
$inicio = ($pagina - 1) * $por_pagina;

// Validar parámetros de orden
$columnas_validas = ['ID_docente','Nombre','Apellido_paterno','Apellido_materno','Institucion','CCT','Municipio','Comunidad','Correo_electronico','Contacto'];
if (!in_array($orden, $columnas_validas)) $orden = 'ID_docente';
if ($direccion !== 'ASC' && $direccion !== 'DESC') $direccion = 'ASC';

// --- Construcción de consulta SQL ---
if (!empty($busqueda)) {
    $sql = "SELECT * FROM docentes 
            WHERE Nombre LIKE ? 
               OR Apellido_paterno LIKE ?
               OR Apellido_materno LIKE ?
               OR Municipio LIKE ?
            ORDER BY $orden $direccion
            LIMIT ?, ?";
    $stmt = $conn->prepare($sql);
    $like = "%" . $busqueda . "%";
    $stmt->bind_param("ssssii", $like, $like, $like, $like, $inicio, $por_pagina);
    $stmt->execute();
    $result = $stmt->get_result();

    // Obtener total de resultados para paginación
    $count_sql = "SELECT COUNT(*) AS total FROM docentes 
                  WHERE Nombre LIKE ? 
                     OR Apellido_paterno LIKE ?
                     OR Apellido_materno LIKE ?
                     OR Municipio LIKE ?";
    $count_stmt = $conn->prepare($count_sql);
    $count_stmt->bind_param("ssss", $like, $like, $like, $like);
    $count_stmt->execute();
    $total = $count_stmt->get_result()->fetch_assoc()['total'];
} else {
    // Sin búsqueda
    $sql = "SELECT * FROM docentes ORDER BY $orden $direccion LIMIT ?, ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $inicio, $por_pagina);
    $stmt->execute();
    $result = $stmt->get_result();

    $total = $conn->query("SELECT COUNT(*) AS total FROM docentes")->fetch_assoc()['total'];
}

$total_paginas = ceil($total / $por_pagina);
?>

<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Dashboard Administrador</title>
    <link rel='stylesheet' href='../CSS/Estilo_dahsboard.css'>
    <style>
        table th a {
            text-decoration: none;
            color: inherit;
        }
        .paginacion a {
            margin: 0 5px;
            padding: 5px 10px;
            border: 1px solid #ccc;
            text-decoration: none;
        }
        .paginacion a.activa {
            background-color: #444;
            color: white;
            border-color: #444;
        }
    </style>
</head>
<body>
    <div class="menu-container">
        <div class="hamburger" id="hamburger">
            <div></div><div></div><div></div>
        </div>
        <div class="menu" id="menu">
            <a href="">Subir contenido</a>
            <a href="../PHP/Cerrar_sesion.php">🚪 Cerrar sesión</a>
            
        </div>
    </div>

    <h1>📊 Panel de Administración - Docentes</h1>

    <!-- Formulario de búsqueda -->
    <form method="get" action="">
        <input type="text" name="busqueda" placeholder="Buscar por Nombre o municipio" value="<?= htmlspecialchars($busqueda) ?>">
        <button type="submit">🔍 Buscar</button>
        <a href="../PHP/admin_dashboard.php">❌ Limpiar</a>
    </form>
    <br>

    <div class="tabla_de_registros">
        <table border="1">
            <thead>
                <tr>
                    <?php
                    // Generar cabeceras con enlaces de orden
                    foreach ($columnas_validas as $columna) {
                        $dir = ($orden === $columna && $direccion === 'ASC') ? 'DESC' : 'ASC';
                        echo "<th><a href='?busqueda=" . urlencode($busqueda) . "&orden=$columna&direccion=$dir'>$columna</a></th>";
                    }
                    ?>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($result && $result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td><?= $row['ID_docente'] ?></td>
                            <td><?= $row['Nombre'] ?></td>
                            <td><?= $row['Apellido_paterno'] ?></td>
                            <td><?= $row['Apellido_materno'] ?></td>
                            <td><?= $row['Institucion'] ?></td>
                            <td><?= $row['CCT'] ?></td>
                            <td><?= $row['Municipio'] ?></td>
                            <td><?= $row['Comunidad'] ?></td>
                            <td><?= $row['Correo_electronico'] ?></td>
                            <td><?= $row['Contacto'] ?></td>
                            <td>
                                <a href='../PHP/admin_editar.php?id=<?= $row['ID_docente'] ?>'>✏️ Editar</a> |
                                <a href='../PHP/admin_eliminar.php?id=<?= $row['ID_docente'] ?>' onclick="return confirm('¿Seguro que deseas eliminar este docente?')">🗑️ Eliminar</a>
                            </td>
                        </tr>
                    <?php endwhile; ?>
                <?php else: ?>
                    <tr><td colspan="12">No se encontraron resultados.</td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>

    <!-- Paginación -->
    <div class="paginacion">
        <?php if ($pagina > 1): ?>
            <a href="?pagina=<?= $pagina - 1 ?>&busqueda=<?= urlencode($busqueda) ?>&orden=<?= $orden ?>&direccion=<?= $direccion ?>">⬅️ Anterior</a>
        <?php endif; ?>

        <?php for ($i = 1; $i <= $total_paginas; $i++): ?>
            <a href="?pagina=<?= $i ?>&busqueda=<?= urlencode($busqueda) ?>&orden=<?= $orden ?>&direccion=<?= $direccion ?>"
               class="<?= ($i == $pagina) ? 'activa' : '' ?>"><?= $i ?></a>
        <?php endfor; ?>

        <?php if ($pagina < $total_paginas): ?>
            <a href="?pagina=<?= $pagina + 1 ?>&busqueda=<?= urlencode($busqueda) ?>&orden=<?= $orden ?>&direccion=<?= $direccion ?>">Siguiente ➡️</a>
        <?php endif; ?>
    </div>

    <script src="../JS/menu_hamburguesa_admin.js"></script>
</body>
</html>
