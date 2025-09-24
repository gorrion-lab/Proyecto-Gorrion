// ====== MASCOTA INTERACTIVA: ¿Qué es GORRIÓN? ======

// Selección de elementos
const mascota = document.querySelector(".mascota");
const globo = document.getElementById("globo");

// Frases con su audio correspondiente
const frases = [
    { texto: "¡Bienvenido a ¿Qué es GORRIÓN?!", audio: "audio/gorrion1.mp3" },
    { texto: "GORRIÓN es un proyecto de innovación social.", audio: "audio/gorrion2.mp3" },
    { texto: "Buscamos colaboración y organización comunitaria.", audio: "audio/gorrion3.mp3" },
    { texto: "El conocimiento compartido fortalece a todos.", audio: "audio/gorrion4.mp3" },
    { texto: "La innovación empieza con pequeñas acciones.", audio: "audio/gorrion5.mp3" }
];

let i = 0;

// Función para hablar
function hablar() {
    const { texto, audio } = frases[i];

    // Mostrar globo con texto
    globo.style.display = "block";
    globo.innerText = texto;

    // Reproducir audio
    const sonido = new Audio(audio);
    mascota.classList.add("hablando");
    sonido.play();

    // Cuando termina el audio, quitar animación y ocultar globo
    sonido.onended = () => {
        mascota.classList.remove("hablando");
        globo.style.display = "none";
    };

    // Pasar a la siguiente frase
    i = (i + 1) % frases.length;
}

// Evento: mascota habla al hacer click
mascota.addEventListener("click", hablar);

// Saludo automático al cargar la página
window.addEventListener("load", () => {
    setTimeout(hablar, 1000);
});
