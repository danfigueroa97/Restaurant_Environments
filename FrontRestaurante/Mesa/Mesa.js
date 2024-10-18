const url = "http://localhost:8080/";

function sendRequest(endPoint, method, data) {
    let request = new XMLHttpRequest();
    request.open(method, url + endPoint);
    request.responseType = 'json';  
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data ? JSON.stringify(data) : null);
    return request;
}

function obtenerMesas() {
    let request = sendRequest('api/mesas/list', 'GET', '');
    let mesaDiv = document.querySelector('#mesas');  // Seleccionamos el contenedor de las mesas
    mesaDiv.innerHTML = "";  // Limpiar antes de cargar los datos

    // Cuando la solicitud esté completa
    request.onload = function () {
        let data = request.response;  // Obtener los datos de respuesta
        console.log(data);

        if (data && data.length > 0) {
            data.forEach((mesa) => {
                let mesaDiv = document.createElement('div');
                mesaDiv.className = 'mesa';  // Asignar clase para el estilo
                mesaDiv.textContent = `MESA ${mesa.idMesa}`;  // Mostrar el texto de la mesa

                // Cambiar el color de fondo según el estado
                if (mesa.statusMesa) {
                    mesaDiv.classList.add('disponible');  // Mesa disponible
                } else {
                    mesaDiv.classList.add('ocupada');  // Mesa ocupada
                }

                // Añadir evento de clic para redirigir a api/platos/list
                mesaDiv.onclick = function() {
                    window.location.href = `http://localhost:8080/api/platos/list?mesaId=${mesa.idMesa}`;
                };

                document.querySelector('#mesas').appendChild(mesaDiv);  // Añadir la mesa al DOM
            });
        } else {
            mesaDiv.innerHTML = "<p>No hay mesas disponibles.</p>";
        }
    };

    // Manejo de errores en la solicitud
    request.onerror = function () {
        mesaDiv.innerHTML = "<p>Error al recuperar los datos.</p>";
    };
}

// Ejecutar la función para obtener las mesas cuando cargue la página
document.addEventListener('DOMContentLoaded', obtenerMesas);
