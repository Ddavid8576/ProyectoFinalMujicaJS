// Funcion para renderizar el carrito
function renderizarCarrito() {
    const contenedorCarrito = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    contenedorCarrito.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        cartFooter.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
        return;
    }

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;
        const elementoCarrito = document.createElement('div');
        elementoCarrito.className = 'col-12 col-md-6 col-lg-3';
        elementoCarrito.innerHTML = `
            <div class="card h-100" data-aos="zoom-in" data-aos-duration="700">
                <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">Precio: $${item.precio.toFixed(2)} x ${item.cantidad}</p>
                    <p class="card-text">Total: $${(item.precio * item.cantidad).toFixed(2)}</p>
                    <button class="btn btn-outline-dark btn-lg" onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            </div>
        `;
        contenedorCarrito.appendChild(elementoCarrito);
    });

    cartFooter.innerHTML = `
        <h4>Total: $${total.toFixed(2)}</h4>
        <button class="btn btn-dark btn-lg" onclick="vaciarCarrito()">Vaciar Carrito</button>
    `;
}

// Funcion para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(carrito));
    renderizarCarrito();
    Toastify({
        text: 'Producto eliminado del carrito',
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true
    }).showToast();
}

// Funcion para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('cart');
    renderizarCarrito();
    Toastify({
        text: 'Carrito vaciado',
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true
    }).showToast();
}

// Renderizar el carrito cuando la pagina cargue
window.onload = renderizarCarrito;
