package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Usuario;
import com.example.Restaurante.Repository.UsuarioRepository;
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

    @Override
    public int login(Usuario usuario) {
        int u = usuarioRepository.countByContrasenaAndNombre(
                usuario.getNombre(),
                usuario.getContrasena());
        return u;
    }
    @Override
    public ResponseEntity<?> ingresar(Usuario usuarioBusca) {
        Map<String, Object> response = new HashMap<>();

        try {
            Usuario usuario = usuarioRepository.findByNombreAndContrasena(
                    usuarioBusca.getNombre(),
                    usuarioBusca.getContrasena());

            if (usuario == null) {
                response.put("Usuario", null);
                response.put("Mensaje", "Alerta: Usuario o Contraseña incorrectos");
                response.put("statusCode", HttpStatus.NOT_FOUND.value());
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            } else {
                response.put("Usuario", usuario);
                response.put("Mensaje", "Datos correctos");
                response.put("statusCode", HttpStatus.OK.value());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
        } catch (Exception e) {
            response.put("Usuario", null);
            response.put("Mensaje", "Ha ocurrido un error");
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}