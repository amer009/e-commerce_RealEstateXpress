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
        localStorage.setItem('userEmail', email);
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
        
        // Si el correo es correcto pero la contraseña es incorrecta
        if (passwordDesencriptada !== password) {
            Swal.fire({
                title: 'Error',
                text: 'Contraseña incorrecta.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
            return; // Salimos de la función si la contraseña es incorrecta
        }

        // Si tanto el correo como la contraseña son correctos
        Swal.fire({
            title: `¡Hola, ${user.nombre}!`,
            text: 'Inicio de sesión exitoso. Serás redirigido a la página de inicio.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            localStorage.setItem('loggedInUser', email);
            window.location.href = "inicio.html"; // Redirige a la vista de usuario normal
        });
    } else {
        console.log("Usuario no encontrado o credenciales inválidas");
        Swal.fire({
            title: 'Error',
            text: 'Email o contraseña inválidos.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo'
        });
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
function openGmailWithAlert() {
    // Mostrar la alerta de SweetAlert2
    Swal.fire({
      icon: 'info',
      title: '¿Olvidaste tu contraseña?',
      text: 'Si lo deseas, envíanos un correo electrónico para ayudarte.',
      showCancelButton: true,
      confirmButtonText: 'Enviar correo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, abrir Gmail con el correo prellenado
        var gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=realestatexpress2024@gmail.com&su=Recuperación%20de%20contraseña&body=Por%20favor%20ayúdenme%20a%20recuperar%20mi%20contraseña";
        window.open(gmailUrl, '_blank'); // Abre en una nueva pestaña
      }
    });
}
