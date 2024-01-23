const express = require('express');
const ProductManager = require('./ProductManager');

const server = express();
const port = 30010;

// Asegúrate de tener la ruta correcta del archivo JSON
const manager = new ProductManager('./src/products.json');

server.get('/', (req, res) => {
    res.send('Hola mundo');
});

server.get('/products', async (req, res) => {
    const products = await manager.getProducts();
    res.send(products);
});

server.listen(port, () => console.log(`Server up and running on port ${port}`));
