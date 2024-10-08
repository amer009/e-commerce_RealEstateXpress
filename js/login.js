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
            link.classList.remove('active'); // Eliminar la clase 'active' si no coincide
            link.style.color = 'white'; // Restablecer el color para otros enlaces
        }
    });
}

// Llamar a la función al cargar la página
window.onload = activateCurrentNavLink;


document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.textContent = ''; // Limpiar mensaje de error

    // Obtener los usuarios almacenados
    const users = JSON.parse(localStorage.getItem('formData')) || [];

    // Verificar que los campos no estén vacíos
    if (!email || !password) {
        errorMessage.textContent = 'Por favor, completa todos los campos.';
        return;
    }

    // Verificar si las credenciales son válidas
    const user = users.find(user => user.email === email && user.password === password);

  // Verificar si el correo es de un administrador
  if (email.endsWith('realestatexpress.com')) { // Cambia @empresa.com por el dominio de la empresa
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


if (user) {
    Swal.fire({
        title: '¡Inicio de sesión exitoso!',
        text: 'Serás redirigido a la página de inicio.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        window.location.href = "inicio.html"; // Redirige a la vista de usuario normal
    });
} else {
    Swal.fire({
        title: 'Error',
        text: 'Email o contraseña inválidos.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
    });
    errorMessage.textContent = 'Email o contraseña inválidos.';
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
