import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


//crea-inicializa el servidor
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// app.use('/static', express.static(`${__dirname}/public`));


//Cuando agrego un producto,
//sí desde POSTMAN no envio el parametro thumbnails
//por default: product.thumbnails = []

//Sí desde POSTMAN le envio un thumbnail
//quedaria: product.thumbnails = [thumbnail]

//si desde POSTMAN envio un arreglo con varios thumbnails:
//quedaria: product.thumbnails = [...thumbnails]

app.listen(8080,()=>console.log("Listening on 8080"))