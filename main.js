/////server////
const express = require('express')
const {Router} = express
const aplicacion = express()
const port = 8080

const rutaProductos = Router()

//carpeta public visible:
aplicacion.use('/static', express.static(__dirname + '/public'))

////////

class Contenedor {
    constructor(productos){
        this.productos = productos
    }
    
    save (objeto){
        let id = 1
        this.productos.forEach((element, index)=>{
            if (element.id >= id){
                id = element.id + 1
        }
        })
        objeto.id = id
        this.productos.push(objeto)
        return id
    }
    getById(id){
        let objetoSeleccionado = null
        this.productos.forEach(element =>{
            if (element.id == id){
                objetoSeleccionado = element
            }
        })
        return objetoSeleccionado
    }
    getAll(){
        return this.productos
    }
    deleteById(id){
        let indexSeleccionado = -1
        this.productos.forEach((element, index)=>{
            if (element.id == id){
                indexSeleccionado = index
            }
        })
        if (indexSeleccionado != -1){
            this.productos.splice(indexSeleccionado, 1)
        }
    }
    deleteAll(){
        this.productos = []
    }
}


const productos = new Contenedor([])

///datos de prueba

productos.save({
    title: 'Escuadra',
    price: 123,
    thumbnail: 'https://w7.pngwing.com/pngs/918/129/png-transparent-set-square-thumbnail.png'
})
productos.save({
    title: 'Regla',
    price: 456,
    thumbnail: 'https://w7.pngwing.com/pngs/918/129/png-transparent-set-square-thumbnail.png'
})


//////Endpoints/////

rutaProductos.get('/:id',  (peticion, respuesta)=>{
    const id = parseInt(peticion.params.id)
    const producto = productos.getById(id)
    if (producto){
        respuesta.json(producto)
    }else{
        respuesta.status(404)
        respuesta.json({
            Error: 'Producto no encontrado'
        })
    }
})
rutaProductos.get('/',  (peticion, respuesta)=>{
    const listaProductos = productos.getAll()
    respuesta.json(listaProductos)
})
rutaProductos.post('/',  (peticion, respuesta)=>{
    let producto = peticion.body
    console.log(producto)
    productos.save(producto)
})

rutaProductos.put('/:id',  (peticion, respuesta)=>{

})

rutaProductos.delete('/:id',  (peticion, respuesta)=>{
    const id = parseInt(peticion.params.id)
    productos.deleteById(id)
    respuesta.json({
        Accion: 'El producto fue eliminado'
    })
})


aplicacion.use('/api/productos', rutaProductos)

////servidor escucha/////

const servidor = aplicacion.listen(port, ()=>{
    console.log(`servidor escuchando: ${servidor.address().port}`)
})
servidor.on('error',error => console.log(`Error: ${error}`))

////////////////////////
