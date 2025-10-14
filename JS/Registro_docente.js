// Espera a que todo el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

    // Obtiene el formulario de registro por su ID
    const form = document.getElementById("Formulario_de_registro");

    // Contenedor donde se mostrarán los mensajes de éxito o error
    const mensajeDiv = document.getElementById("mensaje");

    // ----------------------------------------------------------
    // Evento: envío del formulario
    // ----------------------------------------------------------
    form.addEventListener("submit", function(e) {
        // Evita que el formulario recargue la página al enviarse
        e.preventDefault();

        // Crea un objeto FormData con todos los campos del formulario
        let formData = new FormData(form);

        // ------------------------------------------------------
        // Envío de datos al servidor mediante Fetch API
        // ------------------------------------------------------
        fetch("../PHP/form_docentes.php", {
            method: "POST",  // Se envían los datos mediante POST
            body: formData   // Se adjunta el contenido del formulario
        })
        // Convierte la respuesta a texto, ya que el PHP devuelve HTML (no JSON)
        .then(res => res.text())
        .then(data => {
            // Inserta la respuesta del servidor (mensajes, alertas, etc.)
            // dentro del div con ID "mensaje"
            mensajeDiv.innerHTML = data;
        })
        .catch(err => {
            // Si ocurre un error de red o de servidor, lo muestra en pantalla
            mensajeDiv.innerHTML = `<div style="color:red">Error en la petición: ${err}</div>`;
        });
    });
});
