document.getElementById('adminForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores de los campos
    const title = document.getElementById('propertyName').value;
    const location = document.getElementById('propertyLocation').value;
    const price = document.getElementById('propertyPrice').value;
    const acres = document.getElementById('propertyAcres').value;
    const sqft = document.getElementById('propertySqft').value;
    const status = document.getElementById('propertyStatus').value;
    const imagenInput = document.getElementById('propertyImage').files[0];

    // Convertir la imagen a Base64
    const reader = new FileReader();
    reader.readAsDataURL(imagenInput.files[0]);

    // Verificar si todos los campos están completos
    if (!title || !price || !location || !status || !acres || !sqft || !imagenInput) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }
    
    // Esperar a que el FileReader termine de leer la imagen
    reader.onloadend = function() {
        const imagenBase64 = reader.result;

        const newProperty = {
            title,
            location,
            price,
            acres,
            sqft,
            status,
            imagenInput: imagenBase64
        };

        // Obtener las propiedades ya almacenadas en LocalStorage
        const properties = JSON.parse(localStorage.getItem('properties')) || [];

        // Agregar la nueva propiedad al array
        properties.push(newProperty);

        // Guardar el array actualizado en el LocalStorage
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
    };

    reader.onerror = function () {
        console.error("Error al convertir la imagen a Base64");
    };
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

