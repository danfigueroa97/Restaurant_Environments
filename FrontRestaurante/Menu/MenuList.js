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
    let menuDiv = document.querySelector('#menu');  // Seleccionamos el contenedor del menú
    menuDiv.innerHTML = "";  // Limpiar antes de cargar los datos

    // Cuando la solicitud esté completa
    request.onload = function () {
        let data = request.response;  // Obtener los datos de respuesta
        console.log(data);

        if (data && data.length > 0) {
            // Crear un objeto para agrupar los platos por categoría
            let categorias = {};

            data.forEach((plato) => {
                let nombreCategoria = plato.idCategoria.nombre; // Accedemos al nombre de la categoría
                
                // Si no existe aún esta categoría en el objeto, la creamos
                if (!categorias[nombreCategoria]) {
                    categorias[nombreCategoria] = [];
                }

                // Añadimos el plato a la lista de la categoría correspondiente
                categorias[nombreCategoria].push(plato);
            });

            // Ahora iteramos sobre cada categoría y sus platos
            for (let categoria in categorias) {
                // Crear un elemento h1 para el nombre de la categoría
                let categoriaTitulo = document.createElement('h1');
                categoriaTitulo.textContent = categoria;  // El nombre de la categoría
                menuDiv.appendChild(categoriaTitulo);  // Añadir el título al DOM

                // Crear una lista ul para los platos de esta categoría
                let categoriaLista = document.createElement('ul');
                categoriaLista.className = 'menu-list';

                // Iterar sobre los platos de esta categoría y crear los elementos li
                categorias[categoria].forEach((plato) => {
                    let listItem = document.createElement('li');
                    listItem.className = 'menu-item';
                    
                    // Definir el contenido HTML de cada plato
                    listItem.innerHTML = `
                        <img src="${plato.imagen}" alt="${plato.nombre}">
                        <div class="menu-text">
                            <h3>${plato.nombre}</h3>
                            <p class="description">${plato.descripcion}</p>
                            <p class="price">${plato.precio} €</p>
                        </div>
                    `;
                    categoriaLista.appendChild(listItem);  // Añadir cada plato a la lista
                });

                // Añadir la lista de platos debajo del título de la categoría
                menuDiv.appendChild(categoriaLista);
            }

        } else {
            menuDiv.innerHTML = "<p>No hay platos disponibles.</p>";
        }
    };

    // Manejo de errores en la solicitud
    request.onerror = function () {
        menuDiv.innerHTML = "<p>Error al recuperar los datos.</p>";
    };
}

// Ejecutar la función para obtener los platos cuando cargue la página
document.addEventListener('DOMContentLoaded', obtenerPlatos);
