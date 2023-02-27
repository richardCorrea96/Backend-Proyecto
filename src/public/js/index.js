const socket = io()
const insertDOMcontent = document.querySelector('#insertDOMcontent')

  const listarProductos = (products) => {
    insertDOMcontent.innerHTML = '';
    if (products !== undefined) {
      products.forEach(element => {
        const { id, title, description} = element;
        insertDOMcontent.innerHTML += `<div class="producto">
          <div class="productoTitulo">${title}</div>
          <div class="productoDescripcion">${description}</div>
          <div class="botonEliminar">
            <button class="btnEliminar" id="${id}">Eliminar</button>
          </div>
        </div>`;
      });
    }
  };

  socket.on('arregloDeObjetos', data => {
    listarProductos(data);
  });

  