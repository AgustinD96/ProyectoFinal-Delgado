document.addEventListener('DOMContentLoaded', function () {
    let carrito = [];
    const cantidadCarrito = document.getElementById('cantidad-carrito');
    const carritoProductos = document.getElementById('carrito-contenedor');
    const totalCompra = document.getElementById('total-compra');
    const botonCarrito = document.getElementById('boton-carrito');
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
  
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
  
        // Guardar el carrito actualizado en el archivo JSON local
        guardarCarritoEnJSON();
  
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
      guardarCarritoEnJSON();
    }
  
    function guardarCarritoEnJSON() {
      console.log('Guardando carrito en JSON');
    }
  
    
  
    
    botonCarrito.addEventListener('click', () => {
     
      document.getElementById('total-compra-footer').scrollIntoView({ behavior: 'smooth' });
    });
  
   
    const tipoPago = document.getElementById('tipo-pago');
    const detallePagoTarjeta = document.getElementById('detalle-pago-tarjeta');
    const tipoTarjeta = document.getElementById('tipo-tarjeta');
    const cuotas = document.getElementById('cuotas');
    const botonPagar = document.getElementById('boton-pagar');
    
    // evento para las opciones de tarjeta según el tipo de pago seleccionado
    tipoPago.addEventListener('change', function () {
      if (tipoPago.value === 'tarjeta') {
        detallePagoTarjeta.style.display = 'block';
      } else {
        detallePagoTarjeta.style.display = 'none';
      }
    });
  
    botonPagar.addEventListener('click', function () {
        const tipoPagoSeleccionado = tipoPago.value;
        if (tipoPagoSeleccionado === 'tarjeta') {
          const tipoTarjetaSeleccionado = tipoTarjeta.value;
          const numeroCuotas = parseInt(cuotas.value);
          const totalCompra = calcularTotalCompra();
    
          if (numeroCuotas >= 1 && numeroCuotas <= 6) {
            const montoCuota = totalCompra / numeroCuotas;
            
            //SweetAlert2 para mostrar el mensaje de alerta
            Swal.fire({
              icon: 'success',
              title: 'Resumen de Pago',
              html: `Pago con tarjeta ${tipoTarjetaSeleccionado} en ${numeroCuotas} cuotas de $${montoCuota.toFixed(2)} cada una.<br>Total de la compra: $${totalCompra.toFixed(2)}`,
            });
          } else {
            // Si no se selecciona un número válido de cuotas
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Por favor, seleccione un número válido de cuotas (1-6).',
            });
          }
        } else if (tipoPagoSeleccionado === 'transferencia') {
          //mensaje de éxito para el pago por transferencia
          Swal.fire({
            icon: 'success',
            title: 'Pago por Transferencia',
            text: 'El pago por transferencia se ha realizado con éxito.',
          });
        } else {
          // Tipo de pago no válido
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, seleccione un tipo de pago válido.',
          });
        }
    });
    
      
  
    // Función para calcular el total de la compra
    function calcularTotalCompra() {
      let total = 0;
      for (const producto of carrito) {
        total += producto.precio;
      }
      return total;
    }
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

  


  

  











