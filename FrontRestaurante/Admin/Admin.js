document.getElementById("btnUsuarios").addEventListener("click", function() {
    window.location.href = "../CrudUsuario/CrudUsuario.html"; 
});

document.getElementById("btnMenu").addEventListener("click", function() {
    window.location.href = "../CrudMenu/CrudMenu.html"; 
});

document.getElementById("btnPedido").addEventListener("click", function() {
    window.location.href = "../Pedido/Pedido.html"; 
});

document.getElementById("btnLogout").addEventListener("click", function() {
    alert("Has cerrado sesión"); 
    window.location.href = "../Login/Usuario.html"
});