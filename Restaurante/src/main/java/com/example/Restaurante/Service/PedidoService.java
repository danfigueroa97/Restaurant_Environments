package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Item;
import com.example.Restaurante.Model.Pedido;
import com.example.Restaurante.Repository.ItemRepository;
import com.example.Restaurante.Repository.MesaRepository;
import com.example.Restaurante.Repository.PedidoRepository;
import com.example.Restaurante.Repository.PlatoRepository;
import com.example.Restaurante.dto.CrearPedidoDTO;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class PedidoService implements IPedidoService {

  @Autowired private PedidoRepository pedidoRepository;

  @Autowired private MesaRepository mesaRepository;

  @Autowired private PlatoRepository platoRepository;
  @Autowired private ItemRepository itemRepository;

  @Override
  public List<Pedido> getPedidos() {
    return pedidoRepository.findAll();
  }

  @Override
  public Pedido buscarPedido(Long idPedido) {
    Pedido pedido = null;
    pedido = pedidoRepository.findById(idPedido).orElse(null);
    if (pedido == null) {
      return null;
    }
    return pedido;
  }

  @Override
  public Pedido nuevoPedido(CrearPedidoDTO dto) {
    Pedido pedido = new Pedido();
    pedido.setStatusPedido(false);
    var mesa =
        this.mesaRepository
            .findById(dto.getIdMesa())
            .orElseThrow(() -> new RuntimeException("Mesa no encontrada"));
    pedido.setMesa(mesa);
    var items =
        itemRepository.saveAll(
            dto.getItems().stream()
                .map(
                    itemDTO -> {
                      var item = new Item();
                      item.setCantidad(itemDTO.getCantidad());
                      item.setPlato(
                          platoRepository
                              .findById(itemDTO.getIdPlato())
                              .orElseThrow(() -> new RuntimeException("Plato no encontrado")));
                      return item;
                    })
                .collect(Collectors.toList()));
    pedido.setItems(items);
    return pedidoRepository.save(pedido);
  }

  @Override
  public int borrarPedido(Long idPedido) {
    pedidoRepository.findById(idPedido).ifPresent(pedido -> pedidoRepository.deleteById(idPedido));
    return 1;
  }
}
