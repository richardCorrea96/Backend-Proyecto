const fs = require('fs');


class Contenedor {

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async save(producto){
        try{
            //
            const productos = await this.getAll();
            if(productos.length>0){
                //
                const nuevaId = productos[productos.length-1].id + 1;
                producto.id = nuevaId;
                console.log(producto.id);
                productos.push(producto);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos, null, 2));
            }else{
                producto.id =  1;
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify([producto], null, 2));
            }
        } catch(error){
            console.log(error);
        }
    }
    async getById(id){
        try{
        const productos = await this.getAll();
        let item = productos.find( producto => producto.id === id );
        return item;
        } catch (error){
            console.log(error);
        }
    }
    async getAll(){
        try{
            const todosLosProductos = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            if(todosLosProductos.length > 0){
                let array = JSON.parse(todosLosProductos);
                return array;
            }else{
                return [];
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async deleteById(id){
        try{
            const productos = await this.getAll();
            const newproductos = productos.filter(producto => producto.id !== id);
            console.log('Producto borrado');
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(newproductos, null, 2));
            } catch (error){
                return console.log(error);
            }
    }
    async deleteAll(){
        try{
            let todosLosProductos = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            todosLosProductos = [];
            console.log("Todos los productos han sido borrados");
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(todosLosProductos, null, 2))
        }
        catch(error){
            console.log(error);
        }
    }

    async getRandom(){
        try{
            const productos = await this.getAll();
            let random = productos[Math.floor(Math.random() * productos.length)];
            return (random)
        }
        catch(error){
            console.log(error);
        }
    }

}

module.exports = Contenedor;