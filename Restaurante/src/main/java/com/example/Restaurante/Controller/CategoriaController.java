package com.example.Restaurante.Controller;


import com.example.Restaurante.Model.Categoria;
import com.example.Restaurante.Service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categoria")
@CrossOrigin(origins = "*")
public class CategoriaController {

    @Autowired
    CategoriaService categoriaService;

    //Listar
    @GetMapping("/list")
    public List<Categoria> cargarCategoria(){
        return categoriaService.listarCategoria();
    }

    //Buscar
    @GetMapping("/list/{id}")
    public Categoria listarCategoria(@PathVariable Long id) {
        return categoriaService.buscarCategoria(id);

    }

    // Agregar
    @PostMapping("/create")
    public ResponseEntity<Categoria> agregarCategoria(@RequestBody Categoria categoria){
        Categoria obj= categoriaService.crearCategoria(categoria);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Actualizar
    @PutMapping("/actualizar")
    public ResponseEntity<Categoria> actualizarCategoria(@RequestBody Categoria categoria){
        Categoria obj=categoriaService.buscarCategoria(categoria.getIdCategoria());
        if(obj != null){
            obj.setIdCategoria(categoria.getIdCategoria());
            obj.setNombre(categoria.getNombre());
            categoriaService.crearCategoria(obj);
        } else {
            return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj,HttpStatus.OK);
    }

    //Eliminar
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Categoria> eliminarCategoria(@PathVariable Long id){
        Categoria obj= categoriaService.buscarCategoria(id);
        if(obj != null){
            categoriaService.eliminarCategoria(id);
            return new ResponseEntity<>(obj, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
