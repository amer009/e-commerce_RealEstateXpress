// Obtener todos los enlaces del navbar
const navbarLinks = document.querySelectorAll('.navbar-links .navtex, .navbar-brand.navtex');

// Obtener el path actual de la URL (sin la parte del dominio)
const currentPath = window.location.pathname.split('/').pop();

// Recorrer cada enlace del navbar y verificar si el href coincide con la ruta actual
navbarLinks.forEach(link => {
    // Obtener solo el último fragmento del href del enlace
    const linkPath = link.getAttribute('href').split('/').pop();
    
    // Si coincide con la ruta actual, agregar la clase 'active'
    if (linkPath === currentPath) {
        link.classList.add('active');
    }
});
