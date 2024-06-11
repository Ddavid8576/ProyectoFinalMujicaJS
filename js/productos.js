
// Array de productos
const productos = [
    { id: 1, nombre: 'Kit de embrague (clutch kit)', precio: 85000, imagen: './img/embrague.webp' },
    { id: 2, nombre: 'Motor de arranque', precio: 65990, imagen: './img/arranque.webp' },
    { id: 3, nombre: 'Kit Empaques Motor 1600', precio: 12590, imagen: './img/empaque.webp' },
    { id: 4, nombre: 'Faro Volkswagen Sedan', precio: 33590, imagen: './img/faros.webp' }
];

// Funcion para generar las tarjetas de productos
function generarTarjetasProductos() {
    const listaProductos = document.getElementById('product-list');
    if (!listaProductos) {
        console.error('Elemento "product-list" no encontrado');
        return;
    }

    productos.forEach(producto => {
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.className = 'col-12 col-md-6 col-lg-3';
        tarjetaProducto.innerHTML = `
            <div class="card h-100" data-aos="zoom-in" data-aos-duration="700">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio.toFixed(2)}</p>
                    <button type="button" class="btn btn-outline-dark btn-lg" onclick="agregarAlCarrito(${producto.id})">Comprar</button>
                </div>
            </div>
        `;
        listaProductos.appendChild(tarjetaProducto);
    });
}

// Funcion para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('cart')) || [];
    const producto = productos.find(p => p.id === idProducto);
    const productoEnCarrito = carrito.find(p => p.id === idProducto);
    
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem('cart', JSON.stringify(carrito));

    // Notificacion con Toastify
    Toastify({
        text: `${producto.nombre} agregado al carrito`,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true
    }).showToast();
}

function cargarNoticias() {
    fetch('noticias.json')
        .then(response => response.json())
        .then(data => {
            if (!data.articles) {
                throw new Error('No se encontraron artículos en la API');
            }
            mostrarNoticias(data.articles);
        })
        .catch(error => console.error('Error al cargar las noticias:', error));
}

function mostrarNoticias(noticias) {
    const listaNoticias = document.getElementById('news-list');
    if (!listaNoticias) {
        console.error('Elemento "news-list" no encontrado');
        return;
    }
    listaNoticias.innerHTML = '';

    noticias.forEach(noticia => {
        const elementoNoticia = document.createElement('div');
        elementoNoticia.className = 'col-12 col-md-6 col-lg-3';
        elementoNoticia.innerHTML = `
            <div class="card h-100">
                <img src="${noticia.urlToImage}" class="card-img-top" alt="${noticia.title}">
                <div class="card-body">
                    <h5 class="card-title">${noticia.title}</h5>
                    <p class="card-text">${noticia.description}</p>
                    <a href="${noticia.url}" target="_blank" class="btn btn-outline-dark btn-lg">Leer más</a>
                </div>
            </div>
        `;
        listaNoticias.appendChild(elementoNoticia);
    });
}

// Funcion iniciar productos y noticias
document.addEventListener('DOMContentLoaded', () => {
    generarTarjetasProductos();
    cargarNoticias();
});
