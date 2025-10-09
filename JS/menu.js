const menuToggle = document.getElementById('menu-toggle');
const menuList = document.querySelector('#nav-menu ul');

menuToggle.addEventListener('click', () => {
    menuList.classList.toggle('active');

    if(menuList.classList.contains('active')){
        menuToggle.textContent = '✖ Cerrar';
    } else {
        menuToggle.textContent = '☰ Menú';
    }
});
