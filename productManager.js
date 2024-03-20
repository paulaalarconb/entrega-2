const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        let products = this.getProducts();
        product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        const product = products.find(prod => prod.id === id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        let products = this.getProducts();
        const index = products.findIndex(prod => prod.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        products[index] = { ...products[index], ...updatedFields };
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }

    deleteProduct(id) {
        let products = this.getProducts();
        const index = products.findIndex(prod => prod.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        products.splice(index, 1);
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

module.exports = ProductManager;


const manager = new ProductManager('productos.txt');
console.log(manager.getProducts());

manager.addProduct({
    title: "Producto",
    description: "Este es un Producto",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});
console.log(manager.getProducts());
console.log(manager.getProductById(1));

manager.updateProduct(1, { price: 250 });
console.log(manager.getProductById(1));

manager.deleteProduct(1);
console.log(manager.getProducts());
