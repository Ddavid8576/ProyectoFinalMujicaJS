// Array de productos
const productos = [
    {
        id: 1,
        nombre: 'Kit de embrague (clutch kit)',
        precio: 85000,
        imagen: './img/embrague.webp'
    },
    {
        id: 2,
        nombre: 'Motor de arranque',
        precio: 65990,
        imagen: './img/arranque.webp'
    },
    {
        id: 3,
        nombre: 'Kit Empaques Motor 1600',
        precio: 12590,
        imagen: './img/empaque.webp'
    },
    {
        id: 4,
        nombre: 'Faro Volkswagen Sedan',
        precio: 33590,
        imagen: './img/faros.webp'
    }
];

// Funcion para generar productos
function generarTarjetasProductos() {
    const productList = document.getElementById('product-list');
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'col-12 col-md-6 col-lg-3';
        productCard.innerHTML = `
            <div class="card h-100" data-aos="zoom-in" data-aos-duration="700">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio.toFixed(2)}</p>
                    <button type="button" class="btn btn-outline-dark btn-lg" onclick="agregarAlCarrito(${producto.id})">Comprar</button>
                </div>
            </div>
        `;
        
        productList.appendChild(productCard);
    });
}


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


    Toastify({
        text: `${producto.nombre} agregado al carrito`,
        duration: 1500,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true
    }).showToast();
}

function cargarNoticias() {
    const url = `https://newsapi.org/v2/everything?q=automotive&language=es&apiKey=8d45bd1c6bb24b97afe4023cf7717e6d`;

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarNoticias(data.articles))
        .catch(error => console.error('Error al cargar las noticias:', error));
}

function mostrarNoticias(noticias) {
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = '';

    noticias.forEach(noticia => {
        const newsElement = document.createElement('div');
        newsElement.className = 'col-12 col-md-6 col-lg-3';
        newsElement.innerHTML = `
            <div class="card h-100">
                <img src="${noticia.urlToImage}" class="card-img-top" alt="${noticia.title}">
                <div class="card-body">
                    <h5 class="card-title">${noticia.title}</h5>
                    <p class="card-text">${noticia.description}</p>
                    <a href="${noticia.url}" target="_blank" class="btn btn-outline-dark btn-lg">
                        Leer más
                    </a>
                </div>
            </div>
        `;
        newsList.appendChild(newsElement);
    });
}

generarTarjetasProductos();
