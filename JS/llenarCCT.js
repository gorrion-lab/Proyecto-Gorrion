document.getElementById('Institucion').addEventListener('change', function() {
  const selected = this.options[this.selectedIndex];
  const cct = selected.getAttribute('data-cct');
  document.getElementById('CCT').value = cct || '';
});

