package com.example.Restaurante.Controller;

import com.example.Restaurante.Model.Item;
import com.example.Restaurante.Service.IItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")
public class ItemController {

    @Autowired
    private IItemService itemService;

    @PutMapping("/update/{id}")
    public ResponseEntity<Item> actualizarCantidad(@PathVariable Long id, @RequestBody Item updatedItem) {
        try {
            Item itemActualizado = itemService.actualizarCantidad(id, updatedItem.getCantidad());
            return ResponseEntity.ok(itemActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
