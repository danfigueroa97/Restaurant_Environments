package com.example.Restaurante.Controller;

import com.example.Restaurante.Model.Mesa;
import com.example.Restaurante.Service.MesaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mesas")
@CrossOrigin(origins = "*")
public class MesaController {

    @Autowired
    MesaService mesaService;

    //Listar las mesas
    @GetMapping("/list")
    public List<Mesa> cargarMesa(){
        return mesaService.getMesas();
    }

    //Buscar por Id
    @GetMapping("/list/{id}")
    public Mesa buscarPorId (@PathVariable Long idMesa){
        return mesaService.buscarMesa(idMesa);
    }

    // Agregar una Mesa
    @PostMapping("/create")
    public ResponseEntity<Mesa> agregar(@RequestBody Mesa mesa){
        Mesa obj= mesaService.nuevaMesa(mesa);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Actualizar la Mesa
    @PutMapping("/update")
    public ResponseEntity<Mesa> editar (@RequestBody Mesa mesa){
        Mesa obj=mesaService.buscarMesa(mesa.getIdMesa());
        if(obj != null){
            obj.setStatusMesa(mesa.getStatusMesa());
            mesaService.nuevaMesa(obj);
            return new ResponseEntity<>(obj,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(obj,HttpStatus.NOT_FOUND);
        }
    }

    //Eliminar la Mesa
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Mesa> eliminar (@PathVariable Long idMesa){
        Mesa obj= mesaService.buscarMesa(idMesa);
        if(obj != null){
            mesaService.borrarMesa(idMesa);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
}
