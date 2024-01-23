const ProductManager = require('./ProductManager');

// Crear una instancia de ProductManager con la ruta del archivo JSON.
const manager = new ProductManager('./src/products.json');

// Función asincrónica para cargar archivos, agregar productos, obtener la lista, buscar un producto por ID, actualizar y eliminar un producto.
async function cargarArchivos() {
    try {
        // Agregar tres productos al archivo JSON.
        await manager.addProduct({ description: 'Primer producto' });
        await manager.addProduct({ description: 'Segundo producto' });
        await manager.addProduct({ description: 'Tercer producto' });

        // Obtener la lista actualizada de productos después de la adición.
        const products = await manager.getProducts();
        console.log('Productos:', products);

        // ID del producto a buscar.
        const productIdToFind = 1;

        // Buscar un producto por ID.
        const foundProduct = await manager.getProductById(productIdToFind);

        // Mostrar el resultado de la búsqueda.
        if (foundProduct) {
            console.log(`Producto con id ${productIdToFind} encontrado:`, foundProduct);
        } else {
            console.log(`No se encontró ningún producto con id ${productIdToFind}.`);
        }

        // ID del producto a actualizar.
        const productIdToUpdate = 2;

        // Obtener el producto existente por su ID.
        const existingProduct = await manager.getProductById(productIdToUpdate);

        if (existingProduct) {
            // Actualizar el producto existente.
            existingProduct.description = 'Producto actualizado';
            await manager.updateProduct(existingProduct);

            // Obtener la lista después de la actualización.
            const productsAfterUpdate = await manager.getProducts();
            console.log('Productos después de la actualización:', productsAfterUpdate);
        } else {
            console.log(`No se encontró ningún producto con id ${productIdToUpdate} para actualizar.`);
        }

        // ID del producto a eliminar.
        const productIdToDelete = 3;

        // Eliminar el producto por ID.
        await manager.deleteProduct(productIdToDelete);

        // Mostrar la lista de productos después de la eliminación.
        const productsAfterDeletion = await manager.getProducts();
        console.log('Productos después de la eliminación:', productsAfterDeletion);
    } catch (error) {
        console.error('Error en cargarArchivos:', error.message);
    }
}

// Llamar a la función para cargar archivos y realizar operaciones en los productos.
cargarArchivos();

