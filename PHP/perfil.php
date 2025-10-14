<?php
session_start();
require '../PHP/Conn.php'; // archivo de conexión a la base de datos

// ===== Verificar si el usuario ha iniciado sesión 
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.html");
    exit;
}

//  Obtener datos del usuario desde la BD 
$usuario = $_SESSION['NombreUsuario'];

$sql = "SELECT ID_cuenta, NombreUsuario
        FROM cuentas 
        WHERE NombreUsuario = ?";
        
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$resultado = $stmt->get_result();
$datos_usuario = $resultado->fetch_assoc();
$stmt->close();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <!-- 
        CONFIGURACIÓN GENERAL DE LA PÁGINA
        ------------------------------------
        - Se especifica el tipo de documento (HTML5).
        - El idioma principal del contenido es español.
        - Se establece la codificación UTF-8 para admitir caracteres latinos.
        - Se define el título de la pestaña del navegador.
        - Se configura la metaetiqueta viewport para garantizar que el diseño sea 
          adaptable a diferentes tamaños de pantalla (diseño responsive).
        - Se enlaza el archivo de estilos CSS que da formato visual al perfil del docente.
    -->
    <meta charset="UTF-8">
    <title>Perfil de Docente</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/Estilo_perfil.css">
</head>

<body>
    <!-- 
        ENCABEZADO DE LA PÁGINA (HEADER)
        ---------------------------------
        Contiene el menú principal de navegación del perfil del docente.
        Se incluye un botón tipo “hamburguesa” para desplegar u ocultar las opciones del menú
        en pantallas pequeñas (móviles o tabletas).
    -->
    <header>
        <!-- 
            Botón hamburguesa: tres líneas horizontales que representan un menú desplegable.
            Al hacer clic, ejecuta la función JavaScript "toggleMenu()" que controla la visibilidad del menú.
        -->
        <div class="menu-toggle" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <!-- 
            MENÚ DE NAVEGACIÓN DEL PERFIL
            -------------------------------
            Contiene los distintos enlaces a secciones y funcionalidades disponibles 
            para el usuario docente dentro del sistema.
            Cada enlace redirige a un archivo PHP que corresponde a una vista o acción.
        -->
        <div id="menu" class="menu">
            <a href="../PHP/datos_de_usuario.php">Ficha de datos</a>
            <a href="../PHP/cambiar_contra_vista.php">Cambiar contraseña</a>
            <a href="../PHP/Otra_pagina.php">Infografías</a>
            <a href="">Podcast</a>
            <a href="">Videos</a>
            <a href="../PHP/Cerrar_sesion.php">Cerrar sesión</a>
        </div>
    </header>

    <!-- 
        CONTENEDOR PRINCIPAL DEL PERFIL
        --------------------------------
        Muestra información básica del docente que ha iniciado sesión.
        En este caso, se despliega un saludo personalizado y el ID del usuario obtenido 
        desde la base de datos (mediante la variable PHP $datos_usuario).
    -->
    <div class="perfil-container">
        <!-- 
            Saludo personalizado
            ---------------------
            htmlspecialchars() se utiliza para evitar vulnerabilidades XSS (inyección de código HTML)
            al mostrar el nombre del usuario directamente en la página.
        -->
        <h2>Bienvenido, <?php echo htmlspecialchars($datos_usuario['NombreUsuario']); ?> 👋</h2>

        <!-- 
            Sección de datos del perfil
            -----------------------------
            Muestra información específica del usuario autenticado (en este caso, su ID de cuenta).
        -->
        <div class="perfil-dato">
            <strong>ID:</strong>
            <?php echo $datos_usuario['ID_cuenta']; ?>
        </div>
    </div>

    <!-- 
        PIE DE PÁGINA
        ---------------
        Contiene información legal o institucional, en este caso una nota de derechos reservados.
    -->
    <footer>
        Derechos reservados
    </footer>

    <!-- 
        SCRIPT DE FUNCIONALIDAD DEL MENÚ
        ---------------------------------
        menu_desplegable_perfil.js controla la interacción del menú:
        - Abre o cierra el menú al hacer clic en el botón hamburguesa.
        - Puede incluir lógica para cerrar el menú si se hace clic fuera del mismo.
    -->
    <script src="../JS/menu_desplegable_perfil.js"></script>

</body>

</html>
