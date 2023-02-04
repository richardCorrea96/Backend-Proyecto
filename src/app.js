import express from 'express';
import ProductManager from './ManagerProductos.js';
import path from 'path';
import { fileURLToPath } from 'url';

//crea-inicializa el servidor
const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

app.use(express.urlencoded({extended: true}));


//Ruta /products tipo get app.get llamar al método getAll de la clase ProductManager para esto hay que instanciar la clase
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    let limit = Number(req.query.limit);
    if (!limit) {
        res.send(products);
    } else {
        res.send(products.slice(0, limit));
    }
})

//Ruta /products/:pid tipo app.get donde debemos llamar al metodo getById de la clae ProductManager usar la instancia de la clase ya creada

//Filtra por id y devuelve el objeto del producto
app.get('/products/:pid', async (req,res)=> {
    const idProduct = Number(req.params.pid);
    const product = await productManager.getProductById(idProduct);
    res.send(product);
})
app.listen(8080,()=>console.log("Listening on 8080"))