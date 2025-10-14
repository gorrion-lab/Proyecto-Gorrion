<!DOCTYPE html>
<html lang="es">

<head>
    <!-- 
        Se especifica el tipo de documento HTML5 y el idioma principal de la página.
        La etiqueta <head> contiene la configuración general del documento, metadatos,
        vínculos a hojas de estilo y el título que se muestra en la pestaña del navegador.
    -->
    <meta charset="UTF-8"> <!-- Codificación UTF-8 para permitir caracteres en español -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Ajusta el contenido para que se adapte correctamente a diferentes dispositivos -->
    <title>Cambiar contraseña</title> <!-- Título de la pestaña del navegador -->

    <!-- Enlace externo a la hoja de estilos CSS que define la apariencia de la página -->
    <link rel="stylesheet" href="../CSS/cambiar_contra.css">
</head>

<body>
    <!-- ======================================= -->
    <!-- CABECERA DE USUARIO / MENÚ DE NAVEGACIÓN -->
    <!-- ======================================= -->
    <header>
        <nav class="navbar">
            <!-- Logotipo o título del módulo -->
            <h1 class="logo">Cambiar contra</h1>

            <!-- Menú de navegación con enlaces a otras secciones del sitio -->
            <ul class="menu">
                <li><a href="">Inicio</a></li>
                <li><a href="../PHP/perfil.php">Perfil</a></li>
                <li><a href="../PHP/Cerrar_sesion.php">Cerrar sesión</a></li>
            </ul>
        </nav>
    </header>

    <!-- CONTENEDOR PRINCIPAL QUE ENGLOBA EL FORMULARIO DE ACTUALIZACIÓN -->
    <main class="container">
        <div class="card">
            <h2>Cambiar Contraseña</h2>

            <!-- 
                Formulario que envía los datos mediante el método POST al script PHP 
                "cambiar_contra.php", el cual se encarga de actualizar la contraseña 
                en la base de datos del usuario.
            -->
            <form id="formContra" method="POST" action="../PHP/cambiar_contra.php">

                <!-- Campo para nueva contraseña -->
                <div class="caja_de_texto">
                    <label for="nuevaContra">Ingresa tu nueva contraseña:</label>
                    <input type="password" id="nuevaContra" name="nuevaContra" 
                           required placeholder="Nueva contraseña">
                    <!-- 
                        Ícono de "ojo" que permite mostrar u ocultar la contraseña.
                        El atributo data-input indica a qué campo de texto está asociado.
                    -->
                    <img src="../Imagenes/corte-de-ojos.png" 
                         class="icono_de_ojo" 
                         data-input="nuevaContra" 
                         title="Mostrar contraseña">
                </div>

                <!-- Campo para confirmar contraseña -->
                <div class="caja_de_texto">
                    <label for="confirmarContra">Confirma tu contraseña:</label>
                    <input type="password" id="confirmarContra" name="confirmarContra" 
                           required placeholder="Confirmar contraseña">
                    <img src="../Imagenes/corte-de-ojos.png" 
                         class="icono_de_ojo" 
                         data-input="confirmarContra" 
                         title="Mostrar contraseña">
                </div>

                <!-- Botón de envío del formulario -->
                <button type="submit">Actualizar contraseña</button>

                <!-- 
                    Espacio para mostrar mensajes de confirmación o error 
                    generados desde el script PHP (por ejemplo: "Contraseña actualizada correctamente").
                -->
                <div id="mensaje">
                    <?php if (isset($mensaje)) echo $mensaje; ?>
                </div>
            </form>
        </div>
    </main>

    <!-- PIE DE PÁGINA INFORMATIVO -->
    <footer>
        © 2025 Derechos reservados - UPA
    </footer>
    
    <!-- SCRIPTS EXTERNOS PARA FUNCIONALIDAD DE LA PÁGINA -->

    <!-- 
        Script que controla la funcionalidad de mostrar y ocultar contraseñas
        al hacer clic en el ícono de ojo.
    -->
    <script src="../JS/mostrar_ocultar_contra.js"></script>

    <!-- 
        Script encargado de validar que la nueva contraseña cumpla 
        con los requisitos de seguridad antes de ser enviada (por ejemplo: 
        longitud mínima, coincidencia entre los dos campos, etc.).
    -->
    <script src="../JS/validar_contraseña.js"></script>

</body>
</html>
