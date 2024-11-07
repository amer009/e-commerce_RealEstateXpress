document.addEventListener('DOMContentLoaded', function() {
    const carritoIcon = document.getElementById('carrito-icon');
    const navLink = carritoIcon.querySelector('.nav-link');
    const currentURL = window.location.pathname;

    console.log('Current URL:', currentURL); // Verificar la URL
    if (currentURL.includes('carrito.html')) {
        console.log('Activando icono de carrito'); // Verificar la activación
        carritoIcon.classList.add('active');
        navLink.classList.add('active');
    } else {
        console.log('Desactivando icono de carrito'); // Verificar la desactivación
        carritoIcon.classList.remove('active');
        navLink.classList.remove('active');
    }
});



document.addEventListener("DOMContentLoaded", function() {
    const greetingMessage = document.getElementById("greeting-message");
    const loginIcon = document.getElementById('login-icon');
    const logoutIcon = document.getElementById('logout-icon');
    const usuario = localStorage.getItem('user');
    
    if (usuario) {
        
        
        if (usuario) {
            greetingMessage.textContent = `¡Saludos, ${usuario}! Tu nuevo terreno te está esperando`;
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
        Swal.fire({
            title: '¡Sesión cerrada!',
            text: 'Has cerrado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            width: '400px',
            customClass: {
                title: 'swal2-title-small',
                content: 'swal2-text-small',
                confirmButton: 'swal2-confirm-small'
            }
        }).then(() => {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('user');
        localStorage.removeItem('userEmail');
        logoutIcon.style.display = "none";
        loginIcon.style.display = "block";
        window.location.href = "/html/carrito.html";
    });
    });
});

window.addEventListener('scroll', function() {
    if (window.scrollY > 90) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); // Evita la ejecución del href = #

        // Obtener los datos de la propiedad y precio desde los atributos 'data-*'
        const property = this.getAttribute('data-property');
        const price = this.getAttribute('data-price');
        const image = this.getAttribute('property-img');

        // Crear un objeto con la propiedad y el precio
        const propertyData = {
            id: this.getAttribute('data-id'),
            property: property,
            price: price,
            image: image,
        };

        // Verificar si ya existe un carrito en el Local Storage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verificar si la propiedad ya está en el carrito
        if (cart.some(item => item.property === property)) {
            alert('Esta propiedad ya está en el carrito.');
            return;
        }

        // Añadir la propiedad al carrito
        cart.push(propertyData);

        // Guardar el carrito actualizado en el Local Storage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Actualizar el DOM con la nueva propiedad añadida
        addToCartDisplay(propertyData);

        // Actualizar el resumen de precios
        updateCartSummary();

        // Mostrar mensaje
        console.log('Propiedad añadida al carrito:', propertyData);
        alert(`Propiedad añadida al carrito: ${property} - Precio: ${price}`);
    });
});

// Función para añadir la propiedad al DOM
function addToCartDisplay(propertyData) {
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart');

    // Eliminar el mensaje de carrito vacío si existe
    if (emptyCartMessage) {
        emptyCartMessage.remove();
    }

    // Crear una tarjeta para la propiedad
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

cartItem.innerHTML = `
    <img src="${propertyData.image}" alt="Imagen de la propiedad" width="100">
    <div class="cart-item-details">
        <h5 class="cart-item-title">${propertyData.title}</h5>
        <p class="cart-item-price">${propertyData.price}</p>
    </div>
    <button class="remove-btn" data-id="${propertyData.id}">Eliminar</button>
`;

    // Añadir evento para eliminar la propiedad
    cartItem.querySelector('.remove-btn').addEventListener('click', function () {
        removeFromCart(propertyData.title, cartItem);
    });

    // Añadir la tarjeta al carrito
    cartItems.appendChild(cartItem);
}

// Función para eliminar una propiedad del carrito
function removeFromCart(title, cartItemElement) {
    // Obtener el carrito del Local Storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    console.log('Carrito antes de eliminar:', cart);
    console.log('Intentando eliminar la propiedad:', title);

    // Filtrar el carrito para eliminar solo la propiedad seleccionada
    const newCart = cart.filter(item => item.title !== title);
    
    console.log('Carrito después de la eliminación:', newCart);

    // Si el carrito ha cambiado, actualiza el Local Storage
    if (newCart.length !== cart.length) {
        // Mostrar alerta de eliminación usando SweetAlert
        Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: `Propiedad eliminada del carrito: ${title}`,
            confirmButtonText: 'Aceptar',
            width: '400px',
            customClass: {
                title: 'swal2-title-small',
                content: 'swal2-text-small',
                confirmButton: 'swal2-confirm-small'
            }
        });

        localStorage.setItem('cart', JSON.stringify(newCart));

        // Eliminar el elemento del DOM
        cartItemElement.remove();

        // Si el carrito queda vacío, mostrar el mensaje de "carrito vacío"
        if (newCart.length === 0) {
            document.getElementById('cart-items').innerHTML = '<p class="empty-cart">No hay propiedades en el carrito.</p>';
        }

        // Actualizar el resumen de precios
        updateCartSummary();
    } else {
        console.error('No se encontró la propiedad para eliminar.');
    }
}


// Función para actualizar el resumen de precios
function updateCartSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSummaryBody = document.getElementById('cart-summary-body');
    const totalPriceElement = document.getElementById('total-price');
    let total = 0;

    // Limpiar el resumen anterior
    cartSummaryBody.innerHTML = '';

    // Crear nuevas filas para cada propiedad
    cart.forEach(item => {
        const row = document.createElement('tr');
        const priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g,""));

        row.innerHTML = `
            <td>${item.title}</td>
            <td>1</td>
            <td>${item.price}</td>
        `;

        total += priceNumber;

        cartSummaryBody.appendChild(row);
    });

    // Actualizar el total
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Inicializar el carrito al cargar la página
window.onload = function () {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Si el carrito no está vacío, mostrar las propiedades
    if (cart.length > 0) {
        cart.forEach(propertyData => {
            addToCartDisplay(propertyData);
        });
    }

    // Actualizar el resumen de precios
    updateCartSummary();
};

// Seleccionar el botón de proceder a pagar
const payButton = document.getElementById('pay-button');

// Añadir el evento de click para redirigir a la pasarela de pagos
document.getElementById('pay-button').addEventListener('click', function() {
    // Verificar si el usuario está logueado comprobando la existencia del correo en localStorage
    const userEmail = localStorage.getItem('loggedInUser');

    if (!userEmail) {
        // Mostrar alerta de SweetAlert indicando que debe iniciar sesión
        Swal.fire({
            title: 'Iniciar sesión',
            text: 'Debe iniciar sesión para poder proceder con el pago.',
            icon: 'warning',
            confirmButtonText: 'Iniciar sesión',
            width: '400px',
            customClass: {
                title: 'swal2-title-small',
                content: 'swal2-text-small',
                confirmButton: 'swal2-confirm-small'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'login.html';
            }
        });
        return;
    }

    // Obtener el precio total del carrito
    const totalPriceElement = document.getElementById('total-price');
    const totalPrice = totalPriceElement.textContent.replace('$', ''); // Remover el símbolo de dólar
    const amount = parseFloat(totalPrice).toFixed(2); // Asegurarse de que es un número con dos decimales

    // Redirigir a la URL de Sandbox de PayPal
    const paypalUrl = `https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_xclick&business=sb-dqzju33176189@business.example.com&item_name=Terreno RealStateXpress&amount=${amount}&currency_code=USD`;
    window.location.href = paypalUrl;
});


