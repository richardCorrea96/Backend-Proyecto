import fs from 'fs';
import __dirname from '../util.js';
const path = `${__dirname}/json/productos.json`

export default class ProductManager {

    constructor() {
        this.path = path
    }

    getProducts = async() => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products; 
            } else {
                return [];
            }
            } catch (error) {
                console.log(error);
            }
    }

    addProduct = async(product) => {
        try {
            const products = await this.getProducts();
            //generar Id automatico
            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length -1].id + 1;
            }
            //validar que todos los campos obligatorios esten en el producto
            if (!product.hasOwnProperty("title") ||
                !product.hasOwnProperty("description") ||
                !product.hasOwnProperty("price") ||
                !product.hasOwnProperty("category") ||
                !product.hasOwnProperty("code") ||
                !product.hasOwnProperty("stock")) {
                    throw new Error("Missing mandatory fields");}

            // Comprobar si el código ya existe en el arreglo
            const existingProduct = products.find(p => p.code === product.code);
            if (existingProduct) {
                throw new Error("Code already exists");
            }

            product.thumbnails = Array.isArray(product.thumbnails) ?
                [...product.thumbnails] : product.thumbnails ? 
                [product.thumbnails] : [];

            product.status = true
            
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return product;
            } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async(id) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const newProducts = products.filter(obj => obj.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, '\t'))
            return newProducts
        } catch (error) {
            console.error(error);
        }
    }
    

    getProductById = async(id) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            const productById = products.find(p => p.id === id);
            if (productById){
                return productById
            }else{
                return '-Not Found'
            }
        } catch (error) {
            console.log(error);
        }
    }
    updateProduct = async (id, key, newValue) => {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            let products = JSON.parse(data);
            let productToUpdate = products.find(p => p.id === id);
            //si existe...
            if (productToUpdate) {
                //cambio el valor del parametro(key), por el nuevo valor(newValue)
                productToUpdate[key] = newValue;
                //filtro todos los productos excluyendo el producto que quiero modificar
                products = products.filter(p => p.id !== id);
                //a ese nuevo Products filtrado, le pusheo mi producto modificado
                products.push(productToUpdate);
                //sobreescribo mi arreglo por mi arreglo modificado
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return productToUpdate;
            } else {
                //si productToUpdate no existe...
                return '-Not Found';
            }
        } catch (error) {
            console.log(error);
        }
    }
}
