import express from 'express';
import handlebars from 'express-handlebars';
import ProductManager from './managers/ManagerProductos.js';
import path from 'path';
import { fileURLToPath } from 'url';
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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

const server = app.listen(8080, () => console.log('Listening'));

const io = new Server(server);

io.on('connection',async (socket) => {
    console.log('Connected');
    try {
        const products = await productManager.getProducts();
        // Envía los productos al cliente al conectarse
        socket.emit('arregloDeObjetos', products);
    } catch (error) {
        console.error(`Error al obtener los productos: ${error}`);
    }

    // Maneja el evento para recibir cambios en los productos
    socket.on('actualizarProductos', async () => {
        try {
            const newProducts = await productManager.getProducts();
            io.emit('arregloDeObjetos', newProducts);
        } catch (error) {
            console.error(`Error al obtener los productos: ${error}`);
        }
    });
});
