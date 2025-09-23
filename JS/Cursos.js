// Datos de cursos y videos para Nido Gorrión
const cursosData = [
  {
    id: 1,
    titulo: "Cursos de Agricultura ",
    descripcion: "Bienvenidos a su primer curso sobre nutrición en plantas, una serie de videos donde iremos explicando poco a poco la nutrición, fertilizacion de suelos y plantas.",
    imagen: "../Imagenes/Curso1.jpg",
    videos: [
      { id: 1, titulo: "Nutricion en Plantas", duracion: "20:08 min", url: "https://www.youtube.com/embed/oJlWvnCi0nU?si=jvaX_spLLR51Kju0" },
      { id: 2, titulo: "Efectos Negativos de los Fertizantes Quimicos", duracion: "12:38 min", url: "https://www.youtube.com/embed/vnPMwJ9c1Lg?si=ZGidaqrlIG1nEZ4" },
      { id: 3, titulo: "Fertilizasntes Organicos", duracion: "18:03 min", url: "https://www.youtube.com/embed/Zq0MRLG2RVk?si=O7COIim8CxdNyn73" },
      
    ]
  },
  
];

// Variables globales
let cursosFiltrados = [];
let busquedaActiva = false;

// Función principal para mostrar los cursos
function mostrarCursos() {
  const contenedor = document.getElementById("contenido-dinamico");
  
  // Mostrar loading
  contenedor.innerHTML = '<div class="loading">Cargando cursos disponibles...</div>';
  
  // Simular tiempo de carga
  setTimeout(() => {
    const contenido = generarContenidoCursos(cursosData);
    contenedor.innerHTML = contenido;
    
    // Agregar event listeners a los botones
    agregarEventListeners();
  }, 500);
}

// Generar HTML para la sección de cursos
function generarContenidoCursos(cursos) {
  if (cursos.length === 0) {
    return `
      <div class="empty-state">
        <h2>No hay cursos disponibles</h2>
        <p>Próximamente agregaremos nuevo contenido.</p>
      </div>
    `;
  }
  
  let cursosHTML = `<h2 class="titulo-seccion">${busquedaActiva ? 'Resultados de Búsqueda' : 'Cursos de Agricultura Urbana'}</h2>`;
  cursosHTML += `<div class="cursos-grid">`;
  
  cursos.forEach(curso => {
    cursosHTML += `
      <div class="curso-card">
        <img src="${curso.imagen}" alt="${curso.titulo}" class="curso-imagen">
        <div class="curso-contenido">
          <h3 class="curso-titulo">${curso.titulo}</h3>
          <p class="curso-descripcion">${curso.descripcion}</p>
          <button class="boton-ver-curso" data-curso-id="${curso.id}">
            Ver Videos del Curso (${curso.videos.length})
          </button>
        </div>
        <div id="videos-lista-${curso.id}" class="videos-lista">
          ${generarListaVideos(curso.videos, curso.id)}
        </div>
      </div>
    `;
  });
  
  cursosHTML += `</div>`;
  return cursosHTML;
}

// Generar lista de videos para un curso
function generarListaVideos(videos, cursoId) {
  let listaHTML = '';
  
  videos.forEach((video, index) => {
    listaHTML += `
      <div class="video-item" onclick="reproducirVideo('${video.url}', '${video.titulo}')">
        <div class="video-icono">${index + 1}</div>
        <div class="video-info">
          <h4>${video.titulo}</h4>
          <p>Duración: ${video.duracion}</p>
        </div>
      </div>
    `;
  });
  
  return listaHTML;
}

// Agregar event listeners a los botones
function agregarEventListeners() {
  document.querySelectorAll('.boton-ver-curso').forEach(boton => {
    boton.addEventListener('click', function() {
      const cursoId = this.getAttribute('data-curso-id');
      toggleVideosLista(cursoId);
    });
  });
}

// Alternar la visualización de la lista de videos
function toggleVideosLista(cursoId) {
  const lista = document.getElementById(`videos-lista-${cursoId}`);
  const boton = document.querySelector(`[data-curso-id="${cursoId}"]`);
  
  // Cerrar todas las demás listas
  document.querySelectorAll('.videos-lista').forEach(lista => {
    if (lista.id !== `videos-lista-${cursoId}`) {
      lista.classList.remove('abierto');
    }
  });
  
  // Actualizar textos de botones
  document.querySelectorAll('.boton-ver-curso').forEach(btn => {
    if (btn.getAttribute('data-curso-id') !== cursoId) {
      const curso = (busquedaActiva ? cursosFiltrados : cursosData).find(c => c.id == btn.getAttribute('data-curso-id'));
      if (curso) {
        btn.textContent = `Ver Videos del Curso (${curso.videos.length})`;
      }
    }
  });
  
  // Alternar la lista actual
  if (lista.classList.contains('abierto')) {
    lista.classList.remove('abierto');
    const curso = (busquedaActiva ? cursosFiltrados : cursosData).find(c => c.id == cursoId);
    if (curso) {
      boton.textContent = `Ver Videos del Curso (${curso.videos.length})`;
    }
  } else {
    lista.classList.add('abierto');
    boton.textContent = 'Ocultar Videos';
  }
}

// Función de búsqueda
function buscarContenido() {
  const termino = document.getElementById('buscarInput').value.trim().toLowerCase();
  const resultadoBusqueda = document.getElementById('resultadoBusqueda');
  
  if (termino === '') {
    resultadoBusqueda.innerHTML = '<p>Ingresa un término de búsqueda</p>';
    return;
  }
  
  // Filtrar cursos y videos
  cursosFiltrados = cursosData.filter(curso => {
    // Buscar en título y descripción del curso
    const coincideCurso = curso.titulo.toLowerCase().includes(termino) || 
                         curso.descripcion.toLowerCase().includes(termino);
    
    // Buscar en títulos de videos
    const videosCoincidentes = curso.videos.filter(video => 
      video.titulo.toLowerCase().includes(termino)
    );
    
    return coincideCurso || videosCoincidentes.length > 0;
  }).map(curso => {
    // Si el curso coincide, incluir solo los videos que coinciden
    const videosFiltrados = curso.videos.filter(video => 
      video.titulo.toLowerCase().includes(termino)
    );
    
    // Si el curso en sí coincide, incluir todos los videos
    // Si solo algunos videos coinciden, incluir solo esos
    if (curso.titulo.toLowerCase().includes(termino) || 
        curso.descripcion.toLowerCase().includes(termino)) {
      return curso;
    } else {
      return {
        ...curso,
        videos: videosFiltrados
      };
    }
  });
  
  // Mostrar resultados
  busquedaActiva = true;
  const contenedor = document.getElementById('contenido-dinamico');
  
  if (cursosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div class="curso-no-encontrado">
        <h3>No se encontraron resultados</h3>
        <p>Intenta con otros términos de búsqueda.</p>
      </div>
    `;
    resultadoBusqueda.innerHTML = `<p>No se encontraron resultados para "${termino}"</p>`;
  } else {
    const contenido = generarContenidoCursos(cursosFiltrados);
    contenedor.innerHTML = contenido;
    agregarEventListeners();
    
    resultadoBusqueda.innerHTML = `<p>Se encontraron ${cursosFiltrados.length} curso(s) para "${termino}"</p>`;
  }
}

// Limpiar búsqueda
function limpiarBusqueda() {
  document.getElementById('buscarInput').value = '';
  document.getElementById('resultadoBusqueda').innerHTML = '';
  busquedaActiva = false;
  cursosFiltrados = [];
  mostrarCursos();
}

// Buscar al presionar Enter
document.addEventListener('DOMContentLoaded', function() {
  const inputBusqueda = document.getElementById('buscarInput');
  inputBusqueda.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscarContenido();
    }
  });
});

// Reproducir un video específico
function reproducirVideo(url, titulo) {
  const reproductor = document.getElementById('reproductorVideo');
  const videoFrame = document.getElementById('videoFrame');
  
  videoFrame.src = url;
  reproductor.classList.add('mostrar');
  document.body.style.overflow = 'hidden'; // Evitar scroll
}

// Cerrar el reproductor de video
function cerrarReproductor() {
  const reproductor = document.getElementById('reproductorVideo');
  const videoFrame = document.getElementById('videoFrame');
  
  videoFrame.src = '';
  reproductor.classList.remove('mostrar');
  document.body.style.overflow = 'auto'; // Restaurar scroll
}

// Cerrar reproductor al hacer clic fuera del video
document.addEventListener('click', function(e) {
  const reproductor = document.getElementById('reproductorVideo');
  if (e.target === reproductor) {
    cerrarReproductor();
  }
});

// Inicializar la página con los cursos
document.addEventListener('DOMContentLoaded', function() {
  mostrarCursos();
});