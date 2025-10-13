function verPDF(url) {
  window.open(url, "_blank");
}

function mostrarContenido(tipo) {
  const contenedor = document.getElementById("contenido-dinamico");
  let contenido = "";

  // Ejemplo Biblioteca del Nido
  if (tipo === "Biblioteca del Nido") {
    contenido = `
      <h2>Biblioteca del Nido</h2>
    <iframe src="https://drive.google.com/embeddedfolderview?id=1buh1daBu01lMNmNl59-6a0juOvj2vmRP#grid" 
            style="width:100%; height:600px; border:0;"></iframe>
    `;
  }

  // Ejemplo Ramillete de Ideas
  if (tipo === "Ramillete de Ideas") {
    contenido = `
      <h2>Ramillete de Ideas</h2>
      <iframe src="https://drive.google.com/embeddedfolderview?id=1P0F4k6kZ27sk0Hkcy8XpBMkUCoggvEtU#grid" 
        style="width:100%; height:600px; border:0;"></iframe>

    `;
  }

  
  // Ejemplo Voces al Vuelo
  if (tipo === "Voces al Vuelo") {
  contenido = `
    <h2>Voces al Vuelo (Podcasts) </h2>
    <iframe src="https://open.spotify.com/embed/show/5UnyVhxDZ8fvKdwsLF7wIl" 
            width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
  `;
}

  // Inyecta el contenido dentro del div dinámico
  contenedor.innerHTML = contenido;
}






