// Carrusel automático de fotos
function iniciarCarrusel(carrusel) {
  let index = 0;
  const imagenes = carrusel.querySelectorAll("img");

  if (imagenes.length === 0) return; // seguridad por si no hay imágenes

  setInterval(() => {
    // Oculta todas
    imagenes.forEach(img => img.classList.remove("active"));
    
    // Muestra la siguiente
    index = (index + 1) % imagenes.length;
    imagenes[index].classList.add("active");
  }, 4000); // ⏱️ Cambia cada 4 segundos
}

// Inicia el carrusel cuando se carga la página
window.addEventListener("DOMContentLoaded", () => {
  const carruseles = document.querySelectorAll(".carrusel");
  carruseles.forEach(carrusel => iniciarCarrusel(carrusel));
});
