document.addEventListener("DOMContentLoaded", () => {
  const seleccionNivel = document.getElementById("seleccionNivel");
  const gameContainer = document.getElementById("gameContainer");
  const gameBoard = document.getElementById("gameBoard");
  const winModal = document.getElementById("winModal");
  const restartBtn = document.getElementById("restartBtn");
  const volverBtn = document.getElementById("volverBtn");

  const allImages = [
    "plantas.png", "semillas.png", "agua.png", "sol.png", "abeja.png",
    "pala.png", "maceta.png", "tierra.png", "regadera.png", "compost.png",
    "arbol.png", "fruta.png", "hoja.png", "flor.png", "huerto.png"
  ];

  let selectedImages = [];
  let flippedCards = [];
  let matchedCards = [];

  // ===== SELECCIÓN DE DIFICULTAD =====
  document.querySelectorAll(".botones-nivel button").forEach(button => {
    button.addEventListener("click", () => {
      const pares = parseInt(button.dataset.pares);
      iniciarJuego(pares);
    });
  });

  function iniciarJuego(pares) {
    seleccionNivel.classList.add("oculto");
    gameContainer.classList.remove("oculto");

    // Seleccionar aleatoriamente las imágenes según la cantidad de pares
    selectedImages = allImages.sort(() => 0.5 - Math.random()).slice(0, pares);
    const cards = [...selectedImages, ...selectedImages].sort(() => 0.5 - Math.random());

    // Crear el tablero
    gameBoard.innerHTML = "";
    cards.forEach(img => {
      const card = document.createElement("div");
      card.classList.add("card");

      const image = document.createElement("img");
      image.src = `../IMG/memorama/${img}`;
      image.alt = img.split(".")[0];

      card.appendChild(image);
      card.addEventListener("click", () => flipCard(card));
      gameBoard.appendChild(card);
    });
  }

  // ===== FUNCIONES DEL JUEGO =====
  function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector("img").src;
    const img2 = card2.querySelector("img").src;

    if (img1 === img2) {
      matchedCards.push(card1, card2);
      flippedCards = [];
      if (matchedCards.length === selectedImages.length * 2) {
        setTimeout(() => {
          winModal.style.display = "flex";
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flippedCards = [];
      }, 800);
    }
  }

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  volverBtn.addEventListener("click", () => {
    window.location.href = "que-es-gorrion.html"; 
  });
});
