const fs = require('fs').promises;

class ProductManager {
    static id = 0;

    constructor(path) {
        this.path = path;
    }

    // Método para agregar un nuevo producto al archivo JSON y actualizar el contenido.
    async addProduct(product) {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        product.id = ++ProductManager.id;
        products.push(product);

        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    // Método para leer el contenido del archivo JSON y devolver la lista de productos.
    async getProducts() {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        return products;
    }

    // Método para eliminar un producto del archivo JSON por su 'id' y actualizar el contenido.
    async deleteProduct(id) {
        let content = await fs.readFile(this.path, 'utf-8');
        let products = JSON.parse(content);

        products = products.filter(p => p.id !== id);

        console.log(`Se eliminó el producto con id ${id}`);
        await fs.writeFile(this.path, JSON.stringify(products, null, '\t'));
    }

    // Método para buscar un producto por su 'id' en el archivo JSON y mostrarlo en la consola.
    async getProductById(id) {
        try {
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
        } catch (error) {
            console.error('Error en getProductById:', error.message);
            return null;
        }
    }
}

module.exports = ProductManager;
