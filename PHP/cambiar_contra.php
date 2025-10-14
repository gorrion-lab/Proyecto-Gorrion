<?php
// Inicia la sesión para acceder a las variables de sesión del usuario autenticado
session_start();

// Incluye el archivo de conexión a la base de datos
require 'Conn.php'; // conexión a la BD

// ==========================##
// Verificar autenticación   ##
// ==========================##
###############################
// Comprueba si el usuario ha iniciado sesión
if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    // Si no ha iniciado sesión, lo redirige a la página de login
    header("Location: ../HTML/login.html");
    exit;
}

// Recupera el nombre de usuario de la sesión actual
$usuario = $_SESSION['NombreUsuario'];

// ==========================================
// Procesamiento del formulario (POST)
// ==========================================

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recupera las contraseñas enviadas desde el formulario
    $nuevaContra = $_POST['nuevaContra'] ?? '';
    $confirmarContra = $_POST['confirmarContra'] ?? '';

    // Verifica que ambas contraseñas coincidan y tengan al menos 8 caracteres
    if ($nuevaContra === $confirmarContra && strlen($nuevaContra) >= 8) {
        // Genera un hash seguro de la nueva contraseña
        $hash = password_hash($nuevaContra, PASSWORD_BCRYPT);

        // Prepara la consulta para actualizar la contraseña en la base de datos
        $sql = "UPDATE cuentas SET Contra = ? WHERE NombreUsuario = ?";
        $stmt = $conn->prepare($sql);

        if ($stmt) {
            // Vincula los parámetros: hash de la nueva contraseña y nombre de usuario
            $stmt->bind_param("ss", $hash, $usuario);

            // Ejecuta la consulta y verifica si se actualizó correctamente
            if ($stmt->execute()) {
                $mensaje = "<div style='color:green; text-align:center;'> Contraseña actualizada correctamente.</div>";
            } else {
                $mensaje = "<div style='color:red;'> Error al actualizar la contraseña: " . $stmt->error . "</div>";
            }
            $stmt->close();
        } else {
            // Error al preparar la consulta
            $mensaje = "<div style='color:red;'> Error al preparar la consulta SQL.</div>";
        }
    } else {
        // Las contraseñas no coinciden o no cumplen los requisitos mínimos
        $mensaje = "<div style='color:red;'> Las contraseñas no coinciden o son demasiado cortas.</div>";
    }
}

// ==========================
//  Mostrar mensaje al usuario
// ==========================

if (isset($mensaje)) {
    echo $mensaje;
}

// Cierra la conexión con la base de datos
$conn->close();
exit;
?>
