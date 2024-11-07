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

document.addEventListener("DOMContentLoaded", function() {
    const greetingMessage = document.getElementById("greeting-message");
    const loginIcon = document.getElementById('login-icon');
    const logoutIcon = document.getElementById('logout-icon');
    const usuario = localStorage.getItem('user');
    
    if (usuario) {
        
        
        if (usuario) {
            greetingMessage.textContent = `¡Saludos, ${usuario}! Tu nuevo terreno te está esperando`;
            loginIcon.style.display = "none";
            logoutIcon.style.display = "block";
        } else {
            greetingMessage.textContent = "¡Saludos, visitante! Tu nuevo terreno te está esperando";
            logoutIcon.style.display = "none";
            loginIcon.style.display = "block";
        }
    } else {
        greetingMessage.textContent = "¡Saludos, visitante! Tu nuevo terreno te está esperando";
        logoutIcon.style.display = "none";
        loginIcon.style.display = "block";
    }

    document.getElementById('logoutButton').addEventListener('click', function(event) {
        event.preventDefault();
        Swal.fire({
            title: '¡Sesión cerrada!',
            text: 'Has cerrado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            width: '400px',
            customClass: {
                title: 'swal2-title-small',
                content: 'swal2-text-small',
                confirmButton: 'swal2-confirm-small'
            }
        }).then(() => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');
        logoutIcon.style.display = "none";
        loginIcon.style.display = "block";
        window.location.href = "/html/contactanos.html";
    });
    });
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 90) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Validar que todos los campos estén completos
    const form = event.target;
    const formData = new FormData(form);
    let isValid = true;

    // Verifica si cada campo tiene un valor
    for (let [key, value] of formData.entries()) {
        if (!value.trim()) { // Si el campo está vacío
            isValid = false;
            break;
        }
    }

    if (!isValid) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos antes de enviar el formulario.',
            confirmButtonText: 'Aceptar',
            width: '400px',
            customClass: {
                title: 'swal2-title-small',
                content: 'swal2-text-small',
                confirmButton: 'swal2-confirm-small',
                cancelButton: 'swal2-cancel-small'
            }
        });
        return; // Detiene el envío si falta algún campo
    }

    // Si todos los campos están completos, procede a enviar el formulario
    fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: '¡Mensaje enviado!',
                text: 'Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.',
                confirmButtonText: 'Aceptar',
                width: '400px',
                customClass: {
                    title: 'swal2-title-small',
                    content: 'swal2-text-small',
                    confirmButton: 'swal2-confirm-small',
                    cancelButton: 'swal2-cancel-small'
                }
            });
            form.reset(); // Limpia el formulario después del envío exitoso
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde.',
                confirmButtonText: 'Aceptar',
                width: '400px',
                customClass: {
                    title: 'swal2-title-small',
                    content: 'swal2-text-small',
                    confirmButton: 'swal2-confirm-small',
                    cancelButton: 'swal2-cancel-small'
                }
            });
        }
    }).catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al enviar el mensaje. Inténtalo de nuevo más tarde.',
            confirmButtonText: 'Aceptar',
            width: '400px',
            customClass: {
                title: 'swal2-title-small',
                content: 'swal2-text-small',
                confirmButton: 'swal2-confirm-small',
                cancelButton: 'swal2-cancel-small'
            }
        });
    });
});