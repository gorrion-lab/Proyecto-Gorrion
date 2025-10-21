// ======= PREGUNTAS POR TEMA =======
const preguntasPorTema = {
  redes: [
    {
      pregunta: "¿Qué busca principalmente una red colaborativa en proyectos ambientales?",
      opciones: [
        "Fomentar la cooperación entre distintos grupos para innovar",
        "Competir entre escuelas por recursos",
        "Centralizar decisiones en una sola persona",
        "Crear redes sociales privadas"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Cuál es un beneficio clave de las redes colaborativas?",
      opciones: [
        "Mayor eficiencia y aprendizaje compartido",
        "Menos participación de la comunidad",
        "Aumento de burocracia",
        "Reducción de creatividad"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Qué herramienta ayuda a organizar una red colaborativa?",
      opciones: [
        "Plataformas digitales y reuniones periódicas",
        "Ignorar los problemas locales",
        "Solo enviar correos masivos",
        "Trabajar individualmente"
      ],
      respuesta: 0
    }
  ],
  gestion: [
    {
      pregunta: "¿Qué implica la gestión de recursos naturales?",
      opciones: [
        "Uso sostenible de materiales y energía",
        "Agotar recursos rápidamente",
        "Ignorar el impacto ambiental",
        "Solo producir sin planificar"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Cuál es un principio clave de sostenibilidad?",
      opciones: [
        "Equilibrio entre necesidades actuales y futuras",
        "Maximizar beneficios sin considerar consecuencias",
        "Evitar cooperación con otras instituciones",
        "Centrarse solo en el lucro"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Qué herramienta ayuda en la gestión de recursos?",
      opciones: [
        "Inventarios, monitoreo y planificación",
        "Ignorar datos históricos",
        "Repetir procesos sin medir resultados",
        "Eliminar reportes de seguimiento"
      ],
      respuesta: 0
    }
  ],
  huertos: [
    {
      pregunta: "¿Cuál es el objetivo principal de un huerto escolar?",
      opciones: [
        "Enseñar sobre alimentación saludable y agricultura",
        "Generar ganancias económicas para la escuela",
        "Evitar la participación de los alumnos",
        "Reemplazar clases teóricas"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Qué se cultiva comúnmente en un huerto escolar?",
      opciones: [
        "Verduras, hortalizas y hierbas aromáticas",
        "Sólo flores decorativas",
        "Plantas de gran tamaño exclusivamente",
        "Árboles frutales de gran edad"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Cuál es un beneficio educativo de los huertos?",
      opciones: [
        "Aprender sobre ciencias, nutrición y cuidado del ambiente",
        "Reducir la creatividad de los alumnos",
        "Aumentar la competencia entre estudiantes",
        "Disminuir la participación comunitaria"
      ],
      respuesta: 0
    }
  ],
  educacion: [
    {
      pregunta: "¿Qué busca la educación ambiental?",
      opciones: [
        "Conciencia sobre el cuidado del planeta",
        "Fomentar el consumo sin límites",
        "Ignorar problemas ecológicos",
        "Incrementar el uso de recursos naturales"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Qué estrategia se usa para enseñar educación ambiental?",
      opciones: [
        "Proyectos prácticos y aprendizaje activo",
        "Solo lecturas teóricas",
        "Evitar discusiones sobre el tema",
        "Hacer pruebas sin actividades"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Cuál es un beneficio de la educación ambiental?",
      opciones: [
        "Promover hábitos sostenibles en la comunidad",
        "Incrementar la contaminación",
        "Disminuir la cooperación escolar",
        "Generar apatía ambiental"
      ],
      respuesta: 0
    }
  ],
  participacion: [
    {
      pregunta: "¿Qué significa participación comunitaria?",
      opciones: [
        "Involucrar a la comunidad en la toma de decisiones y acciones",
        "Que solo el gobierno decida",
        "Excluir a los vecinos de proyectos locales",
        "Hacer proyectos solo para expertos"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Cuál es un beneficio de la participación comunitaria?",
      opciones: [
        "Fortalece la cohesión social y la responsabilidad compartida",
        "Crea conflictos permanentes",
        "Reduce la creatividad",
        "Aumenta la burocracia innecesaria"
      ],
      respuesta: 0
    },
    {
      pregunta: "¿Cómo se fomenta la participación comunitaria?",
      opciones: [
        "Reuniones, talleres y actividades colaborativas",
        "Ignorando a los miembros de la comunidad",
        "Tomando decisiones unilateralmente",
        "Solo enviando encuestas"
      ],
      respuesta: 0
    }
  ]
};

// ======= VARIABLES DE CONTROL =======
let preguntas = [];
let preguntaActual = 0;
let puntaje = 0;

const pantallaTemas = document.getElementById("pantalla-temas");
const quizContenedor = document.getElementById("quiz-container");
const resultadoElemento = document.getElementById("resultado");
const preguntaElemento = document.getElementById("pregunta");
const opcionesElemento = document.getElementById("opciones");
const btnSiguiente = document.getElementById("btn-siguiente");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnVolver = document.getElementById("btn-volver");
const puntajeElemento = document.getElementById("puntaje");

// ======= SELECCIÓN DE TEMA =======
const botonesTema = document.querySelectorAll(".tema");
botonesTema.forEach(boton => {
  boton.addEventListener("click", () => {
    const tema = boton.dataset.tema;
    preguntas = preguntasPorTema[tema];
    iniciarTrivia();
  });
});

// ======= INICIAR TRIVIA =======
function iniciarTrivia() {
  pantallaTemas.classList.add("oculto");
  quizContenedor.classList.remove("oculto");
  preguntaActual = 0;
  puntaje = 0;
  btnSiguiente.style.display = "none";
  mostrarPregunta();
}

// ======= MOSTRAR PREGUNTA CON ANIMACIÓN =======
function mostrarPregunta() {
  const actual = preguntas[preguntaActual];
  preguntaElemento.textContent = actual.pregunta;
  opcionesElemento.innerHTML = "";

  // Animación de aparición
  preguntaElemento.classList.remove("pregunta-visible");
  void preguntaElemento.offsetWidth;

  actual.opciones.forEach((opcion, index) => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.addEventListener("click", () => seleccionarRespuesta(index));
    opcionesElemento.appendChild(boton);
  });

  // Crear barra de progreso si no existe
  let progresoContainer = document.getElementById("progreso");
  if (!progresoContainer) {
    progresoContainer = document.createElement("div");
    progresoContainer.id = "progreso";
    progresoContainer.classList.add("progreso");
    const progresoInner = document.createElement("div");
    progresoInner.classList.add("progreso-inner");
    progresoContainer.appendChild(progresoInner);
    quizContenedor.prepend(progresoContainer);
  }

  // Mostrar animación
  setTimeout(() => preguntaElemento.classList.add("pregunta-visible"), 50);
  btnSiguiente.style.display = "none";
}

// ======= CONFETI AL ACERTAR =======
function mostrarConfeti() {
  const cantidad = 20;
  for (let i = 0; i < cantidad; i++) {
    const confeti = document.createElement("div");
    confeti.classList.add("confeti");
    const x = Math.random() * quizContenedor.offsetWidth;
    const y = Math.random() * 50;
    confeti.style.left = x + "px";
    confeti.style.top = y + "px";
    const size = Math.random() * 8 + 4;
    confeti.style.width = size + "px";
    confeti.style.height = size + "px";
    confeti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    quizContenedor.appendChild(confeti);
    setTimeout(() => confeti.remove(), 1000);
  }
}

function seleccionarRespuesta(indice) {
  const correcta = preguntas[preguntaActual].respuesta;
  const botones = opcionesElemento.querySelectorAll("button");

  botones.forEach((boton, i) => {
    boton.disabled = true;
    if (i === correcta) {
      boton.style.backgroundColor = "#00a000";
    } else if (i === indice) {
      boton.style.backgroundColor = "#ff4d4d";
    }
  });

  if (indice === correcta) {
    puntaje++;
    mostrarConfeti();
  }

  // Actualizar barra de progreso al responder
  const progresoInner = document.querySelector(".progreso-inner");
  const porcentaje = ((preguntaActual + 1) / preguntas.length) * 100;
  if (progresoInner) {
    progresoInner.style.width = porcentaje + "%";
  }

  btnSiguiente.style.display = "inline-block";
}


// ======= SIGUIENTE PREGUNTA =======
btnSiguiente.addEventListener("click", () => {
  preguntaActual++;
  if (preguntaActual < preguntas.length) {
    btnSiguiente.style.display = "none";
    mostrarPregunta();
  } else {
    mostrarResultado();
  }
});

// ======= MOSTRAR RESULTADO =======
function mostrarResultado() {
  quizContenedor.classList.add("oculto");
  resultadoElemento.classList.remove("oculto");
  puntajeElemento.textContent = `Tu puntaje final es ${puntaje} de ${preguntas.length}`;
}
btnReiniciar.addEventListener("click", () => {
  resultadoElemento.classList.add("oculto");
  pantallaTemas.classList.remove("oculto");
  quizContenedor.classList.add("oculto");
  // Limpiar barra de progreso
  const progresoContainer = document.getElementById("progreso");
  if (progresoContainer) progresoContainer.remove();
});


// ======= VOLVER A PANTALLA DE TEMAS =======
btnVolver.addEventListener("click", () => {
  resultadoElemento.classList.add("oculto");
  pantallaTemas.classList.remove("oculto");
});

// ======= INICIAR PANTALLA POR DEFECTO =======
quizContenedor.classList.add("oculto");
resultadoElemento.classList.add("oculto");

