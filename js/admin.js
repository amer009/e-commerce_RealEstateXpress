// Manejar el formulario de nueva propiedad
document.getElementById('propertyForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los datos ingresados
    const titulo = document.getElementById('titulo').value;
    const ubicacion = document.getElementById('ubicacion').value;
    const precio = document.getElementById('precio').value;
    const acres = document.getElementById('acres').value;
    const sqft = document.getElementById('sqft').value;
    const status = document.getElementById('status').value;
    const imagenInput = document.getElementById('imagen');
    
    // Convertir la imagen a Base64
    const reader = new FileReader();
    reader.readAsDataURL(imagenInput.files[0]);
    
    reader.onload = function () {
        const imagenBase64 = reader.result;

        // Crear un objeto con los detalles de la propiedad
        const nuevaPropiedad = {
            titulo,
            ubicacion,
            precio,
            acres,
            sqft,
            status,
            imagen: imagenBase64
        };

        // Obtener las propiedades ya almacenadas en LocalStorage
        const propiedades = JSON.parse(localStorage.getItem('propiedades')) || [];

        // Agregar la nueva propiedad al array
        propiedades.push(nuevaPropiedad);

        // Guardar el array actualizado en el LocalStorage
        localStorage.setItem('propiedades', JSON.stringify(propiedades));

        // Limpiar el formulario
        document.getElementById('propertyForm').reset();

        alert('Propiedad añadida con éxito!');
    };

    reader.onerror = function () {
        console.error("Error al convertir la imagen a Base64");
    };
});
