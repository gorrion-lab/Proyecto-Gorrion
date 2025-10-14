// JS para abrir/cerrar el menú
const hamburgesa = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburgesa.addEventListener("click", () => {
    hamburgesa.classList.toggle("active");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
});

// Cierra el menú si se hace clic fuera
document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
        hamburger.classList.remove("active");
    }
});
