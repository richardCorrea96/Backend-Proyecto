const fs = require('fs');

class Contenedor{
    constructor(archivo, id){
        this.archivo = `./${archivo}.txt`
        this.id =  1
    }

        async save(objeto){
        try{
            if(!fs.existsSync(this.archivo)){
                await fs.promises.writeFile(this.archivo, JSON.stringify([
                    {
                        id: this.id,
                        ...objeto
                    }
                ]))
                return `Has agregado ${objeto.title} con el id ${this.id}`
            }else{
                const archivo = await fs.promises.readFile(this.archivo,'utf-8')
                const json = JSON.parse(archivo)
                if(json.length > 0){
                    json.push({
                        id: json.length + 1,
                        ...objeto
                    })
                    await fs.promises.writeFile(this.archivo, JSON.stringify(json))
                    return {msj: `Has agregado ${objeto.title} con el id ${json.length}`}
                }
            }
        }    catch(e){
            console.log(`Ha habido un error al leer el archivo ${this.archivo}`)
        }
        }

        async getById(id){
        try{
            const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
            const json = JSON.parse(archivo)
            if (json.length > 0){
                const obj = json.find(obj => obj.id === id)
                if (obj){
                    return objeto
                }else{
                    return {error: "producto no encontrado"}
                }
                }
            }catch(error){
                console.log(error)
            }
        }

        async getAll(){
            try{
                const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
                const json = JSON.parse(archivo)
                if (json.length > 0){
                    return json
                }
                console.log("Archivo vacio")
            }catch (error){
                console.log(error)
            }
        }

        async deletById(id){
            try{
                const archivo = await fs.promises.readFile(this.archivo, 'utf-8')
                const json = JSON.parse(archivo)
                if(json.length > 0){
                    const index = json.findIndex(obj => obj.id === id)
                    if (index === -1){
                        console.log(`El objeto no existe`)
                    }else{
                        json.splice(index, 1)
                        await fs.promises.writeFile(this.archivo, JSON.stringify(json))
                    }
                }
            }catch(error){
                console.log(error)
        }
        }

        async deleteAll(){
        try{
            await fs.promises.writeFile(this.archivo, "[]")
        }catch(error){
            console.log(error)
        }
        }
}

    const archivo = new Contenedor("productos")

    const express = require('express')
    const {Router} = express

    const app = express()
    const router = Router()
    
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use('/api/productos', router)
    app.use(express.static(__dirname + '/puclic'))

    const PORT = 8080

    router.get('/',(req, res)=>{ 
        archivo.getAll().then(response =>{
            res.json({response})
        })
    })

    router.post('/',(req, res)=>{
        const producto = req.body
        archivo.save(producto)
        res.send({msj: `Agregaste el producto ${producto.title}`})
    })

    router.delete('/:id',(req, res)=>{
        const id = parseInt(req.params.id)
        archivo.deleteById(id)
        res.send({msj: `Eliminaste el producto con el id ${id}`})
    })

    router.get('/:id',(req, res)=>{
        const id = parseInt(req.params.id)
        archivo.getById(id).then(response => {
            res.send(response)
        })
    })

    router.put('/:id', async (req, res)=>{
        const id = parseInt(req.params.id)
        const producto = await archivo.getById(id)
        const productoNuevo = {
            id: id,
            title: req.body.title,
            price: req.body.params,
            thumbnail: req.body.thumbnail
        }
        await archivo.deleteById(id)
        await archivo.save(productoNuevo)
        
        res.send({msj: `Actualizaste el producto ${producto.title}`})
    })

    const server = app.listen(PORT, ()=>{
        console.log(`Servidor abierto en el puerto ${server.address().port}`)
    })
    server.on("error", error => console.log(error))