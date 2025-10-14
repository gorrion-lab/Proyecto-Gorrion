/**
 * Función: toggleMenu
 * -------------------
 * Muestra u oculta el menú de navegación cuando el usuario hace clic
 * en el botón o ícono del menú (por ejemplo, en dispositivos móviles).
 *
 * Descripción:
 * - Obtiene el elemento con el id "menu".
 * - Alterna (agrega o quita) la clase CSS "show", que controla la visibilidad del menú.
 * - Si el menú está oculto, lo muestra; si está visible, lo oculta.
 */
function toggleMenu() {
    document.getElementById("menu").classList.toggle("show");
}

/**
 * Evento global: window.onclick
 * -----------------------------
 * Detecta cualquier clic en la ventana del navegador.
 *
 * Descripción:
 * - Verifica si el clic ocurrió fuera del botón del menú (elemento con clase "menu-toggle").
 * - Si el clic fue fuera, elimina la clase "show" del elemento con id "menu",
 *   lo que provoca que el menú se cierre automáticamente.
 *
 * Propósito:
 * - Mejora la usabilidad del menú en dispositivos móviles o pantallas pequeñas,
 *   evitando que quede abierto al hacer clic fuera de él.
 */
window.onclick = function (event) {
    // Si el elemento clickeado NO es el botón del menú ni un hijo de este
    if (!event.target.matches('.menu-toggle, .menu-toggle *')) {
        // Cierra el menú removiendo la clase "show"
        document.getElementById("menu").classList.remove("show");
    }
};
