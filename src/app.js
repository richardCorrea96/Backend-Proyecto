import express from 'express';
import __dirname from './util.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';


//crea-inicializa el servidor
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}`));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);



app.listen(8080,()=>console.log("Listening on 8080"))