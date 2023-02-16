

            // basandome en ManagerProducts.JSON
            // leer el siguiente codigo modificarlo 
            // y revisar que cumple con todo lo que quiero hacer
            // ver si faltan metodos

            //RECORDAR......... que hay dos path,
            // uno para carts.json, otro  para productos.json

            const fs = require('fs');

            class CartManager {
              constructor(filename) {
                this.filename = filename;
              }
            
              // Método para crear un nuevo carrito en el archivo carrito.json
              crearCarrito() {
                try {
                  // Primero leemos el archivo carrito.json para obtener su contenido actual
                  const carritoString = fs.readFileSync(this.filename, 'utf8');
                  const carrito = JSON.parse(carritoString);
            
                  // Encontramos el último id utilizado y lo incrementamos en 1 para crear un nuevo id
                  const lastId = carrito[carrito.length - 1]?.id ?? 0;
                  const newId = lastId + 1;
            
                  // Creamos un nuevo objeto de carrito con el nuevo id y un arreglo vacío de productos
                  const newCarrito = {
                    id: newId,
                    products: []
                  };
            
                  // Agregamos el nuevo carrito al arreglo de carritos en el archivo carrito.json
                  carrito.push(newCarrito);
                  fs.writeFileSync(this.filename, JSON.stringify(carrito));
            
                  // Devolvemos el nuevo carrito creado
                  return newCarrito;
                } catch (err) {
                  console.error(`Error al crear carrito: ${err.message}`);
                }
              }
            
              // Método para agregar productos a un carrito existente
              addProductsToCart(productId) {
                try {
                  // Primero leemos el archivo carrito.json para obtener su contenido actual
                  const carritoString = fs.readFileSync(this.filename, 'utf8');
                  const carrito = JSON.parse(carritoString);
            
                  // Encontramos el último carrito creado
                  const lastCarrito = carrito[carrito.length - 1];
            
                  // Leemos el archivo productos.json para obtener su contenido actual
                  const productosString = fs.readFileSync('productos.json', 'utf8');
                  const productos = JSON.parse(productosString);
            
                  // Encontramos el producto con el id especificado
                  const product = productos.find(p => p.id === productId);
                  if (!product) {
                    throw new Error(`No se encontró un producto con el id ${productId}`);
                  }
            
                  // Buscamos el producto en el arreglo de productos del carrito
                  const productIndex = lastCarrito.products.findIndex(p => p.id === productId);
            
                  if (productIndex === -1) {
                    // Si el producto no existe en el carrito, lo agregamos con una cantidad de 1
                    lastCarrito.products.push({
                      id: productId,
                      name: product.name,
                      price: product.price,
                      quantity: 1
                    });
                  } else {
                    // Si el producto ya existe en el carrito, simplemente incrementamos su cantidad
                    lastCarrito.products[productIndex].quantity++;
                  }
            
                  // Escribimos los cambios al archivo carrito.json
                  fs.writeFileSync(this.filename, JSON.stringify(carrito));
            
                  // Devolvemos el objeto de producto modificado
                  return lastCarrito.products[productIndex];
                } catch (err) {
                  console.error(`Error al agregar productos al carrito: ${err.message}`);
                }
              }
            }
            