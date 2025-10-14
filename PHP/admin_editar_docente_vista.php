<!DOCTYPE html>
<html lang='es'>

<head>
    <meta charset='UTF-8'>
    <title>Editar Docente</title>
    <link rel="stylesheet" href=" ../CSS\Estilo_dash_editar.css">
</head>

<body>
    <header>
        <h2>Editar Docente</h2>
    </header>
    <a href=" ../PHP\admin_dashboard.php" class="btn-regresar">← Regresar al Dashboard</a>

    <form method='POST'>
        <label>Nombre:</label>
        <input type='text' name='Nombre' value='<?= $docente['Nombre'] ?>' required><br>

        <label>Apellido Paterno:</label>
        <input type='text' name='Apellido_paterno' value='<?= $docente['Apellido_paterno'] ?>' required><br>

        <label>Apellido Materno:</label>
        <input type='text' name='Apellido_materno' value='<?= $docente['Apellido_materno'] ?>' required><br>

        <label>Institución:</label>
        <input type='text' name='Institucion' value='<?= $docente['Institucion'] ?>' required><br>

        <label>CCT:</label>
        <input type='text' name='CCT' value='<?= $docente['CCT'] ?>' required><br>

        <label>Municipio:</label>
        <input type='text' name='Municipio' value='<?= $docente['Municipio'] ?>' required><br>

        <label>Comunidad:</label>
        <input type='text' name='Comunidad' value='<?= $docente['Comunidad'] ?>'><br>

        <label>Correo:</label>
        <input type='email' name='Correo_electronico' value='<?= $docente['Correo_electronico'] ?>' required><br>

        <label>Contacto:</label>
        <input type='text' name='Contacto' value='<?= $docente['Contacto'] ?>' required><br>

        <button type='submit'>Actualizar</button>
    </form>
</body>

</html>