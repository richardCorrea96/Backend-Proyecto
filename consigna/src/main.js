//Servidor************
const express = require('express');
const moment = require('moment')
const aplicacion = express();
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require('./contenedor/contenedorFs');
/////////////////////////////
const Comentarios = require('./contenedor/comentariosFs')

const port = 8080;
const publicRoot = './public';

//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

const httpServer = new HttpServer(aplicacion);
const io = new IOServer(httpServer);

//***** Hacemos la carpeta public visible
aplicacion.use(express.static(publicRoot));
//****************


/////////////////////////////////////////////////////////////////////////////
const messages = new Contenedor('./src/db/comentarios.txt');

const productos = new Comentarios('./src/db/productos.txt');

//Endpoints***

aplicacion.get('/', (peticion, respuesta) => {
  respuesta.send('index.html', { root: publicRoot });
});

//***********


//Servidor************
const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));
//****************


//Sockets************
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');

  const listaProductos = await productos.getAll();
  socket.emit('nueva-conexion', listaProductos);
  /////////////////////////////////////////////////////////
  
  socket.on("new-product", (data) => {
    productos.save(data);
    io.sockets.emit('producto', data);
  });
  
   const listaComentarios = await messages.getAll();
   socket.emit('messages', listaComentarios);
//////////////////////////////////////////////////////////////////
  socket.on('new-message', async data => {
    data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss')
    await messages.save(data);
    const listaComentarios = await messages.getAll();
    io.sockets.emit('messages', listaComentarios);
  });


});
//****************