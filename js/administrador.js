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
