// Función para activar el enlace del navbar correspondiente a la vista actual
function activateCurrentNavLink() {
    // Obtener todos los enlaces del navbar
    const navbarLinks = document.querySelectorAll('.navbar-links .navtex');

    // Obtener el path actual de la URL (sin la parte del dominio)
    const currentPath = window.location.pathname.split('/').pop();

    // Recorrer cada enlace del navbar y verificar si el href coincide con la ruta actual
    navbarLinks.forEach(link => {
        // Obtener solo el último fragmento del href del enlace
        const linkPath = link.getAttribute('href').split('/').pop();

        // Si coincide con la ruta actual, agregar la clase 'active'
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.style.color = '#4CAF50'; // Cambia el color a verde
        } else {
            link.style.color = 'white'; // Restablecer el color para otros enlaces
        }
    });
}
// Llamar a la función al cargar la página
window.onload = activateCurrentNavLink;


document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.getElementById('miFormulario');
    var togglePassword = document.getElementById('togglePassword');
    var toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    var email = document.getElementById('email');
    var nombre = document.getElementById('nombre');
    var telefono = document.getElementById('telefono');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario

        // Expresión regular para validar el correo
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Expresión regular para validar la contraseña
        var passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[\*\#\$])[A-Za-z0-9\*\#\$]{8,}$/;

        // Limpiar mensajes de error previos
        confirmPassword.setCustomValidity('');
        email.setCustomValidity('');
        password.setCustomValidity('');

        // Validación general de campos vacíos
        if (nombre.value.trim() === '' || telefono.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '' || confirmPassword.value.trim() === '') {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos correctamente.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return; // Salir de la función si hay campos vacíos
        }

        // Validar estructura de correo electrónico
        if (!emailRegex.test(email.value)) {
            Swal.fire({
                title: 'Error',
                text: 'El correo electrónico debe tener una estructura válida.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Validar la estructura de la contraseña
        if (!passwordRegex.test(password.value)) {
            Swal.fire({
                title: 'Error',
                text: 'La contraseña debe tener al menos 8 caracteres, con al menos una mayúscula, un número y un carácter especial (*, #, $).',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Validar que las contraseñas coincidan
        if (password.value !== confirmPassword.value) {
            Swal.fire({
                title: 'Error',
                text: 'Las contraseñas no coinciden.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Si todos los campos son válidos, procesar el formulario
        var formData = {
            nombre: nombre.value,
            telefono: telefono.value,
            email: email.value,
            password: password.value
        };

        var registros = JSON.parse(localStorage.getItem('formData')) || [];
        registros.push(formData);
        localStorage.setItem('formData', JSON.stringify(registros));

        Swal.fire({
            title: '¡Éxito!',
            text: 'Datos guardados en localStorage.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        formulario.reset(); // Limpiar campos del formulario
    }, false);

    // Evento para alternar la visibilidad de la contraseña
    togglePassword.addEventListener('click', function () {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });

    // Evento para alternar la visibilidad de la confirmación de contraseña
    toggleConfirmPassword.addEventListener('click', function () {
        const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPassword.setAttribute('type', type);
        this.classList.toggle('fa-eye-slash');
        this.classList.toggle('fa-eye');
    });
});










