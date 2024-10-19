document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores de los campos
    const name = document.getElementById('propertyName').value;
    const price = document.getElementById('propertyPrice').value;
    const location = document.getElementById('propertyLocation').value;
    const status = document.getElementById('propertyStatus').value;
    const acres = document.getElementById('propertyAcres').value;
    const sqft = document.getElementById('propertySqft').value;
    const image = document.getElementById('propertyImage').files[0];

    // Verificar si todos los campos están completos
    if (!name || !price || !location || !status || !acres || !sqft || !image) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }

    const newProperty = {
        name: name,
        price: price,
        location: location,
        status: status,
        acres: acres,
        sqft: sqft,
        image: URL.createObjectURL(image)
    };

    // Guardar en localStorage
    let properties = JSON.parse(localStorage.getItem('properties')) || [];
    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties));

    // Mostrar alerta de éxito con SweetAlert
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Propiedad añadida exitosamente!',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        // Limpiar el formulario después de que el usuario cierre la alerta de éxito
        document.getElementById('adminForm').reset();
    });
});

const adminEmail = 'realestatexpress2024@gmail.com';

// Función para verificar el acceso
function verificarAccesoAdmin() {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail !== adminEmail) {
        // Redirigir a una página de acceso denegado o a la página de inicio
        window.location.href = '/html/acceso_denegado.html'; // Cambia la ruta según tu estructura de carpetas
    }
}
window.addEventListener('load', function() {
    verificarAccesoAdmin();
    // Aquí puedes agregar cualquier otra inicialización necesaria para la página de administración
});

