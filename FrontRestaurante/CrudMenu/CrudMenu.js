const url = "http://localhost:8080/";

function sendRequest(endPoint, method, data) {
    let request = new XMLHttpRequest();
    request.open(method, url + endPoint);
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data ? JSON.stringify(data) : null);
    return request;
}

function obtenerPlatos() {
    let request = sendRequest('api/platos/list', 'GET', '');
    let menuDiv = document.querySelector('#menu');
    menuDiv.innerHTML = "";

    request.onload = function () {
        let data = request.response;
        if (data && data.length > 0) {
            let categorias = {};

            data.forEach((plato) => {
                let nombreCategoria = plato.idCategoria.nombre;
                if (!categorias[nombreCategoria]) {
                    categorias[nombreCategoria] = [];
                }
                categorias[nombreCategoria].push(plato);
            });

            for (let categoria in categorias) {
                let categoriaTitulo = document.createElement('h1');
                categoriaTitulo.textContent = categoria;
                menuDiv.appendChild(categoriaTitulo);

                let categoriaLista = document.createElement('ul');
                categoriaLista.className = 'menu-list';

                categorias[categoria].forEach((plato) => {
                    let listItem = document.createElement('li');
                    listItem.className = 'menu-item';

                    listItem.innerHTML = `
                        <img src="${plato.imagen}" alt="${plato.nombre}">
                        <div class="menu-text">
                            <h3>${plato.nombre}</h3>
                            <p class="description">${plato.descripcion}</p>
                            <p class="price">${plato.precio} €</p>
                        </div>
                        <button class="update-btn" data-id="${plato.idPlato}">Actualizar</button>
                        <button class="delete-btn" data-id="${plato.idPlato}">Eliminar</button>
                    `;
                    categoriaLista.appendChild(listItem);
                });

                menuDiv.appendChild(categoriaLista);
            }

            // Asignar funcionalidad a los botones de eliminar
            let deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function () {
                    let idPlato = this.getAttribute('data-id');
                    eliminarPlato(idPlato);
                });
            });

            // Asignar funcionalidad a los botones de actualizar
            let updateButtons = document.querySelectorAll('.update-btn');
            updateButtons.forEach(button => {
                button.addEventListener('click', function () {
                    let idPlato = this.getAttribute('data-id');
                    cargarPlatoParaActualizar(idPlato);
                });
            });
        } else {
            menuDiv.innerHTML = "<p>No hay platos disponibles.</p>";
        }
    };

    request.onerror = function () {
        menuDiv.innerHTML = "<p>Error al recuperar los datos.</p>";
    };
}

function crearPlato(nombre, descripcion, precio, imagen, idCategoria) {
    let plato = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen,
        idCategoria: {
            idCategoria: idCategoria
        }
    };

    let request = sendRequest('api/platos/create', 'POST', plato);

    request.onload = function () {
        if (request.status === 200) {
            console.log('Plato creado exitosamente');
            obtenerPlatos(); // Actualizar la lista de platos
        } else {
            console.log('Error al crear el plato');
        }
    };

    request.onerror = function () {
        console.log('Error en la solicitud');
    };
}

function eliminarPlato(idPlato) {
    let request = sendRequest(`api/platos/delete/${idPlato}`, 'DELETE');

    request.onload = function () {
        if (request.status === 200) {
            console.log('Plato eliminado exitosamente');
            obtenerPlatos(); // Actualizar la lista de platos
        } else {
            console.log('Error al eliminar el plato');
        }
    };

    request.onerror = function () {
        console.log('Error en la solicitud');
    };
}

function cargarPlatoParaActualizar(idPlato) {
    let request = sendRequest(`api/platos/list/${idPlato}`, 'GET');

    request.onload = function () {
        if (request.status === 200) {
            let plato = request.response;
            document.getElementById('updateIdPlato').value = plato.idPlato;
            document.getElementById('updateNombre').value = plato.nombre;
            document.getElementById('updateDescripcion').value = plato.descripcion;
            document.getElementById('updatePrecio').value = plato.precio;
            document.getElementById('updateImagen').value = plato.imagen;
            document.getElementById('updateIdCategoria').value = plato.idCategoria.idCategoria;
            document.getElementById('updateSection').style.display = 'block';
        } else {
            console.log('Error al cargar el plato para actualizar');
        }
    };

    request.onerror = function () {
        console.log('Error en la solicitud');
    };
}

function actualizarPlato(nombre, descripcion, precio, imagen, idCategoria, idPlato) {
    let platoActualizado = {
        idPlato: idPlato,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        imagen: imagen,
        idCategoria: {
            idCategoria: idCategoria
        }
    };

    let request = sendRequest('api/platos/update', 'PUT', platoActualizado);

    request.onload = function () {
        if (request.status === 200) {
            console.log('Plato actualizado exitosamente');
            obtenerPlatos(); // Actualizar la lista de platos
            document.getElementById('updateSection').style.display = 'none'; // Ocultar el formulario de actualización
        } else {
            console.log('Error al actualizar el plato');
        }
    };

    request.onerror = function () {
        console.log('Error en la solicitud');
    };
}

// Inicializar variables para el botón y el formulario
const createSection = document.querySelector('.create-section');
const toggleCreateFormBtn = document.getElementById('toggleCreateFormBtn');

// Ocultar el formulario de creación inicialmente
createSection.style.display = 'none';

// Manejar el clic en el botón "Crear Nuevo Plato"
toggleCreateFormBtn.addEventListener('click', function () {
    if (createSection.style.display === 'none') {
        createSection.style.display = 'block'; // Mostrar el formulario
        toggleCreateFormBtn.textContent = 'Cancelar'; // Cambiar el texto del botón
    } else {
        createSection.style.display = 'none'; // Ocultar el formulario
        toggleCreateFormBtn.textContent = 'Crear Nuevo Plato'; // Restaurar texto original
    }
});

// Manejo del formulario para crear un nuevo plato
document.getElementById('platoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = document.getElementById('precio').value;
    let imagen = document.getElementById('imagen').value;
    let idCategoria = document.getElementById('idCategoria').value;

    crearPlato(nombre, descripcion, precio, imagen, idCategoria);

    this.reset(); // Limpiar el formulario
    createSection.style.display = 'none'; // Ocultar el formulario
    toggleCreateFormBtn.textContent = 'Crear Nuevo Plato'; // Cambiar el texto del botón
});

// Manejo del formulario para actualizar un plato
document.getElementById('updatePlatoForm').addEventListener('submit', function (e) {
    e.preventDefault();
    let idPlato = document.getElementById('updateIdPlato').value;
    let nombre = document.getElementById('updateNombre').value;
    let descripcion = document.getElementById('updateDescripcion').value;
    let precio = document.getElementById('updatePrecio').value;
    let imagen = document.getElementById('updateImagen').value;
    let idCategoria = document.getElementById('updateIdCategoria').value;

    actualizarPlato(nombre, descripcion, precio, imagen, idCategoria, idPlato);
    this.reset(); // Limpiar el formulario
});

obtenerPlatos(); // Cargar los platos al inicio
