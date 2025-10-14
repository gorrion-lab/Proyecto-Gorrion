<?php
require 'Conn.php'; // conexión a la BD
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de registro</title>
    <link rel="stylesheet" href="../CSS/form_docentes.css">
</head>

<body>
    
    <?php 
    //================================================================
    // FUNCIÓN PARA GENERAR UN NOMBRE DE USUARIO ÚNICO
    // ===============================================================
    /**
     * Esta función crea un nombre de usuario basado en los datos personales del docente.
     * - Combina el nombre, apellido paterno y la inicial del apellido materno.
     * - Convierte todo a minúsculas.
     * - Verifica en la base de datos si ya existe ese nombre de usuario.
     * - Si existe, agrega un número aleatorio para hacerlo único.
     * 
     * @param string $Nombre
     * @param string $Apellido_paterno
     * @param string $Apellido_materno
     * @param string $Correo
     * @param mysqli $conn
     * @return string Nombre de usuario único
     */

    function generarUsuario($Nombre, $Apellido_paterno, $Apellido_materno, $Correo, $conn){
        $baseUsuario = strtolower($Nombre . "." . $Apellido_paterno . substr($Apellido_materno, 0, 1));
        $usuario = $baseUsuario;

        while (true) {
            $stmt = $conn->prepare("SELECT COUNT(*) AS total FROM cuentas WHERE NombreUsuario = ?");
            if (!$stmt) die("Error en prepare: " . $conn->error);

            $stmt->bind_param("s", $usuario);
            if (!$stmt->execute()) die("Error en execute: " . $stmt->error);

            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $existe = $row['total'];

            if ($existe == 0) break;
            $usuario = $baseUsuario . rand(10, 99);
        }

        return $usuario;
    }

    // ===============================================================
    // FUNCIÓN PARA GENERAR UNA CONTRASEÑA SEGURA
    // ===============================================================
    /**
     * Esta función genera una contraseña inicial aleatoria y la cifra
     * utilizando el algoritmo BCRYPT antes de almacenarla en la base de datos.
     * 
     * La estructura de la contraseña es: 
     * 3 letras del apellido paterno + 3 dígitos aleatorios + 
     * 2 letras del correo + 1 carácter especial aleatorio.
     * 
     * @param string $Apellido_paterno
     * @param string $Correo
     * @return array [Contraseña en texto plano, Contraseña cifrada]
     */

    function generarContrasena($Apellido_paterno, $Correo){
        $part1 = substr($Apellido_paterno, 0, 3);
        $part2 = rand(100, 999);
        $part3 = substr($Correo, 0, 2);
        $part4 = chr(rand(33, 47));

        $contraPlano = $part1 . $part2 . $part3 . $part4;
        $contraHash  = password_hash($contraPlano, PASSWORD_BCRYPT);

        return [$contraPlano, $contraHash];
    }
    
    // --- Procesar formulario ---
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $Nombre           = $_POST['Nombre'] ?? '';
        $Apellido_paterno = $_POST['Apellido_paterno'] ?? '';
        $Apellido_materno = $_POST['Apellido_materno'] ?? '';
        $Institucion      = $_POST['Institucion'] ?? '';
        $CCT              = $_POST['CCT'] ?? '';
        $Municipio        = $_POST['Municipio'] ?? '';
        $Comunidad        = $_POST['Comunidad'] ?? '';
        $Correo           = $_POST['Correo_electronico'] ?? '';
        $Contacto         = $_POST['contacto'] ?? '';

        // Insertar en docentes
        $stmt = $conn->prepare("INSERT INTO docentes 
        (Nombre, Apellido_paterno, Apellido_materno, Institucion, CCT, Municipio, Comunidad, Correo_electronico, Contacto) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $Nombre, $Apellido_paterno, $Apellido_materno, $Institucion, $CCT, $Municipio, $Comunidad, $Correo, $Contacto);

        if ($stmt->execute()) {
            $ID_docente = $conn->insert_id;

            // Generar usuario y contraseña
            $NombreUsuario = generarUsuario($Nombre, $Apellido_paterno, $Apellido_materno, $Correo, $conn);
            list($ContraPlano, $ContraHash) = generarContrasena($Apellido_paterno, $Correo);

            // Guardar en cuentas con manejo de error de duplicado
            $stmt2 = $conn->prepare("INSERT INTO cuentas (ID_docente, NombreUsuario, Contra) VALUES (?, ?, ?)");
            $stmt2->bind_param("iss", $ID_docente, $NombreUsuario, $ContraHash);

            if ($stmt2->execute()) {
                echo "
            <div class='msj_user_pass'>
                <div class='mensaje-exito'>
                    Usuario creado correctamente.<br>
                    <b>Usuario:</b> " . htmlspecialchars($NombreUsuario) . "<br>
                    <b>Contraseña inicial:</b> " . htmlspecialchars($ContraPlano) . "
                </div>
                <a href='login.html' class='Regreso_al_inicio'>Regresa al inicio de sesión</a>
            </div>
            ";
            } else {
                // Verifica si el error es de clave duplicada
                if ($conn->errno == 1062) { // 1062 = Duplicate entry
                    echo "<div class='mensaje-error'>Error: El usuario ya ha sido registrado.</div>";
                } else {
                    echo "<div class='mensaje-error'>Error al crear la cuenta: " . $stmt2->error . "</div>";
                }
            }
        } else {
            echo "<div class='mensaje-error'>Error al registrar docente: " . $stmt->error . "</div>";
        }
    }
    ?>

</body>

</html>