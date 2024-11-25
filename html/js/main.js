// Asegurarse de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el botón por su ID
    const loadProductsButton = document.getElementById('load-products');

    // Verificar si el botón existe en el DOM
    if (loadProductsButton) {
        // Agregar un evento click al botón
        loadProductsButton.addEventListener('click', () => {
            console.log('Botón presionado: Cargando productos...');
            cargarProductos(); // Llamar a la función de carga de productos
        });
    } else {
        console.warn('El botón con ID "load-products" no existe en el DOM.');
    }
});

// Función para cargar productos (debe estar definida antes de ser llamada)
function cargarProductos() {
    // URL de la API
    const apiURL = 'https://fakestoreapi.com/products';

    // Hacer una petición a la API
    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json(); // Convertir la respuesta a JSON
        })
        .then(data => {
            console.log('Productos cargados:', data);
            mostrarProductos(data); // Pasar los datos a otra función para mostrarlos
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
    // Seleccionar el contenedor de productos
    const container = document.querySelector('.row');

    if (container) {
        container.innerHTML = ''; // Limpiar el contenido actual

        productos.forEach(producto => {
            // Crear la estructura HTML para cada producto
            const productHTML = `
                <div class="col">
                    <div class="card shadow-sm">
                        <img src="${producto.image}" alt="${producto.title}" class="card-img-top" height="225">
                        <div class="card-body">
                            <h5 class="card-title">${producto.title}</h5>
                            <p class="card-text">${producto.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                                </div>
                                <small class="text-body-secondary">$${producto.price}</small>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            // Agregarlo al contenedor
            container.innerHTML += productHTML;
        });
    } else {
        console.warn('No tengo ningún contenedor para productos.');
    }
}