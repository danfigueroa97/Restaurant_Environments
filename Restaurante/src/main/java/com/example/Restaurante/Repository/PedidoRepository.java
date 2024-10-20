package com.example.Restaurante.Repository;

import com.example.Restaurante.Model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
}
