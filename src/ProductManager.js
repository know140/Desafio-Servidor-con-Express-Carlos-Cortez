const fs = require('fs').promises;

class ProductManager {
    static id = 0;

    constructor(path) {
        this.path = path;
    }

    // Método para agregar un producto al archivo JSON.
    async addProduct(product) {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        // Asignar un ID único al product
        product.id = ++ProductManager.id;
        // Agregar el producto a la lista.
        products.push(product);

        // Escribir la lista actualizada en el archivo JSON.
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    // Método para obtener la lista actual de productos desde el archivo JSON.
    async getProducts() {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        return products;
    }

    // Método para eliminar un producto por su ID del archivo JSON.
    async deleteProduct(id) {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        // Filtrar los productos y eliminar el producto con el ID dado.
        products = products.filter(p => p.id !== id);

        console.log(`Se eliminó el producto con id ${id}`);
        // Escribir la lista actualizada en el archivo JSON.
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    // Método para obtener un producto por su ID desde el archivo JSON.
    async getProductById(id) {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        // Buscar el producto por su ID.
        let product = products.find(product => product.id === id);

        if (product) {
            console.log(`Producto con id ${id} encontrado:`);
            console.log(product);
            return product;
        } else {
            console.log(`No se encontró ningún producto con id ${id}.`);
            return null;
        }
    }

    // Método para actualizar un producto en el archivo JSON.
    async updateProduct(updatedProduct) {
        try {
            let content = await fs.readFile(this.path, 'utf-8');
            let products = JSON.parse(content);

            // Buscar el índice del producto a actualizar por su ID.
            const index = products.findIndex(product => product.id === updatedProduct.id);

            if (index !== -1) {
                // Actualizar el producto en la lista.
                products[index] = updatedProduct;

                // Guardar la lista actualizada en el archivo JSON.
                await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));

                console.log(`Producto con id ${updatedProduct.id} actualizado exitosamente.`);
            } else {
                console.log(`No se encontró ningún producto con id ${updatedProduct.id} para actualizar.`);
            }
        } catch (error) {
            console.error('Error en updateProduct:', error.message);
        }
    }
}

module.exports = ProductManager;
