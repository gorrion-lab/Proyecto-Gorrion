document.addEventListener("DOMContentLoaded", () => {
    // ====== CARRUSEL DE IMÁGENES ======
    const imagenes = [
        "../Imagenes/img1.jpg",
        "../Imagenes/img2.jpg",
        "../Imagenes/img3.jpg",
        "../Imagenes/img4.jpg",
        "../Imagenes/img5.jpg"
    ];

    let indice = 0;
    const imagen = document.getElementById("imagen-carrusel");

    setInterval(() => {
        indice = (indice + 1) % imagenes.length;
        imagen.src = imagenes[indice];
    }, 4000);

    // ====== MASCOTA INTERACTIVA CON VOZ PROPIA ======
    const mascota = document.querySelector(".mascota");
    const globo = document.getElementById("globo");

    const frases = [
        { texto: "¡Hola! Soy tu amigo Agri.", audio: "../audio/agri1.mp3" },
        { texto: "Recuerda cuidar la naturaleza.", audio: "../audio/agri2.mp3" },
        { texto: "Comparte conocimiento con tu comunidad.", audio: "../audio/agri3.mp3" },
        { texto: "La innovación empieza contigo.", audio: "../audio/agri4.mp3" }
    ];

    let i = 0;

    function hablar() {
        const { texto, audio } = frases[i];
        globo.style.display = "block";
        globo.innerText = texto;

        const sonido = new Audio(audio);
        mascota.classList.add("hablando");
        sonido.play();

        sonido.onended = () => {
            mascota.classList.remove("hablando");
            globo.style.display = "none";
        };

        i = (i + 1) % frases.length;
    }

    mascota.addEventListener("click", hablar);

    // Saludo automático
    setTimeout(hablar, 1000);
});
