// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    
    // Selecciona el formulario de login por su ID
    const form = document.getElementById("loginForm");

    // Selecciona el contenedor donde se mostrarán los mensajes de error o éxito
    const mensaje = document.getElementById("mensaje");

    // Agrega un listener al evento 'submit' del formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 
        // Evita que el formulario se envíe de manera tradicional (recarga de página)

        // Crea un objeto FormData a partir del formulario
        const formData = new FormData(form);

        try {
            // Realiza una petición POST a la URL especificada en el atributo 'action' del formulario
            const resp = await fetch(form.action, {
                method: "POST",
                body: formData
            });

            // Convierte la respuesta en formato JSON
            const data = await resp.json();

            if (data.status === "success") {
                // Si la respuesta indica éxito, mostrar mensaje de éxito
                mensaje.innerHTML = `<div class="mensaje-exito">${data.message}</div>`;

                // Si la respuesta contiene una URL de redirección, redirige después de 1 segundo
                if (data.redirect) {
                    setTimeout(() => {
                        window.location.href = data.redirect;
                    }, 1000);
                }
            } else {
                // Si hay error (usuario o contraseña incorrecta), mostrar mensaje de error
                mensaje.innerHTML = `<div class="mensaje-error">${data.message}</div>`;
            }

        } catch (error) {
            // Si ocurre un error en la petición o el servidor no responde, mostrar mensaje de error
            mensaje.innerHTML = `<div class="mensaje-error">Error en el servidor: ${error}</div>`;
        }
    });
});
