// Función para activar el enlace del navbar correspondiente a la vista actual
function activateCurrentNavLink() {
    // Obtener todos los enlaces del navbar
    const navbarLinks = document.querySelectorAll('.nav-link');

    // Obtener el path actual de la URL (sin la parte del dominio)
    const currentPath = window.location.pathname.split('/').pop();

    // Recorrer cada enlace del navbar y verificar si el href coincide con la ruta actual
    navbarLinks.forEach(link => {
        // Obtener solo el último fragmento del href del enlace
        const linkPath = link.getAttribute('href').split('/').pop();
        
        // Si coincide con la ruta actual, agregar la clase 'active' y cambiar el color
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.style.color = '#4CAF50'; // Cambia el color a verde
        } else {
            link.classList.remove('active');
            link.style.color = 'white'; // Restablecer el color para otros enlaces
        }
    });
}
window.addEventListener('load', activateCurrentNavLink);

// Mostrar saludo personalizado basado en usuario logueado
document.addEventListener("DOMContentLoaded", function() {
    const greetingMessage = document.getElementById("greeting-message");
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const loginIcon = document.getElementById('login-icon');
    const logoutIcon = document.getElementById('logout-icon');

    if (loggedInUserEmail) {
        const registros = JSON.parse(localStorage.getItem('formData')) || [];
        const usuario = registros.find(reg => reg.email.trim() === loggedInUserEmail.trim());
        
        if (usuario) {
            greetingMessage.textContent = `¡Saludos, ${usuario.nombre}! Tu nuevo terreno te está esperando`;
            loginIcon.style.display = "none";
            logoutIcon.style.display = "block";
        } else {
            greetingMessage.textContent = "¡Saludos, visitante! Tu nuevo terreno te está esperando";
            loginIcon.style.display = "block";
            logoutIcon.style.display = "none";
        }
    } else {
        greetingMessage.textContent = "¡Saludos, visitante! Tu nuevo terreno te está esperando";
        loginIcon.style.display = "block";
        logoutIcon.style.display = "none";
    }

    document.getElementById('logoutButton').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('loggedInUser');
        logoutIcon.style.display = "none";
        loginIcon.style.display = "block";
        window.location.href = "/html/acerca.html";
    });
});

// Efecto para cambiar el estilo al hacer scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 90) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// Cambiar la imagen principal cuando se hace clic en una miniatura
function cambiarImagen(event, src) {
    document.getElementById('mainImage').src = src;
    const thumbnails = document.querySelectorAll('.thumbnails img');
    thumbnails.forEach(img => img.classList.remove('active'));
    event.target.classList.add('active');
}