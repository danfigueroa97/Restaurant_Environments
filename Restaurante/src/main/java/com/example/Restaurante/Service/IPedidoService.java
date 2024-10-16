package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Mesa;
import com.example.Restaurante.Model.Pedido;
import java.util.List;

public interface IPedidoService {

    //Listar los Pedidos
    List<Pedido> getPedidos();

    //Buscar un Pedido por id
    Pedido buscarPedido(Long idPedido);

    //Crear un Pedido
    Pedido nuevoPedido(Pedido pedido);

    //Eliminar un Pedido
    int borrarPedido(Long idPedido);

}
