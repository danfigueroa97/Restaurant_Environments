// Definir la variable a nivel global
let idMesaSeleccionada; 

// Obtener mesas desde la API
async function cargarMesas() {
    const response = await fetch('http://localhost:8080/api/mesas/list');
    const mesas = await response.json();
    
    const mesasList = document.getElementById('mesas-list');
    mesasList.innerHTML = ''; // Limpiar la lista de mesas

    mesas.forEach(mesa => {
        const li = document.createElement('li');
        li.textContent = `Mesa ${mesa.idMesa}`; // Mostrar el idMesa real

        // Aplicar clase basada en la disponibilidad de la mesa
        if (mesa.statusMesa) {
            li.classList.add('mesa-disponible'); // Clase para mesa disponible
        } else {
            li.classList.add('mesa-ocupada'); // Clase para mesa ocupada
        }

        li.addEventListener('click', () => seleccionarMesa(mesa));
        mesasList.appendChild(li);
    });
}

// Función para manejar la selección de mesa
async function seleccionarMesa(mesa) {
    idMesaSeleccionada = mesa.idMesa; // Asignar el ID de la mesa seleccionada

    if (!mesa.statusMesa) {
        alert('Esta mesa ya está ocupada.');
        return;
    }

    document.getElementById('mesas-container').style.display = 'none';
    document.getElementById('platos-container').style.display = 'block';
    cargarPlatos();
}

// Obtener platos desde la API
async function cargarPlatos() {
    const response = await fetch('http://localhost:8080/api/platos/list');
    const platos = await response.json();
    
    const platosList = document.getElementById('platos-list');
    platosList.innerHTML = ''; // Limpiar la lista

    platos.forEach(plato => {
        const li = document.createElement('li');

        // Crear elemento de imagen para el plato
        const imgPlato = document.createElement('img');
        imgPlato.src = plato.imagen; // URL de la imagen obtenida desde el backend
        imgPlato.alt = plato.nombre;
        imgPlato.style.width = '150px'; // Ajustar el tamaño de la imagen
        imgPlato.style.height = '150px'; // Ajustar el tamaño de la imagen

        // Texto con nombre y precio del plato
        const platoInfo = document.createElement('p');
        platoInfo.textContent = `${plato.nombre} - $${plato.precio}`;

        // Agregar descripción del plato
        const platoDescripcion = document.createElement('p');
        platoDescripcion.textContent = plato.descripcion; // Descripción del plato
        
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 1;
        inputCantidad.value = 1;
        
        const buttonAgregar = document.createElement('button');
        buttonAgregar.textContent = 'Agregar';
        buttonAgregar.addEventListener('click', () => agregarAlPedido(plato, inputCantidad.value));
        
        // Añadir elementos a la lista de platos
        li.appendChild(imgPlato); // Añadir imagen
        li.appendChild(platoInfo); // Añadir nombre y precio
        li.appendChild(platoDescripcion); // Añadir descripción del plato
        li.appendChild(inputCantidad); // Añadir input de cantidad
        li.appendChild(buttonAgregar); // Añadir botón
        platosList.appendChild(li);
    });
}

// Función para agregar platos al pedido
let pedido = [];

function agregarAlPedido(plato, cantidad) {
    const pedidoList = document.getElementById('pedido-list');
    
    const pedidoItem = {
        idPlato: plato.idPlato,
        nombre: plato.nombre,
        precio: plato.precio,
        cantidad: parseInt(cantidad),
        imagen: plato.imagen
    };
    pedido.push(pedidoItem);

    const li = document.createElement('li');

    // Crear elemento de imagen para el pedido
    const imgPlato = document.createElement('img');
    imgPlato.src = pedidoItem.imagen; // URL de la imagen
    imgPlato.alt = pedidoItem.nombre;

     // Crear elemento de texto para el nombre y la cantidad
     const platoInfo = document.createElement('p');
     platoInfo.textContent =` ${pedidoItem.nombre} x${pedidoItem.cantidad} - Total: $${pedidoItem.precio * pedidoItem.cantidad}`;
     
     li.appendChild(imgPlato); // Añadir la imagen al li
     li.appendChild(platoInfo); // Añadir la información del pedido
     pedidoList.appendChild(li);

    document.getElementById('pedido-container').style.display = 'block';
}

// Crear el pedido
async function crearPedido() {
    // Asegúrate de que idMesaSeleccionada esté definido
    if (!idMesaSeleccionada) {
        alert('Por favor, selecciona una mesa primero.');
        return;
    }

    const pedidoDTO = {
        idMesa: idMesaSeleccionada,
        items: pedido.map(p => ({
            idPlato: p.idPlato,
            cantidad: p.cantidad
        }))
    };

    // Actualizar el estado de la mesa antes de crear el pedido
    const actualizarMesaResponse = await fetch('http://localhost:8080/api/mesas/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idMesa: idMesaSeleccionada, statusMesa: false }), // Cambiar a ocupada
    });

    if (actualizarMesaResponse.ok) {
        const response = await fetch('http://localhost:8080/api/pedidos/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedidoDTO),
        });

        if (response.ok) {
            alert('Pedido creado con éxito!');
            window.location.reload();
        } else {
            alert('Hubo un error al crear el pedido.');
        }
    } else {
        alert('Hubo un error al actualizar el estado de la mesa.');
    }
}

document.getElementById('crear-pedido-btn').addEventListener('click', crearPedido);

// Inicializar la página cargando mesas
cargarMesas();