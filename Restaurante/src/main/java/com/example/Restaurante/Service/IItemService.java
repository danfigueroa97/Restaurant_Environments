package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Item;
import java.util.Optional;

public interface IItemService {
    Optional<Item> findById(Long id);
    Item actualizarCantidad(Long id, Integer nuevaCantidad);
}
