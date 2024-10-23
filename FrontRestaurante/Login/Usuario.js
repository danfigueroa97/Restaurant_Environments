function validarLogin() {
    // Obtener los valores del formulario
    const usuario = document.getElementById('icon_user').value;
    const contrasena = document.getElementById('icon_pass').value;

    // Validar que los campos no estén vacíos
    if (usuario.trim() === "" || contrasena.trim() === "") {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Crear el objeto de usuario
    const datosUsuario = {
        nombre: usuario,
        contrasena: contrasena
    };

    // Realizar la solicitud de login
    fetch('http://localhost:8080/api/usuarios/login', { // Cambia la URL si es necesario
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en el login'); // Manejar error de respuesta
        }
        return response.json(); // Procesar la respuesta JSON
    })
    .then(data => {
        if (data) {
            // Aquí puedes manejar lo que sucede después del login exitoso
            alert('Inicio de sesión exitoso!');
            // Redirigir a otra página o realizar otra acción
            window.location.href = 'dashboard.html'; // Cambia esto a la URL del panel de control
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Usuario o contraseña incorrectos.'); // Mostrar mensaje de error
    });
}
