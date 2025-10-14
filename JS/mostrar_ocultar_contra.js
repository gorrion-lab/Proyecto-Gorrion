// Seleccionar todos los iconos con la clase .icono_de_ojo
document.querySelectorAll(".icono_de_ojo").forEach(icono => {
    icono.addEventListener("click", () => {
        // Obtener el campo de contraseña asociado al icono
        const input = document.getElementById(icono.dataset.input);

        if (input.type === "password") { //Mostrar contraseña
            input.type = "text";
            icono.src = "../Imagenes/ojo_abierto.png"; 
            icono.title = "Ocultar contraseña";
        } else {//  Ocultar contraseña
            input.type = "password";
            icono.src = "../Imagenes/corte-de-ojos.png"; 
            icono.title = "Mostrar contraseña";
        }
    });
});


