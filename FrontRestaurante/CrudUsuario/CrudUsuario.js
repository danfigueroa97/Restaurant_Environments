document.addEventListener("DOMContentLoaded", function () {
    const usuarioTableBody = document.getElementById("usuarioTableBody");
    const usuarioForm = document.getElementById("usuarioForm");
    const idUsuarioField = document.getElementById("idUsuario");
    const nombreField = document.getElementById("nombre");
    const contrasenaField = document.getElementById("contrasena");
    const btnCrear = document.getElementById("btnCrear");
    const btnActualizar = document.getElementById("btnActualizar");
    const btnCancelar = document.getElementById("btnCancelar");
    const rolField = document.getElementById("rol");
    const btnVolver = document.getElementById("btnVolver"); 

    const apiUrl = "http://localhost:8080/api/usuarios"; 


    btnActualizar.style.display = 'none'; 
    btnCancelar.style.display = 'none'; 

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
                        <td>${usuario.rol}</td>

                        <td>
                            <button class="btnEditar" data-id="${usuario.idUsuario}">Actualizar</button>
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
                idUsuarioField.value = usuario.idUsuario;
                nombreField.value = usuario.nombre;
                contrasenaField.value = usuario.contrasena;
                rolField.value = usuario.rol;

                btnCrear.style.display = 'none'; 
                btnActualizar.style.display = 'block';
                btnCancelar.style.display = 'block'; 
                btnVolver.style.display = 'none'; 
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
            rol: document.getElementById("rol").value 

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
                usuarioForm.reset(); 
                idUsuarioField.value = '';  
            })
            .catch(error => alert("Error al crear usuario: " + error.message));
    });

    btnActualizar.addEventListener("click", function (event) {
        event.preventDefault();

        const usuarioActualizado = {
            idUsuario: idUsuarioField.value,
            nombre: nombreField.value,
            contrasena: contrasenaField.value,
            rol: document.getElementById("rol").value 

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
                usuarioForm.reset();
                idUsuarioField.value = ''; 
                btnActualizar.style.display = 'none'; 
                btnCancelar.style.display = 'none';
                btnCrear.style.display = 'block';
                btnVolver.style.display = 'none'; 
            })
            .catch(error => alert("Error al actualizar usuario: " + error.message));
    });

    btnCancelar.addEventListener("click", function () {
        usuarioForm.reset(); 
        btnActualizar.style.display = 'none'; 
        btnCancelar.style.display = 'none'; 
        btnCrear.style.display = 'block'; 
        btnVolver.style.display = 'block'; 
        idUsuarioField.value = '';
        
    });

    btnVolver.addEventListener("click", function() {
        window.location.href = "../Admin/Admin.html"; 
    });

    cargarUsuarios(); 
});
