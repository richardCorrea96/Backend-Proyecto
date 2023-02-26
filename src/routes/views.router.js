import { Router } from 'express';
import ProductManager from '../managers/ManagerProductos.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router()
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

router.get('/withhandlebars', async (req, res) => {
    const products = await productManager.getProducts();
res.render('home', { products: products })
})

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts' ,{ products: products });
});

export default router


