package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Usuario;
import java.util.List;

public interface IUsuarioService {

    //Listar los Usuarios
    List<Usuario> getUsuarios();

    //Buscar un Usuario por id
    Usuario buscarUsuario(Long id);

    //Crear un Usuario
    Usuario nuevoUsuario(Usuario usuario);

    //Eliminar un Usuario
    int borrarUsuario(Long id);
}
