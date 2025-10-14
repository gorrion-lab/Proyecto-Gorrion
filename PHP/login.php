<?php
// --- Inicia o reanuda la sesión actual ---
// Esto permite almacenar información del usuario mientras navega en el sistema.
session_start();

// --- Importa la conexión a la base de datos ---
// El archivo 'Conn.php' contiene los parámetros y la lógica para conectarse a la BD.
require '../PHP\Conn.php';

// --- Indica que la respuesta que devolverá el servidor será en formato JSON ---
// Es útil cuando este script se usa junto con JavaScript mediante fetch o AJAX.
header('Content-Type: application/json');

// --- Verifica si la solicitud se realizó mediante el método POST ---
// Esto garantiza que los datos se envíen desde un formulario o una petición segura.
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // --- Captura los datos enviados por el formulario ---
    // Si alguno no existe, se asigna una cadena vacía para evitar errores.
    $NombreUsuario = $_POST['NombreUsuario'] ?? '';
    $Contra        = $_POST['Contra'] ?? '';

    // --- Prepara la consulta SQL para buscar al usuario ---
    // Se seleccionan su ID, contraseña cifrada y rol desde la tabla 'cuentas'.
    $stmt = $conn->prepare("SELECT ID_cuenta, ID_docente, Contra, Rol FROM cuentas WHERE NombreUsuario = ?");
    $stmt->bind_param("s", $NombreUsuario);
    $stmt->execute();
    $result = $stmt->get_result();

    // --- Verifica si el usuario existe en la base de datos ---
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc(); // Obtiene los datos del usuario encontrado.

        // --- Verifica si la contraseña ingresada coincide con la almacenada ---
        // Se usa password_verify porque la contraseña está encriptada con password_hash.
        if (password_verify($Contra, $row['Contra'])) {

            // --- Si la verificación es correcta, se guardan los datos en la sesión ---
            // Esto permitirá mantener al usuario autenticado durante su navegación.
            $_SESSION['ID_cuenta']     = $row['ID_cuenta'];
            $_SESSION['ID_docente']    = $row['ID_docente'];
            $_SESSION['NombreUsuario'] = $NombreUsuario;
            $_SESSION['rol']           = $row['Rol'];
            $_SESSION['loggedin']      = true;

            // --- Redirección según el rol del usuario ---
            // Si es administrador, lo envía al dashboard; si es docente, a su perfil.
            if ($row['Rol'] === 'admin') {
                echo json_encode([
                    "status" => "success",
                    "message" => "Bienvenido administrador",
                    "redirect" => "../PHP\admin_dashboard.php"
                ]);
            } elseif ($row['Rol'] === 'docente') {
                echo json_encode([
                    "status" => "success",
                    "message" => "Bienvenido docente",
                    "redirect" => "../PHP\perfil.php"
                ]);
            } else {
                // --- Si el rol no se reconoce, devuelve un mensaje de error ---
                echo json_encode([
                    "status" => "error",
                    "message" => "Rol no reconocido"
                ]);
            }
        } else {
            // --- Si la contraseña es incorrecta ---
            echo json_encode([
                "status" => "error",
                "message" => "Contraseña incorrecta"
            ]);
        }
    } else {
        // --- Si no se encontró ningún usuario con ese nombre ---
        echo json_encode([
            "status" => "error",
            "message" => "Usuario no encontrado"
        ]);
    }
}
?>
