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

document.getElementById('propertyContainer').addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart')) {
        console.log('Botón Añadir al carrito clickeado');
        event.preventDefault();

        const button = event.target;

        // Encontrar el contenedor 'card' más cercano
        const card = button.closest('.card');

        // Extraer los datos de la propiedad desde el DOM
        const image = card.querySelector('.property-img img').getAttribute('src');
        const price = card.querySelector('.price p').textContent.trim();
        const title = card.querySelector('.card-title').textContent.trim();
        const location = card.querySelector('.location-text').textContent.trim();
        const status = card.querySelector('.status-text').textContent.trim();
        const size = card.querySelectorAll('.details-text')[0].textContent.trim();
        const area = card.querySelectorAll('.details-text')[1].textContent.trim();

        // Crear un objeto con los datos de la propiedad
        const propertyData = {
            title: title,
            price: price,
            image: image,
            location: location,
            status: status,
            size: size,
            area: area,
        };

        // Obtener el carrito del Local Storage o inicializarlo
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(propertyData);

        // Guardar el carrito actualizado en el Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Mostrar alerta de confirmación con SweetAlert
        Swal.fire({
            title: '¡Agregado!',
            text: `Propiedad añadida al carrito: ${title} - Precio: ${price}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
});

// Llamar a la función al cargar la página
window.onload = activateCurrentNavLink;

document.addEventListener('DOMContentLoaded', function() {
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    const propertyContainer = document.getElementById('propertyContainer');

    // Limpiar el contenedor antes de agregar nuevas propiedades
    propertyContainer.innerHTML = '';

    properties.forEach(function(property) {
        const propertyCard = `
        <div class="col-12 col-sm-6 col-md-3 mb-4"> <!-- Ajusta el margen como sea necesario -->
            <div class="card">
                <div class="property-img">
                    <img src="${property.image}" alt="Imagen de la propiedad ${property.title}," width="100%">
                    <div class="price">
                        <p>$${property.price}</p>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title">${property.title}</h3> <!-- Solo el título aquí -->
                    <p class="location-text">${property.location}</p> <!-- Ubicación por separado -->
                    <div class="row">
                        <div class="col-5">
                            <i class="bi bi-geo-alt-fill"></i>
                            <span class="location-text">${property.location}</span>
                        </div>
                        <div class="col-7">
                            <span class="status-text">${property.status}</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-5">
                            <i class="bi bi-bounding-box-circles"></i>
                            <span class="details-text">${property.acres} Acres</span>
                        </div>
                        <div class="col-7">
                            <i class="bi bi-rulers"></i>
                            <span class="details-text">${property.sqft} sq. ft.</span> 
                        </div>
                    </div>
                    <div class="row">
                        <div class="d-flex mt-3">
                            <a href="#" class="btn btn-primary flex-fill">Detalles</a>
                            <a href="#" class="btn btn-secondary flex-fill add-to-cart" style="min-width: 150px;">Añadir al carrito</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
        propertyContainer.innerHTML += propertyCard;
    });
});


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
        window.location.href = "/html/propiedades.html";
    });
});

