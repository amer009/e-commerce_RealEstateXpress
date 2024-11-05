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

    console.log("clave "+password)
    const passwordEncriptada = CryptoJS.SHA256(password).toString();

    // Mostrar en consola los valores 
    console.log("Correo administrador esperado:", adminEmail);
    console.log("Contraseña administrador esperada:", adminPassword);
    console.log("Correo ingresado:", email);
    console.log("Contraseña ingresada:", password);

/*     // Verificar si el correo y la contraseña son del administrador
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
    } */
   
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: email,
        clave:passwordEncriptada
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

   
    fetch("http://127.0.0.1:3000/usuario/login", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue correcta: ' + response.statusText);
            }
            return response.json();
        })
        .then(result => {
            console.log(result); 
            if (result.codigoRespuesta === "00") {

                Swal.fire({
                    title: `¡Hola, ${email}!`,
                    text: 'Inicio de sesión exitoso. Serás redirigido a la página de inicio.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = "inicio.html"; // Redirige a la página de inicio
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: result.message || 'Email o contraseña inválidos.',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al iniciar sesión.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
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
