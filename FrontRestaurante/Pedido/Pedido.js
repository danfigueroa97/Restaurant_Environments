const url = "http://localhost:8080/";
let items = [];
let currentIdPedido = null; // Variable para almacenar el ID del pedido actual

// Función genérica para enviar solicitudes
function sendRequest(endPoint, method, data) {
    let request = new XMLHttpRequest();
    request.open(method, url + endPoint);
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(data ? JSON.stringify(data) : null);
    return request;
}

// Función para obtener la lista de pedidos
function obtenerPedidos() {
    let request = sendRequest('api/pedidos/list', 'GET');
    let pedidoListTable = document.querySelector('#pedidoList');
    pedidoListTable.innerHTML = "";

    request.onload = function () {
        let data = request.response;
        if (data && data.length > 0) {
            data.forEach((pedido) => {
                let totalPrecio = pedido.items.reduce((total, item) => total + (item.plato.precio * item.cantidad), 0);
                
                let pedidoRow = document.createElement('tr');
                pedidoRow.innerHTML = `
                    <td>${pedido.idPedido}</td>
                    <td>${pedido.mesa.idMesa}</td>
                    <td>
                    ${pedido.items.map(item => `
                        <div class="item-container">
                            <img src="${item.plato.imagen}" alt="${item.plato.nombre}" class="item-image" /> 
                            <div class="item-details">
                                <span class="item-name">${item.plato.nombre}</span>
                                <div class="cantidad-container">
                                    <label for="cantidad-${item.id}">Cantidad:</label>
                                    <input type="number" id="cantidad-${item.id}" value="${item.cantidad}" min="1" class="cantidad-input" data-id="${item.id}" />
                                    <button class="update-btn" data-id="${item.id}" data-pedido="${pedido.idPedido}">Actualizar</button>
                                </div>
                            </div>
                        </div>`).join('')}
                    
                    </td>
                    <td>${totalPrecio.toFixed(2)} $</td>
                    <td>
                        <button class="delete-btn" data-id="${pedido.idPedido}" data-mesa="${pedido.mesa.idMesa}">Eliminar</button>
                    </td>
                `;
                pedidoListTable.appendChild(pedidoRow);
            });

            // Asignar funcionalidad a los botones
            asignarFuncionesBotones();
        } else {
            pedidoListTable.innerHTML = "<tr><td colspan='5'>No hay pedidos disponibles.</td></tr>";
        }
    };

    request.onerror = function () {
        pedidoListTable.innerHTML = "<tr><td colspan='5'>Error al recuperar los datos.</td></tr>";
    };
}

// Función para eliminar un pedido
async function eliminarPedido(id, idMesa) {
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar el pedido ${id}?`);
    if (confirmacion) {
        try {
            const response = await fetch(`http://localhost:8080/api/pedidos/delete/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Actualizar disponibilidad de la mesa
                await actualizarMesaDisponibilidad(idMesa);
                alert(`Pedido ${id} eliminado`);
                obtenerPedidos(); // Recargar la lista de pedidos
            } else {
                alert('Error al eliminar el pedido');
            }
        } catch (error) {
            console.error('Error eliminando el pedido:', error);
        }
    }
}

// Función para actualizar el estado de la mesa
async function actualizarMesaDisponibilidad(idMesa) {
    const response = await fetch(`http://localhost:8080/api/mesas/update/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idMesa: idMesa, statusMesa: true }), // Cambiar a disponible
    });

    if (!response.ok) {
        alert('Hubo un error al actualizar el estado de la mesa.');
    }
}

// Función para actualizar la cantidad del item
async function actualizarCantidad(idItem, nuevaCantidad, idPedido) {
    try {
        const response = await fetch(`http://localhost:8080/api/items/update/${idItem}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cantidad: nuevaCantidad })
        });

        if (response.ok) {
            alert('Cantidad actualizada');
            obtenerPedidos(); // Recargar la lista de pedidos
        } else {
            alert('Error al actualizar la cantidad');
        }
    } catch (error) {
        console.error('Error actualizando la cantidad:', error);
    }
}

// Asignar funcionalidad a los botones
function asignarFuncionesBotones() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function () {
            let idPedido = this.getAttribute('data-id');
            let idMesa = this.getAttribute('data-mesa');
            eliminarPedido(idPedido, idMesa);
        });
    });

    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', function () {
            let idItem = this.getAttribute('data-id');
            let idPedido = this.getAttribute('data-pedido');
            let nuevaCantidad = document.querySelector(`input[data-id="${idItem}"]`).value;
            actualizarCantidad(idItem, nuevaCantidad, idPedido);
        });
    });
}
document.getElementById("btnVolver").addEventListener("click", function() {
    window.location.href = "../Admin/Admin.html"; // Cambia a la ruta de tu interfaz de admin
});
// Cargar la lista de pedidos al inicio
obtenerPedidos();

