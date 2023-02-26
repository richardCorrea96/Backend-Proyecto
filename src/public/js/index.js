const socket = io()

socket.emit('arregloDeObjetos', (products) => {
    const productList = document.querySelector('#productList');
    productList.innerHTML = ''; // Limpia la lista de productos
    products.forEach((product) => {
      const li = document.createElement('li');
      li.textContent = product.title;
      productList.appendChild(li); // Agrega un nuevo elemento a la lista por cada producto
    });
  });