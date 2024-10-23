document.getElementById("btnLogin").addEventListener("click", function() {
    const username = document.getElementById("icon_user").value;
    const password = document.getElementById("icon_pass").value;

    const apiUrl = "http://localhost:8080/api/usuarios/login"; 

    const loginData = {
        nombre: username,
        contrasena: password
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error en las credenciales");
        }
        return response.json();
    })
    .then(data => {
        alert(data.Mensaje); // Muestra un mensaje de bienvenida o error
        if (data.Endpoint) {
            window.location.href = data.Endpoint; // Redirige según el rol
        }
    })
    .catch(error => {
        alert(error.message);
    });

});
