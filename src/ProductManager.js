const fs = require(`fs`);

class ProductManager {
    static id = 0;
    constructor(path) {
        this.path = path;
        
    }

    async addProduct(product) {


      
      let content = await fs.promises.readFile(this.path, `utf-8`);
      let products = JSON.parse(content);



        product.id = ++ProductManager.id;
        products.push(product);  


        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

    async getProducts() {  

        let content = await fs.promises.readFile(this.path, `utf-8`);
        let products = JSON.parse(content);

        return products;
    }
}

module.exports = ProductManager;
