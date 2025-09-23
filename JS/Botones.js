// Función para navegar a la página de videos
function navegarAVideos() {
  window.location.href = 'videos.html';
}

// Función para navegar a la página de cursos
function navegarACursos() {
  window.location.href = 'cursos.html';
}

// Función para manejar navegación con teclado (accesibilidad)
document.addEventListener('DOMContentLoaded', function() {
  // Agregar event listeners para mejor accesibilidad
  const botones = document.querySelectorAll('.boton');
  
  botones.forEach(boton => {
    boton.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
});

// Función genérica para navegación (opcional)
function navegarA(pagina) {
  try {
    window.location.href = pagina;
  } catch (error) {
    console.error('Error al navegar:', error);
    alert('No se pudo cargar la página solicitada.');
  }
}