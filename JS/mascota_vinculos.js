document.addEventListener("DOMContentLoaded", () => {
  const burbuja = document.getElementById("burbuja");
  const frases = [
    "🌱 Bienvenido al Proyecto Gorrión",
    "💡 Haz clic en los municipios para conocer más",
    "🌍 La naturaleza es nuestro mejor aliado",
    "📚 Aprende, comparte y crece con nosotros",
    "🌾 Juntos hacemos comunidad"
  ];
  let indice = 0;

  function mostrarFrase() {
    burbuja.textContent = frases[indice];
    burbuja.classList.add("mostrar");

    setTimeout(() => {
      burbuja.classList.remove("mostrar");
    }, 4000);

    indice = (indice + 1) % frases.length;
  }

  // Cambiar frase cada 6 segundos
  setInterval(mostrarFrase, 6000);

  // Mostrar la primera inmediatamente
  mostrarFrase();
});
