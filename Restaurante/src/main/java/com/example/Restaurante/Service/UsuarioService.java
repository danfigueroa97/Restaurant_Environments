package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Usuario;
import com.example.Restaurante.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import jakarta.transaction.Transactional;
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
}