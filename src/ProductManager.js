const fs = require('fs').promises;

class ProductManager {
    static id = 0;

    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        product.id = ++ProductManager.id;
        products.push(product);

        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    async getProducts() {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        return products;
    }

    async deleteProduct(id) {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        products = products.filter(p => p.id !== id);

        console.log(`Se eliminó el producto con id ${id}`);
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    async getProductById(id) {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

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

    async updateProduct(updatedProduct) {
        try {
            let content = await fs.readFile(this.path, 'utf-8');
            let products = JSON.parse(content);

            // Buscar el índice del producto a actualizar por su ID.
            const index = products.findIndex(product => product.id === updatedProduct.id);

            if (index !== -1) {
                // Actualizar el producto en la lista.
                products[index] = updatedProduct;

                // Guardar la lista actualizada en el archivo.
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
