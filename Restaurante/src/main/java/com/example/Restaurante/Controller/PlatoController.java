package com.example.Restaurante.Controller;


import com.example.Restaurante.Model.Plato;
import com.example.Restaurante.Service.PlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plato")
public class PlatoController {

    @Autowired
    PlatoService platoService;

    //Listar
    @GetMapping("/listar")
    public List<Plato> cargarPlato(){
        return platoService.listarPlato();
    }

    //Buscar
    @GetMapping("/listar/{id}")
    public ResponseEntity<Plato> listarPlato(@PathVariable Long id) {
        Plato plato = platoService.buscarPlato(id);
        return ResponseEntity.ok(plato);
    }

    //Crear
    @PostMapping("/crear")
    public ResponseEntity<Plato> agregar(@RequestBody Plato plato){
        Plato obj = platoService.crearPlato(plato);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Actualizar
    @PutMapping("/actualizar")
    public ResponseEntity<Plato> actualizar(@RequestBody Plato plato){
        Plato obj = platoService.buscarPlato(plato.getIdPlato());
        if (obj != null) {
            obj.setIdPlato(plato.getIdPlato());
            obj.setNombre(plato.getNombre());
            obj.setDescripcion(plato.getDescripcion());
            obj.setPrecio(plato.getPrecio());
            obj.setImagen(plato.getImagen());
            obj.setIdCategoria(plato.getIdCategoria());
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Eliminar
    @DeleteMapping("/eliminar/{id}")
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









