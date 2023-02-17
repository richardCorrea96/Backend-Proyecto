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


app.listen(8080,()=>console.log("Listening on 8080"))