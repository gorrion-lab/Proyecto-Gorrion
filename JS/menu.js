// Seleccionamos el botón y el menú
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

// Evento para abrir/cerrar el menú
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Cambiar el ícono del botón de ☰ a X
    if(navMenu.classList.contains('active')){
        menuToggle.textContent = '✖ Cerrar';
    } else {
        menuToggle.textContent = '☰ Menú';
    }
});
