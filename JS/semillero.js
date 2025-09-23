function verPDF(url) {
  window.open(url, "_blank");
}

function mostrarContenido(tipo) {
  const contenedor = document.getElementById("contenido-dinamico");
  let contenido = "";

  if (tipo === "libros") {
    contenido = `
      <h2>Libros</h2>
      <iframe src=" https://drive.google.com/embeddedfolderview?id=1RG535HnKTUGhVns_cHhb8MjRuONOKI9R#grid" 
              style="width:100%; height:600px; border:0;"></iframe>
    `;
  }

  // ?? Ejemplo para artículos
  if (tipo === "articulos") {
    contenido = `
      <h2>Articulos</h2>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1ff4OrHmVcl9U3jM_2ZyV65iI9P7_e2Zh#grid" 
              style="width:100%; height:600px; border:0;"></iframe>
    `;
  }

  
  // ?? Ejemplo para podcasts
  if (tipo === "podcasts") {
  contenido = `
    <h2>Podcasts </h2>
    <iframe src="https://open.spotify.com/embed/show/5UnyVhxDZ8fvKdwsLF7wIl" 
            width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  `;
}

  // Inyecta el contenido dentro del div dinámico
  contenedor.innerHTML = contenido;
}




