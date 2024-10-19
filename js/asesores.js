
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
        localStorage.removeItem('loggedInUser');
        logoutIcon.style.display = "none";
        loginIcon.style.display = "block";
        window.location.href = "/html/asesores.html";
    });
});

