package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Item;
import com.example.Restaurante.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemService implements IItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public Optional<Item> findById(Long id) {
        return itemRepository.findById(id);
    }

    @Override
    public Item actualizarCantidad(Long id, Integer nuevaCantidad) {
        Optional<Item> optionalItem = itemRepository.findById(id);
        if (optionalItem.isPresent()) {
            Item item = optionalItem.get();
            item.setCantidad(nuevaCantidad);  // Actualizar la cantidad
            return itemRepository.save(item);  // Guardar los cambios en la base de datos
        } else {
            throw new RuntimeException("Item no encontrado con el ID: " + id);
        }
    }
}
