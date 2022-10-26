const Contenedor = require('./Contenedor');
let cont = new Contenedor('./productos.txt');

const express = require('express');

const app = express();

const PORT = 8080;

const server = app.listen(PORT, ()=>{
console.log(`Server listening on port: ${PORT}`)
})
server.on('error', (err) => console.log(`Error: ${err}`))

app.get('/', async (req, res) => {
    res.send('<h1>Entregable clase 6</h1>')
})

app.get('/productos', async (req, res) => {
    res.send(await cont.getAll())
})
app.get('/productoRandom', async (req, res) => {
    res.send(await cont.getRandom()) 
})
