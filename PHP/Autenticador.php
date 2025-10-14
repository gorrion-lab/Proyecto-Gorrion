<?php
// ===============================================================
// Script: login.php (procesamiento del inicio de sesión)
// Descripción: Valida las credenciales del usuario (nombre y contraseña)
//              contra la base de datos. Si son correctas, crea una sesión
//              y redirige al usuario según su rol (admin o docente).
// ===============================================================

session_start(); // Inicia o reanuda la sesión actual
require 'Conn.php'; // Importa el archivo con la conexión a la base de datos

// ===============================================================
// VALIDACIÓN DE DATOS DEL FORMULARIO
// ===============================================================

// Verifica que los campos requeridos 'NombreUsuario' y 'contra' se hayan enviado mediante POST
if (!isset($_POST['NombreUsuario'], $_POST['contra'])) {
    // Si los datos no existen, redirige al formulario de inicio de sesión
    header('Location: ../PHP/login.php');
    exit;
}

// ===============================================================
// CONSULTA DE USUARIO EN LA BASE DE DATOS
// ===============================================================

// Prepara la consulta SQL para buscar al usuario en la tabla 'cuentas'
if ($stmt = $conn->prepare('SELECT ID, NombreUsuario, Contra, rol FROM cuentas WHERE NombreUsuario = ?')) {

    // Vincula el parámetro recibido desde el formulario
    $stmt->bind_param('s', $_POST['NombreUsuario']);
    $stmt->execute();      // Ejecuta la consulta
    $stmt->store_result(); // Almacena el resultado en memoria

    // ===============================================================
    // VALIDACIÓN DE EXISTENCIA DEL USUARIO
    // ===============================================================
    if ($stmt->num_rows > 0) {
        // Si existe el usuario, se obtienen los datos asociados
        $stmt->bind_result($id, $NombreUsuario, $Contra, $rol);
        $stmt->fetch();

        // ===============================================================
        // VERIFICACIÓN DE CONTRASEÑA
        // ===============================================================
        // Compara la contraseña ingresada con la contraseña cifrada de la BD
        if (password_verify($_POST['contra'], $Contra)) {

            // Si es correcta, se regeneran los datos de sesión para mayor seguridad
            session_regenerate_id();

            // ===============================================================
            // CREACIÓN DE VARIABLES DE SESIÓN
            // ===============================================================
            $_SESSION['loggedin'] = TRUE;          // Indica que hay sesión activa
            $_SESSION['NombreUsuario'] = $NombreUsuario; // Guarda el nombre de usuario
            $_SESSION['id'] = $id;                 // ID del usuario
            $_SESSION['rol'] = $rol;               // Rol del usuario (admin o docente)

            // ===============================================================
            // REDIRECCIÓN SEGÚN EL ROL DEL USUARIO
            // ===============================================================
            if ($rol === 'admin') {
                // Redirige al panel del administrador
                header('Location: ../PHP/admin_dashboard.php');
            } else {
                // Redirige al perfil del docente
                header('Location: ../PHP/perfil.php');
            }
            exit;

        } else {
            // Contraseña incorrecta
            echo "Contraseña incorrecta.";
        }

    } else {
        // Usuario no encontrado en la base de datos
        echo "Usuario no encontrado.";
    }

    // Cierra la consulta preparada
    $stmt->close();
}
?>
