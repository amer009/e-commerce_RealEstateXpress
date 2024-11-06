window.addEventListener('load', activateCurrentNavLink);
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

        const passwordEncriptada = CryptoJS.AES.encrypt(password.value, 'passwordEncrypted').toString();

        // Crear objeto para enviar al backend
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "nombre": nombre.value,
            "email": email.value,
            "telefono": telefono.value,
            "clave": passwordEncriptada,
            "id_rol": 2 // Ajusta el idRol según tu lógica
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://127.0.0.1:3000/usuario/save", requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(result => {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Datos guardados en el servidor.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    window.location.href = "login.html"; // Redirigir a la página de inicio de sesión
                });
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un problema al guardar los datos: ' + error,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            });

        formulario.reset(); // Limpiar campos del formulario
    });

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
