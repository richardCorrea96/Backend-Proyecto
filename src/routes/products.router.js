import { Router } from 'express';
import ProductManager from '../managers/ManagerProductos.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    let limit = Number(req.query.limit);
    if (!limit) {
        res.send(products);
    } else {
        res.send(products.slice(0, limit));
    }
})

router.get('/:pid', async (req,res)=> {
    const idProduct = Number(req.params.pid);
    const product = await productManager.getProductById(idProduct);
    res.send(product);
})

router.post('/', async (req,res)=> {
    const product = req.body
    await productManager.addProduct(product)
    res.send({status: 'true', message: 'Product created'});
})

router.put('/:pid',async (req, res) => {
    const productId = Number(req.params.pid);
    const keyAndValue = req.body
    //desde postman envio el objeto:
    //{ key: 'nombre del parametro a modificar', value: 'nuevo valor que se le da al parametro'}
    await productManager.updateProduct(productId, keyAndValue.key, keyAndValue.value )
    res.send({status: 'sucess', message: 'Product updated'});
})

router.delete('/:pid', async (req,res)=> {
    const productId = Number(req.params.pid);
    await productManager.deleteProduct(productId)
    res.send({status: 'sucess', message: 'Product deleted'});
})

export default router;