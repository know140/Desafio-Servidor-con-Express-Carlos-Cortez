const express = require('express');
const ProductManager = require('./ProductManager');

const server = express();
const port = 5050;

server.use(express.urlencoded({extended:true}))

// Asegúrate de tener la ruta correcta del archivo JSON
const manager = new ProductManager('./src/products.json');

server.get('/', (req, res) => {
    res.send('Hola mundo');
});

server.get('/products', async (req, res) => {
    let products = await manager.getProducts();


    const {description} = req.query;
    if(description){
        products = products.filter(p=>p.description.includes(description))

    }



    res.send(products);
});



server.listen(port, () => console.log(`Server up and running on port ${port}`));
