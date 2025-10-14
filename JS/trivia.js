const preguntas = [
  {
    pregunta: "¿Qué busca principalmente el Proyecto Gorrión?",
    opciones: [
      "Impulsar el uso de la inteligencia artificial en la educación",
      "Promover el deporte en las escuelas",
      "Fomentar el arte y la cultura",
      "Crear una red social para estudiantes"
    ],
    respuesta: 0
  },
  {
    pregunta: "¿En qué campo se desarrolla el Proyecto Gorrión?",
    opciones: [
      "Ingeniería en Telemática",
      "Arquitectura",
      "Medicina",
      "Derecho"
    ],
    respuesta: 0
  },
  {
    pregunta: "¿Qué tipo de habilidades busca desarrollar el proyecto?",
    opciones: [
      "Habilidades técnicas mediante IA",
      "Habilidades musicales",
      "Habilidades deportivas",
      "Habilidades sociales"
    ],
    respuesta: 0
  }
];

let preguntaActual = 0;
let puntaje = 0;

const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");
const btnSiguiente = document.getElementById("btn-siguiente");
const resultadoElemento = document.getElementById("resultado");
const quizContenedor = document.getElementById("quiz-container");
const puntajeElemento = document.getElementById("puntaje");

function mostrarPregunta() {
  const actual = preguntas[preguntaActual];
  preguntaElemento.textContent = actual.pregunta;
  opcionesElemento.innerHTML = "";

  actual.opciones.forEach((opcion, index) => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.addEventListener("click", () => seleccionarRespuesta(index));
    opcionesElemento.appendChild(boton);
  });
}

function seleccionarRespuesta(indice) {
  const correcta = preguntas[preguntaActual].respuesta;
  const botones = opcionesElemento.querySelectorAll("button");

  botones.forEach((boton, i) => {
    boton.disabled = true;
    if (i === correcta) {
      boton.style.backgroundColor = "#00a000"; // verde medio
    } else if (i === indice) {
      boton.style.backgroundColor = "#ff4d4d"; // rojo
    }
  });

  if (indice === correcta) {
    puntaje++;
  }

  btnSiguiente.style.display = "inline-block";
}

btnSiguiente.addEventListener("click", () => {
  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    btnSiguiente.style.display = "none";
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});

function mostrarResultado() {
  quizContenedor.classList.add("oculto");
  resultadoElemento.classList.remove("oculto");
  puntajeElemento.textContent = `Tu puntaje final es ${puntaje} de ${preguntas.length}`;
}

function reiniciarTrivia() {
  preguntaActual = 0;
  puntaje = 0;
  resultadoElemento.classList.add("oculto");
  quizContenedor.classList.remove("oculto");
  btnSiguiente.style.display = "none";
  mostrarPregunta();
}

mostrarPregunta();
btnSiguiente.style.display = "none";
