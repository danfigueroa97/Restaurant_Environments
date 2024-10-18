package com.example.Restaurante.Repository;

import com.example.Restaurante.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    int countByContrasenaAndNombre(String contrasena, String nombre);

    Usuario findByNombreAndContrasena(String nombre, String contrasena);


}
