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

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // No permitir que se ejecute el href = #.

        // Obtener los datos de la propiedad y precio desde los atributos 'data-*'
        const property = this.getAttribute('data-property');
        const price = this.getAttribute('data-price');

        // Crear un objeto con la propiedad y el precio
        const propertyData = {
            property: property,
            price: price
        };

        // Verificar si ya existe un carrito en el Local Storage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Añadir la propiedad al carrito
        cart.push(propertyData);

        // Guardar el carrito actualizado en el Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Mostrar en la consola qué propiedad fue añadida
        console.log('Propiedad añadida al carrito:', propertyData);

        // O puedes mostrarlo con un alert
        alert(`Propiedad añadida al carrito: ${property} - Precio: ${price}`);
    });
});

// Llamar a la función al cargar la página
window.onload = activateCurrentNavLink;

document.addEventListener('DOMContentLoaded', function() {
    const properties = JSON.parse(localStorage.getItem('properties')) || [];
    const propertyContainer = document.getElementById('propertyContainer');

    properties.forEach(function(property) {
        const propertyCard = `
            <div class="col-md-3 mb-5"> <!-- Añadido 'mb-4' para margen inferior -->
                <div class="card" style="width: 18rem;">
                    <div class="property-img">
                        <img src="${property.image}" alt="Imagen de la propiedad ${property.name}" width="100%">
                        <div class="price">
                            <p>$${property.price}</p>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row g-6">
                            <div class="col-12">
                                <h3 class="card-title">${property.name}<br>${property.location}</h3>
                            </div>
                        </div>
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
                            <div class="col-6">
                                <i class="bi bi-rulers"></i>
                                <span class="details-text">${property.sqft} sq. ft.</span> 
                            </div>
                        </div>
                        <div class="row">
                            <div class="d-flex mt-3">
                                <a href="#" class="btn btn-primary flex-fill">Detalles</a>
                                <a href="#" class="btn btn-secondary flex-fill add-to-cart" data-property="${property.name}" data-price="${property.price}" style="min-width: 150px;">Añadir al carrito</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        propertyContainer.innerHTML += propertyCard;
    });
});

