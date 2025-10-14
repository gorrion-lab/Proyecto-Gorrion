<?php
require '../PHP\Conn.php';

$id = $_GET['id'] ?? null;

if ($id) {
    $sql = "DELETE FROM docentes WHERE ID_docente='$id'";
    if ($conn->query($sql) === TRUE) {
        header("Location: ../PHP/admin_dashboard.php");
        exit;
    } else {
        echo "Error al eliminar: " . $conn->error;
    }
} else {
    echo "ID no válido.";
}

