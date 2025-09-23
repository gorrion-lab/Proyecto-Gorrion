// Datos de videos para Nido Gorrión 
const videosData = [
  {
    id: 1,
    titulo: "Introducción a la Agricultura",
    descripcion: "Aprende los fundamentos básicos para cultivar alimentos en espacios urbanos. Descubre cómo comenzar tu propio huerto sin necesidad de grandes extensiones de tierra.",
    url: "https://www.youtube.com/embed/us4tQ-nDiz4?si=z1pY4TcLbKyz3Wuu",
    tipo: "youtube",
   
  },
  {
    id: 2,
    titulo: "Técnicas de Compostaje Doméstico",
    descripcion: "Cómo crear tu propio composta con residuos orgánicos del hogar. Aprende a reciclar tus desechos orgánicos y convertirlos en abono nutritivo para tus plantas.",
    url: "https://www.youtube.com/embed/KLyM2s6XtjE?si=fUYTr6YRBiTqR05y",
    tipo: "youtube",
    
  },

];

// Variables globales
let busquedaActiva = false;
let videosFiltrados = [];

// Función principal para mostrar contenido de videos
function mostrarContenido() {
  const contenedor = document.getElementById("contenido-dinamico");
  
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
                allowfullscreen>
        </iframe>
      </div>
    `;
  });
  
  videosHTML += `</div>`;
  return videosHTML;
}

// Función de búsqueda
function buscarVideos() {
  const termino = document.getElementById('buscarInput').value.trim().toLowerCase();
  const resultadoBusqueda = document.getElementById('resultadoBusqueda');
  
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
  document.getElementById('buscarInput').value = '';
  document.getElementById('resultadoBusqueda').innerHTML = '';
  busquedaActiva = false;
  videosFiltrados = [];
  mostrarContenido();
}

// Buscar al presionar Enter
document.addEventListener('DOMContentLoaded', function() {
  const inputBusqueda = document.getElementById('buscarInput');
  inputBusqueda.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscarVideos();
    }
  });
});

// Inicializar la página con los videos
document.addEventListener('DOMContentLoaded', function() {
  mostrarContenido();
});