const ProductManager = require('./ProductManager');

const manager = new ProductManager(`./src/products.json`);




async function cargarArchivos() {
        await manager.addProduct({ description: `first product` });
        await manager.addProduct({ description: `Second product` });

        const products = await manager.getProducts()
        console.log (products)

        await manager.deleteProduct(1)
}






    

cargarArchivos();
