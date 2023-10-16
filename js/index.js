document.addEventListener('DOMContentLoaded', function () {
  let carrito = [];
  const cantidadCarrito = document.getElementById('cantidad-carrito');
  const carritoProductos = document.getElementById('carrito-contenedor');
  const totalCompra = document.getElementById('total-compra');
  const botonCarrito = document.getElementById('boton-carrito');
  const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

  // Intenta recuperar el carrito desde el Local Storage al cargar la página
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarritoVisual();
  }

  botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
      const nombreProducto = boton.getAttribute('data-nombre');
      const precioProducto = parseFloat(boton.getAttribute('data-precio'));

      const producto = {
        nombre: nombreProducto,
        precio: precioProducto,
      };

      carrito.push(producto);
      actualizarCarritoVisual();

      // Guardar el carrito actualizado en el Local Storage
      localStorage.setItem('carrito', JSON.stringify(carrito));

      // Mostrar una alerta con SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado',
        text: `Se ha agregado "${nombreProducto}" al carrito.`,
      });
    });
  });

  function actualizarCarritoVisual() {
    if (cantidadCarrito && totalCompra) {
      cantidadCarrito.textContent = carrito.length; // Muestra la cantidad de productos en el carrito

      const detalleCarritoBody = document.getElementById('detalle-carrito-body');
      detalleCarritoBody.innerHTML = '';

      // Recorre los productos en el carrito y muestra los detalles en la tabla
      for (let i = 0; i < carrito.length; i++) {
        const producto = carrito[i];
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${producto.nombre}</td>
          <td>$${producto.precio.toFixed(2)}</td>
          <td>1</td>
          <td><button class="btn btn-danger btn-eliminar" data-indice="${i}">Eliminar</button></td>
        `;
        detalleCarritoBody.appendChild(fila);
      }

      // Agrega un evento de clic a los botones de eliminar
      const botonesEliminar = document.querySelectorAll('.btn-eliminar');
      botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', () => {
          const indice = boton.getAttribute('data-indice');
          eliminarProductoDelCarrito(indice);
          // Mostrar una alerta al eliminar
          Swal.fire({
            icon: 'info',
            title: 'Producto Eliminado',
            text: `Se ha eliminado un producto del carrito.`,
          });
        });
      });

      // Calcular y mostrar el total de la compra
      let total = 0;
      for (const producto of carrito) {
        total += producto.precio;
      }
      document.getElementById('total-compra-footer').textContent = `Total: $${total.toFixed(2)}`;
    }
  }

  function eliminarProductoDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarritoVisual();
    
    // Guardar el carrito actualizado en el Local Storage
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Resto del código...

  botonCarrito.addEventListener('click', () => {
    document.getElementById('total-compra-footer').scrollIntoView({ behavior: 'smooth' });
  });

  // Resto del código...
});

document.addEventListener('DOMContentLoaded', function () {
  const contenedorProductos = document.getElementById('productos');

  fetch('data/productos.json')
    .then((response) => response.json())
    .then((data) => {
      data.productos.forEach((producto) => {
        const productoElement = document.createElement('div');
        productoElement.innerHTML = `
          <h2>${producto.nombre}</h2>
          <p>Precio: $${producto.precio.toFixed(2)}</p>
          <p>Descripción: ${producto.descripcion}</p>
        `;

        contenedorProductos.appendChild(productoElement);
      });
    })
    .catch((error) => console.error(error));
});


  


  

  











