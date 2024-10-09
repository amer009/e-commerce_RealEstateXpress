// Función para activar el enlace del navbar correspondiente a la vista actual
function activateCurrentNavLink() {
    const navbarLinks = document.querySelectorAll('.navbar-links .navtex');
    const currentPath = window.location.pathname.split('/').pop();

    navbarLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
            link.style.color = '#4CAF50'; // Cambia el color a verde
        } else {
            link.classList.remove('active');
            link.style.color = 'white'; // Restablecer el color para otros enlaces
        }
    });
}

window.onload = activateCurrentNavLink;

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = ''; // Limpiar mensaje de error

    // Obtener los usuarios almacenados en localStorage
    const users = JSON.parse(localStorage.getItem('formData')) || [];

    // Verificar que los campos no estén vacíos
    if (!email || !password) {
        Swal.fire({
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        return;
    }

    // Buscar el usuario en la lista de usuarios almacenados
    const usuarioEncontrado = users.find(user => user.email === email);

    if (!usuarioEncontrado) {
        Swal.fire({
            title: 'Error',
            text: 'Usuario no encontrado.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        return;
    }

    // Desencriptar la contraseña almacenada
    const passwordDesencriptada = CryptoJS.AES.decrypt(usuarioEncontrado.password, 'passwordEncrypted').toString(CryptoJS.enc.Utf8);

    // Validar si la contraseña ingresada es correcta
    if (password !== passwordDesencriptada) {
        Swal.fire({
            title: 'Error',
            text: 'Contraseña incorrecta.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        return;
    }

    // Verificar si el correo es de un administrador (basado en el dominio)
    if (email.endsWith('@realestatexpress.com')) {
        Swal.fire({
            title: '¡Inicio de sesión como administrador!',
            text: 'Serás redirigido a la vista de administrador.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = "admin.html"; // Redirige a la vista de administrador
        });
        return; // Salimos de la función si es un administrador
    }

    // Si las credenciales son válidas para un usuario normal
    Swal.fire({
        title: '¡Inicio de sesión exitoso!',
        text: 'Serás redirigido a la página de inicio.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.href = "inicio.html"; // Redirige a la vista de usuario normal
    });
});

// Evento para alternar la visibilidad de la contraseña
const togglePassword = document.getElementById('togglePassword');
togglePassword.addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.classList.toggle('fa-eye-slash');
    this.classList.toggle('fa-eye');
});