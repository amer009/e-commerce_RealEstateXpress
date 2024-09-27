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
