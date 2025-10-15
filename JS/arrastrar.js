/* JS: arrastrar y soltar con soporte touch
   Los elementos .item deben tener atributo data-category con la categoría correcta
   Las dropzones deben tener data-accept con el nombre de la categoría
*/
document.addEventListener('DOMContentLoaded', () => {
  const itemsContainer = document.getElementById('items');
  const items = Array.from(document.querySelectorAll('.item'));
  const dropzones = Array.from(document.querySelectorAll('.dropzone'));
  const matchedCountEl = document.getElementById('matchedCount');
  const totalCountEl = document.getElementById('totalCount');
  const btnReset = document.getElementById('btn-reset');
  const btnVolver = document.getElementById('btn-volver');
  const finishModal = document.getElementById('finishModal');
  const modalReplay = document.getElementById('modal-replay');
  const modalVolver = document.getElementById('modal-volver');

  let matched = 0;
  const total = items.length;
  totalCountEl.textContent = total;
  matchedCountEl.textContent = matched;

  /* ---------- Drag & Drop (Desktop) ---------- */
  items.forEach(item => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', item.id);
      item.classList.add('dragging');
      item.setAttribute('aria-grabbed', 'true');
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      item.setAttribute('aria-grabbed', 'false');
    });
  });

  dropzones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('over');
    });
    zone.addEventListener('dragleave', () => {
      zone.classList.remove('over');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('over');
      const id = e.dataTransfer.getData('text/plain');
      const dragged = document.getElementById(id);
      handleDrop(dragged, zone);
    });
  });

  /* ---------- Touch fallback (móvil / tablet) ---------- */
  // Variables para seguimiento touch
  let touchDragging = null;
  let touchOffset = {x:0,y:0};
  items.forEach(item => {
    // Prevent default gestures
    item.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      touchDragging = item;
      // compute offset between touch point and item's top-left
      const rect = item.getBoundingClientRect();
      touchOffset.x = touch.clientX - rect.left;
      touchOffset.y = touch.clientY - rect.top;
      item.style.position = 'fixed';
      item.style.zIndex = 9999;
      moveItemToTouch(item, touch.clientX - touchOffset.x, touch.clientY - touchOffset.y);
    }, {passive: true});

    item.addEventListener('touchmove', (e) => {
      if (!touchDragging) return;
      const touch = e.touches[0];
      moveItemToTouch(touchDragging, touch.clientX - touchOffset.x, touch.clientY - touchOffset.y);
      e.preventDefault();
    }, {passive: false});

    item.addEventListener('touchend', (e) => {
      if (!touchDragging) return;
      // On release, check if it's over a dropzone
      const droppedZone = dropzones.find(z => isElementOverlappingPoint(z, touchDragging));
      if (droppedZone) {
        handleDrop(touchDragging, droppedZone);
      } else {
        // Return item to original container visually
        resetItemPosition(touchDragging);
      }
      touchDragging = null;
    });
  });

  function moveItemToTouch(el, x, y) {
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  }

  function isElementOverlappingPoint(zone, el) {
    // check center point of dragged element
    const elRect = el.getBoundingClientRect();
    const centerX = elRect.left + elRect.width / 2;
    const centerY = elRect.top + elRect.height / 2;
    const zRect = zone.getBoundingClientRect();
    return (centerX >= zRect.left && centerX <= zRect.right && centerY >= zRect.top && centerY <= zRect.bottom);
  }

  function resetItemPosition(item) {
    item.style.position = '';
    item.style.left = '';
    item.style.top = '';
    item.style.zIndex = '';
  }

  /* ---------- Manejo de drop y correspondencia ---------- */
  function handleDrop(dragged, zone) {
    if (!dragged || !zone) return;
    const expected = dragged.dataset.category;
    const accepts = zone.dataset.accept;

    // Si ya fue colocado correctamente (evitar doble conteo)
    if (dragged.dataset.placed === 'true') return;

    if (expected === accepts) {
      // Colocar dentro de la zona visualmente
      zone.querySelector('.zone-content').appendChild(dragged);
      // Ajustes visuales y accesibilidad
      dragged.setAttribute('aria-grabbed', 'false');
      dragged.dataset.placed = 'true';
      dragged.style.position = '';
      dragged.style.left = '';
      dragged.style.top = '';
      dragged.style.zIndex = '';
      // Bloquear arrastre futuro
      dragged.draggable = false;
      dragged.classList.add('placed');
      // Contador
      matched += 1;
      matchedCountEl.textContent = matched;
      checkWin();
    } else {
      // Error: animación breve y retorno
      dragged.classList.add('shake');
      setTimeout(() => {
        dragged.classList.remove('shake');
        resetItemPosition(dragged);
      }, 500);
    }
  }

  /* ---------- Revisar fin del juego ---------- */
  function checkWin() {
    if (matched === total) {
      // mostrar modal
      showFinishModal();
    }
  }

  /* ---------- Controles ---------- */
  btnReset.addEventListener('click', () => {
    location.reload();
  });
  btnVolver.addEventListener('click', () => {
    window.location.href = 'que-es-gorrion.html'; // cambia si tu archivo tiene otro nombre
  });

  modalReplay.addEventListener('click', () => location.reload());
  modalVolver.addEventListener('click', () => window.location.href = 'que-es-gorrion.html');

  function showFinishModal() {
    finishModal.style.display = 'flex';
    finishModal.setAttribute('aria-hidden', 'false');
  }

  /* ---------- Pequeñas animaciones (CSS classes manipuladas) ---------- */
  // Añadimos CSS dinámicamente para 'shake' si no existe
  const style = document.createElement('style');
  style.innerHTML = `
    .shake{animation:shake .45s}
    @keyframes shake {
      0%{transform:translateX(0)}
      25%{transform:translateX(-6px)}
      50%{transform:translateX(6px)}
      75%{transform:translateX(-4px)}
      100%{transform:translateX(0)}
    }
  `;
  document.head.appendChild(style);
});
