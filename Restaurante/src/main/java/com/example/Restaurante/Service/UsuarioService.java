package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Usuario;
import com.example.Restaurante.Repository.UsuarioRepository;
import com.example.Restaurante.enums.Rol;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UsuarioService implements IUsuarioService{

    @Autowired
    UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> getUsuarios() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario buscarUsuario(Long id) {
        Usuario usuario =null;
        usuario= usuarioRepository.findById(id).orElse(null);
        if (usuario==null){
            return null;
        }
        return usuario;
    }

    @Override
    public Usuario nuevoUsuario(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public int borrarUsuario(Long id) {
        usuarioRepository.deleteById(id);
        return 1;
    }

    public ResponseEntity<?> ingresar(Usuario usuarioBusca) {
        Map<String, Object> response = new HashMap<>();

        try {
            Usuario usuario = usuarioRepository.findByNombreAndContrasena(
                    usuarioBusca.getNombre(),
                    usuarioBusca.getContrasena());

            if (usuario == null) {
                response.put("Usuario", null);
                response.put("Mensaje", "Usuario o contraseña incorrectos");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            // Redirigir en función del rol
            if (usuario.getRol() == Rol.ADMIN) {
                response.put("Mensaje", "Bienvenido Administrador");
                response.put("Endpoint", "/Admin/Admin.html");
            } else if (usuario.getRol() == Rol.MESERO) {
                response.put("Mensaje", "Bienvenido Mesero");
                response.put("Endpoint", "/Mesa/Mesa.html");
            }

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            response.put("Mensaje", "Ha ocurrido un error");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}