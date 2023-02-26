import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './util.js';
import { Server } from 'socket.io';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

//crea-inicializa el servidor
const app = express();

app.engine('handlebars', handlebars.engine())
app.set('views',`${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(express.static(`${__dirname}`));
app.use('/realtimeproducts', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


const server = app.listen(8080, () => console.log('Listening'));

const io = new Server(server);

io.on('connection', socket => {
    console.log('Connected');
})