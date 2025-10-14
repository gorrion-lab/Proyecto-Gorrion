// Datos de videos para Nido Gorrión 
const videosData = [
  {
    id: 1,
    titulo: "Introducción a la Agricultura",
    descripcion: "Aprende los fundamentos básicos para cultivar alimentos en espacios urbanos. Descubre cómo comenzar tu propio huerto sin necesidad de grandes extensiones de tierra.",
    url: "https://www.youtube.com/embed/us4tQ-nDiz4?si=z1pY4TcLbKyz3Wuu",
    tipo: "youtube",
    categoria: "Agricultura Básica"
  },
  {
    id: 2,
    titulo: "Técnicas de Compostaje Doméstico",
    descripcion: "Cómo crear tu propio composta con residuos orgánicos del hogar. Aprende a reciclar tus desechos orgánicos y convertirlos en abono nutritivo para tus plantas.",
    url: "https://www.youtube.com/embed/KLyM2s6XtjE?si=fUYTr6YRBiTqR05y",
    tipo: "youtube",
    categoria: "Compostaje"
  },
];

// Variables globales
let busquedaActiva = false;
let videosFiltrados = [];

// ===== FUNCIONES DEL MENÚ RESPONSIVO =====
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const menuPrincipal = document.getElementById('menuPrincipal');
  
  // Toggle del menú móvil
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

  // Buscar al presionar Enter
  const inputBusqueda = document.getElementById('buscarInput');
  if (inputBusqueda) {
    inputBusqueda.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        buscarVideos();
      }
    });
  }

  // Inicializar la página con los videos
  mostrarContenido();
});

// ===== FUNCIONES DE VIDEOS =====

// Función principal para mostrar contenido de videos
function mostrarContenido() {
  const contenedor = document.getElementById("contenido-dinamico");
  if (!contenedor) return;
  
  // Mostrar loading
  contenedor.innerHTML = '<div class="loading">Cargando videos educativos...</div>';
  
  // Simular tiempo de carga
  setTimeout(() => {
    const contenido = generarContenidoVideos(videosData);
    contenedor.innerHTML = contenido;
  }, 500);
}

// Generar HTML para la sección de videos
function generarContenidoVideos(videos) {
  if (videos.length === 0) {
    return `
      <div class="empty-state">
        <h2>No hay videos disponibles</h2>
        <p>Próximamente agregaremos nuevo contenido.</p>
      </div>
    `;
  }
  
  let videosHTML = `<h2 class="titulo-seccion">${busquedaActiva ? 'Resultados de Búsqueda' : 'Videos Educativos de Agricultura Urbana'}</h2>`;
  videosHTML += `<div class="video-grid">`;
  
  videos.forEach(video => {
    videosHTML += `
      <div class="video-item">
        <h3>${video.titulo}</h3>
        <p><strong>Categoría:</strong> ${video.categoria}</p>
        <p>${video.descripcion}</p>
        <iframe class="video-player" src="${video.url}" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen title="${video.titulo}">
        </iframe>
      </div>
    `;
  });
  
  videosHTML += `</div>`;
  return videosHTML;
}

// ===== FUNCIONES DE BÚSQUEDA =====

// Función de búsqueda
function buscarVideos() {
  const termino = document.getElementById('buscarInput').value.trim().toLowerCase();
  const resultadoBusqueda = document.getElementById('resultadoBusqueda');
  
  if (!resultadoBusqueda) return;
  
  if (termino === '') {
    resultadoBusqueda.innerHTML = '<p>Ingresa un término de búsqueda</p>';
    return;
  }
  
  // Filtrar videos
  videosFiltrados = videosData.filter(video => 
    video.titulo.toLowerCase().includes(termino) || 
    video.descripcion.toLowerCase().includes(termino) ||
    video.categoria.toLowerCase().includes(termino)
  );
  
  // Mostrar resultados
  busquedaActiva = true;
  const contenedor = document.getElementById('contenido-dinamico');
  
  if (!contenedor) return;
  
  if (videosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div class="video-no-encontrado">
        <h3>No se encontraron videos</h3>
        <p>Intenta con otros términos de búsqueda.</p>
      </div>
    `;
    resultadoBusqueda.innerHTML = `<p>No se encontraron resultados para "${termino}"</p>`;
  } else {
    const contenido = generarContenidoVideos(videosFiltrados);
    contenedor.innerHTML = contenido;
    resultadoBusqueda.innerHTML = `<p>Se encontraron ${videosFiltrados.length} video(s) para "${termino}"</p>`;
  }
}

// Limpiar búsqueda
function limpiarBusqueda() {
  const inputBusqueda = document.getElementById('buscarInput');
  const resultadoBusqueda = document.getElementById('resultadoBusqueda');
  
  if (inputBusqueda) inputBusqueda.value = '';
  if (resultadoBusqueda) resultadoBusqueda.innerHTML = '';
  
  busquedaActiva = false;
  videosFiltrados = [];
  mostrarContenido();
}