package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Mesa;
import java.util.List;

public interface IMesaService {

    //Listar los Mesas
    List<Mesa> getMesas();

    //Buscar un Mesa por id
    Mesa buscarMesa(Long idMesa);

    //Crear una Mesa
    Mesa nuevaMesa(Mesa mesa);

    //Eliminar una Mesa
    int borrarMesa(Long idMesa);
}
