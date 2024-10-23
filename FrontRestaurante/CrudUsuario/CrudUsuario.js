document.addEventListener("DOMContentLoaded", function () {
    const usuarioTableBody = document.getElementById("usuarioTableBody");
    const usuarioForm = document.getElementById("usuarioForm");
    const idUsuarioField = document.getElementById("idUsuario");
    const nombreField = document.getElementById("nombre");
    const contrasenaField = document.getElementById("contrasena");
    const btnCrear = document.getElementById("btnCrear");
    const btnActualizar = document.getElementById("btnActualizar");
    const btnCancelar = document.getElementById("btnCancelar");

    const apiUrl = "http://localhost:8080/api/usuarios"; // Cambia esta URL si es necesario

    // Ocultar los botones de actualizar y cancelar al inicio
    btnActualizar.style.display = 'none'; // Oculta el botón de actualizar
    btnCancelar.style.display = 'none'; // Oculta el botón de cancelar

    function cargarUsuarios() {
        fetch(`${apiUrl}/list`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error cargando usuarios");
                }
                return response.json();
            })
            .then(data => {
                usuarioTableBody.innerHTML = '';
                data.forEach(usuario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${usuario.idUsuario}</td>
                        <td>${usuario.nombre}</td>
                        <td>
                            <button class="btnEditar" data-id="${usuario.idUsuario}">Editar</button>
                            <button class="btnEliminar" data-id="${usuario.idUsuario}">Eliminar</button>
                        </td>
                    `;
                    usuarioTableBody.appendChild(row);
                });
                agregarEventosBotones();
            })
            .catch(error => alert(error.message));
    }

    function agregarEventosBotones() {
        const btnEditar = document.querySelectorAll(".btnEditar");
        const btnEliminar = document.querySelectorAll(".btnEliminar");

        btnEditar.forEach(button => {
            button.addEventListener("click", function () {
                const id = button.getAttribute("data-id");
                obtenerUsuario(id);
            });
        });

        btnEliminar.forEach(button => {
            button.addEventListener("click", function () {
                const id = button.getAttribute("data-id");
                eliminarUsuario(id);
            });
        });
    }

    function obtenerUsuario(id) {
        fetch(`${apiUrl}/list/${id}`)
            .then(response => response.json())
            .then(usuario => {
                idUsuarioField.value = usuario.idUsuario; // Muestra el ID en el campo correspondiente
                nombreField.value = usuario.nombre;
                contrasenaField.value = usuario.contrasena;

                btnCrear.style.display = 'none'; // Oculta el botón de crear
                btnActualizar.style.display = 'block'; // Muestra el botón de actualizar
                btnCancelar.style.display = 'block'; // Muestra el botón de cancelar
            })
            .catch(error => alert("Error al obtener usuario: " + error.message));
    }

    function eliminarUsuario(id) {
        fetch(`${apiUrl}/delete/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                cargarUsuarios();
            })
            .catch(error => alert("Error al eliminar usuario: " + error.message));
    }

    btnCrear.addEventListener("click", function (event) {
        event.preventDefault();

        const nuevoUsuario = {
            nombre: nombreField.value,
            contrasena: contrasenaField.value,
        };

        fetch(`${apiUrl}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoUsuario),
        })
            .then(() => {
                cargarUsuarios();
                usuarioForm.reset(); // Restablece el formulario
                idUsuarioField.value = ''; // Restablece el campo ID
            })
            .catch(error => alert("Error al crear usuario: " + error.message));
    });

    btnActualizar.addEventListener("click", function (event) {
        event.preventDefault();

        const usuarioActualizado = {
            idUsuario: idUsuarioField.value,
            nombre: nombreField.value,
            contrasena: contrasenaField.value,
        };

        fetch(`${apiUrl}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioActualizado),
        })
            .then(() => {
                cargarUsuarios();
                usuarioForm.reset(); // Restablece el formulario
                idUsuarioField.value = ''; // Restablece el campo ID
                btnActualizar.style.display = 'none'; // Oculta el botón de actualizar
                btnCancelar.style.display = 'none'; // Oculta el botón de cancelar
                btnCrear.style.display = 'block'; // Muestra el botón de crear
            })
            .catch(error => alert("Error al actualizar usuario: " + error.message));
    });

    btnCancelar.addEventListener("click", function () {
        usuarioForm.reset(); // Restablece el formulario
        btnActualizar.style.display = 'none'; // Oculta el botón de actualizar
        btnCancelar.style.display = 'none'; // Oculta el botón de cancelar
        btnCrear.style.display = 'block'; // Muestra el botón de crear
        idUsuarioField.value = ''; // Restablece el campo ID
    });

    cargarUsuarios(); // Carga los usuarios al inicio
});
