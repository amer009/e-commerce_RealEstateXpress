document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores de los campos
    const title = document.getElementById('propertyName').value;
    const price = document.getElementById('propertyPrice').value;
    const location = document.getElementById('propertyLocation').value;
    const status = document.getElementById('propertyStatus').value;
    const acres = document.getElementById('propertyAcres').value;
    const sqft = document.getElementById('propertySqft').value;
    const image = document.getElementById('propertyImage').files[0];

    // Verificar si todos los campos están completos
    if (!title || !price || !location || !status || !acres || !sqft || !image) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos.',
            width: '400px',
            customClass: {
                title: 'swal2-title-small',
                content: 'swal2-text-small',
                confirmButton: 'swal2-confirm-small'
            }
        });
        return;
    }

    const reader = new FileReader();
    
    // Esperar a que el FileReader termine de leer la imagen
    reader.onloadend = function() {
        const newProperty = {
            title: title,
            price: price,
            location: location,
            status: status,
            acres: acres,
            sqft: sqft,
            image: reader.result // Aquí ya tenemos la imagen en base64
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
            confirmButtonText: 'Aceptar',
            width: '400px',
            customClass: {
                title: 'swal2-title-small',
                content: 'swal2-text-small',
                confirmButton: 'swal2-confirm-small'
            }
        }).then(() => {
            // Limpiar el formulario después de que el usuario cierre la alerta de éxito
            document.getElementById('adminForm').reset();
        });
    };

    // Leer la imagen como una URL base64
    reader.readAsDataURL(image);
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