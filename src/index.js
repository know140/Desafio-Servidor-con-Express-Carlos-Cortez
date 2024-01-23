const ProductManager = require('./ProductManager');

// Crear una instancia de ProductManager con la ruta del archivo JSON.
const manager = new ProductManager('./src/products.json');

// Función asincrónica para cargar archivos, agregar productos, obtener la lista y buscar un producto por ID.
async function cargarArchivos() {
    // Agregar dos productos al archivo JSON.
    await manager.addProduct({ description: 'first product' });
    await manager.addProduct({ description: 'Second product' });
    await manager.addProduct({ description: 'Third product' });

    // Obtener la lista actualizada de productos después de la adición.
    const products = await manager.getProducts();
    console.log('Productos:', products);

    // ID del producto a buscar.
    const productIdToFind = 2;

    // Buscar un producto por ID.
    const foundProduct = await manager.getProductById(productIdToFind);

    // Mostrar el resultado de la búsqueda.
    if (foundProduct) {
        console.log(`Producto con id ${productIdToFind} encontrado:`, foundProduct);
    } else {
        console.log(`No se encontró ningún producto con id ${productIdToFind}.`);
    }
}

// Llamar a la función para cargar archivos y realizar operaciones en los productos.
cargarArchivos();
