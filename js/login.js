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

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = ''; // Limpiar mensaje de error

    // Definir correo y contraseña de administrador
    const adminEmail = 'realestatexpress2024@gmail.com';
    const adminPassword = 'admin1234';

    // Obtener los usuarios almacenados en el localStorage
    const users = JSON.parse(localStorage.getItem('formData')) || [];

    // Verificar que los campos no estén vacíos
    if (!email || !password) {
        Swal.fire({
            title: 'Error',
            text: 'Completa todos los campos.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    // Mostrar en consola los valores 
    console.log("Correo administrador esperado:", adminEmail);
    console.log("Contraseña administrador esperada:", adminPassword);
    console.log("Correo ingresado:", email);
    console.log("Contraseña ingresada:", password);

    // Verificar si el correo y la contraseña son del administrador
    if (email === adminEmail && password === adminPassword) {
        console.log("Correo y contraseña de administrador detectados");
        Swal.fire({
            title: '¡Inicio de sesión como administrador!',
            text: 'Serás redirigido a la vista de administrador.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = "administrador.html"; // Redirige a la vista de administrador
        });
        return; // Salimos de la función si es un administrador
    }

    // Verificar las credenciales de usuario normal
    const user = users.find(user => user.email === email);

    if (user) {
        // Desencriptar la contraseña almacenada
        const passwordDesencriptada = CryptoJS.AES.decrypt(user.password, 'passwordEncrypted').toString(CryptoJS.enc.Utf8);
        if (passwordDesencriptada === password) {
            Swal.fire({
                title: '¡Inicio de sesión exitoso!',
                text: 'Serás redirigido a la página de inicio.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                window.location.href = "inicio.html"; // Redirige a la vista de usuario normal
            });
        }
    } else {
        console.log("Usuario no encontrado o credenciales inválidas");
        Swal.fire({
            title: 'Error',
            text: 'Email o contraseña inválidos.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
        //errorMessage.textContent = 'Email o contraseña inválidos.';
    }
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
