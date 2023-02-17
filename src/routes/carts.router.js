import { Router } from 'express';
import CartManager from '../ManagerCarts.js';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const cartManager = new CartManager(path.join(dirname, 'carts.json'));

router.post('/', async (req, res) => {
const newCart = await cartManager.createCart()
res.send(newCart)
})

router.get('/:cid', async (req, res) => {
    const idCart = Number(req.params.cid);
    const productsInCart= await cartManager.getProducts(idCart)
    res.send(productsInCart)    
})

router.post('/:cid/product/:pid', async (req, res) => {
    const idCart = Number(req.params.cid);
    const idProduct = Number(req.params.pid);
    const addedProduct = await cartManager.addProductsToCart(idProduct,idCart)
    res.send(addedProduct)
})

router.get('/', async (req, res) => {
    
})


export default router;