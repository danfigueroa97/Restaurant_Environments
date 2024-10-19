package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Mesa;
import com.example.Restaurante.Model.Pedido;
import com.example.Restaurante.Repository.MesaRepository;
import com.example.Restaurante.Repository.PedidoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PedidoService implements IPedidoService {

    @Autowired
    PedidoRepository pedidoRepository;

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
    public Pedido nuevoPedido(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    @Override
    public int borrarPedido(Long idPedido) {
        pedidoRepository.findById(idPedido).ifPresent(pedido -> pedidoRepository.deleteById(idPedido));
        return 1;
    }
}
