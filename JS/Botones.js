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

  // Menú responsivo
  const menuToggle = document.getElementById('menuToggle');
  const menuPrincipal = document.getElementById('menuPrincipal');
  
  if (menuToggle && menuPrincipal) {
    menuToggle.addEventListener('click', function() {
      menuPrincipal.classList.toggle('mostrar');
      
      // Cambiar ícono del menú hamburguesa
      const span = menuToggle.querySelector('span');
      if (menuPrincipal.classList.contains('mostrar')) {
        span.textContent = '✕';
      } else {
        span.textContent = '☰';
      }
    });
    
    // Cerrar el menú al hacer clic en un enlace (en dispositivos móviles)
    const enlacesMenu = menuPrincipal.querySelectorAll('a');
    enlacesMenu.forEach(enlace => {
      enlace.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          menuPrincipal.classList.remove('mostrar');
          const span = menuToggle.querySelector('span');
          span.textContent = '☰';
        }
      });
    });
    
    // Cerrar menú al redimensionar la ventana si pasa al modo escritorio
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        menuPrincipal.classList.remove('mostrar');
        const span = menuToggle.querySelector('span');
        span.textContent = '☰';
      }
    });
  }
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