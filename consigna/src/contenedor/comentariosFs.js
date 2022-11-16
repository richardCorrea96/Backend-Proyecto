const fs = require('fs');

class Comentarios {
    constructor(nombre){
        this.nombre = nombre;
    }
    async save(objeto){
        const archivo = await fs.promises.readFile(this.nombre, 'utf-8');
        const archivoParseado = JSON.parse(archivo);
        archivoParseado.push(objeto)
        await fs.promises.writeFile(this.nombre, JSON.stringify(archivoParseado, null, 2))
        return archivo
        
    }
    async getAll(){
        const archivo = await fs.promises.readFile(this.nombre, 'utf-8')
        const archivoParseado = JSON.parse(archivo)
        return archivoParseado
    }
}
module.exports = Comentarios;