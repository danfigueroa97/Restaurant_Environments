package com.example.Restaurante.Controller;

import com.example.Restaurante.Model.Usuario;
import com.example.Restaurante.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    //Listar los Usuarios
    @GetMapping("/list")
    public List<Usuario> cargarUsuario(){
        return usuarioService.getUsuarios();
    }

    //Buscar por Id
    @GetMapping("/list/{id}")
    public Usuario buscarPorId (@PathVariable Long id){
        return usuarioService.buscarUsuario(id);
    }

    // Agregar un Usuario
    @PostMapping("/create")
    public ResponseEntity<Usuario> agregar(@RequestBody Usuario usuario){
        Usuario obj= usuarioService.nuevoUsuario(usuario);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Actualizar el Usuario
    @PutMapping("/update")
    public ResponseEntity<Usuario> editar (@RequestBody Usuario usuario){
        Usuario obj=usuarioService.buscarUsuario(usuario.getIdUsuario());
        if(obj != null){
            obj.setNombre(usuario.getNombre());
            obj.setContrasena(usuario.getContrasena());
            obj.setRol(usuario.getRol());
            usuarioService.nuevoUsuario(obj);
        } else {
            return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj,HttpStatus.OK);
    }

    //Eliminar el Usuario
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Usuario> eliminar (@PathVariable Long id){
        Usuario obj= usuarioService.buscarUsuario(id);
        if(obj != null){
            usuarioService.borrarUsuario(id);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario){
        return usuarioService.ingresar(usuario);
    }
}
