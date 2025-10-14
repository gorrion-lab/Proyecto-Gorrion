<?php
// ===============================================================
// Script: admin_editar.php
// Descripción: Este archivo permite al administrador editar la información
//              de un docente registrado en la base de datos.
//              Si se envía el formulario, actualiza los datos.
//              Si no, muestra el formulario con la información actual.
// ===============================================================

require '../PHP/Conn.php'; // Importa la conexión a la base de datos

// ===============================================================
// VALIDACIÓN DEL ID DEL DOCENTE
// ===============================================================
$id = $_GET['id'] ?? null; // Obtiene el ID del docente desde la URL (método GET)

// Si no se proporciona un ID, muestra un mensaje y detiene la ejecución
if (!$id) {
    echo "
        <a href='../HTML/login.html'>Inicia sesión para poder acceder al panel</a>
    ";
    exit;
}

// ===============================================================
// PROCESAMIENTO DEL FORMULARIO (MÉTODO POST)
// ===============================================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // --- Captura los valores enviados desde el formulario de edición ---
    $nombre            = $_POST['Nombre'];
    $apellido_paterno  = $_POST['Apellido_paterno'];
    $apellido_materno  = $_POST['Apellido_materno'];
    $institucion       = $_POST['Institucion'];
    $cct               = $_POST['CCT'];
    $municipio         = $_POST['Municipio'];
    $comunidad         = $_POST['Comunidad'];
    $correo            = $_POST['Correo_electronico'];
    $contacto          = $_POST['Contacto'];

    // ===============================================================
    // CONSULTA SQL PARA ACTUALIZAR DATOS DEL DOCENTE
    // ===============================================================
    $sql = "UPDATE docentes 
            SET Nombre=?, 
                Apellido_paterno=?, 
                Apellido_materno=?,
                Institucion=?, 
                CCT=?, 
                Municipio=?, 
                Comunidad=?,
                Correo_electronico=?, 
                Contacto=?
            WHERE ID_docente=?";

    // Prepara la consulta para evitar inyección SQL
    $stmt = $conn->prepare($sql);

    // Asocia los parámetros con los valores del formulario
    $stmt->bind_param(
        "sssssssssi", 
        $nombre, 
        $apellido_paterno, 
        $apellido_materno, 
        $institucion,
        $cct,
        $municipio,
        $comunidad,
        $correo,
        $contacto,
        $id
    );

    // ===============================================================
    // EJECUCIÓN Y RESULTADO DE LA ACTUALIZACIÓN
    // ===============================================================
    if ($stmt->execute()) {
        // Si la actualización fue exitosa, redirige al panel del administrador
        header("Location: ../PHP/admin_dashboard.php");
        exit;
    } else {
        // Si ocurre un error, muestra el mensaje de error
        echo "Error al actualizar: " . $stmt->error;
    }

    // Cierra la consulta preparada
    $stmt->close();

} else {
    // ===============================================================
    // MOSTRAR FORMULARIO CON DATOS EXISTENTES
    // ===============================================================

    // Consulta para obtener los datos actuales del docente
    $sql = "SELECT * FROM docentes WHERE ID_docente=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Obtiene el resultado de la consulta
    $result = $stmt->get_result();
    $docente = $result->fetch_assoc(); // Guarda los datos del docente en un array asociativo
    $stmt->close();

    // ===============================================================
    // IMPORTAR LA VISTA DEL FORMULARIO DE EDICIÓN
    // ===============================================================
    // Este archivo contiene el formulario HTML para mostrar y editar los datos del docente.
    include '../PHP/admin_editar_docente_vista.php';
}
?>
