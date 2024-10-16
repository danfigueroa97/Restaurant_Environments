package com.example.Restaurante.Controller;


import com.example.Restaurante.Model.Plato;
import com.example.Restaurante.Service.PlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/platos")
@CrossOrigin(origins = "*")  // Permitir solicitudes desde cualquier origen
public class PlatoController {

    @Autowired
    PlatoService platoService;

    //Listar
    @GetMapping("/list")
    public List<Plato> cargarPlato(){
        return platoService.listarPlato();
    }

    //Buscar
    @GetMapping("/list/{id}")
    public ResponseEntity<Plato> listarPlato(@PathVariable Long id) {
        Plato plato = platoService.buscarPlato(id);
        return ResponseEntity.ok(plato);
    }

    //Crear
    @PostMapping("/create")
    public ResponseEntity<Plato> agregar(@RequestBody Plato plato){
        Plato obj = platoService.crearPlato(plato);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Actualizar
    @PutMapping("/update")
    public ResponseEntity<Plato> actualizar(@RequestBody Plato plato){
        Plato obj = platoService.buscarPlato(plato.getIdPlato());
        if (obj != null) {
            obj.setIdPlato(plato.getIdPlato());
            obj.setNombre(plato.getNombre());
            obj.setDescripcion(plato.getDescripcion());
            obj.setPrecio(plato.getPrecio());
            obj.setImagen(plato.getImagen());
            obj.setIdCategoria(plato.getIdCategoria());
            platoService.crearPlato(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Eliminar
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Plato> eliminar(@PathVariable Long id){
        Plato obj = platoService.buscarPlato(id);
        if (obj != null) {
            platoService.eliminarPlato(id);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}









