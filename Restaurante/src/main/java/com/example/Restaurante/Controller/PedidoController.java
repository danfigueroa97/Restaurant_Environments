package com.example.Restaurante.Controller;

import com.example.Restaurante.Model.Pedido;
import com.example.Restaurante.Service.IPedidoService;
import com.example.Restaurante.dto.CrearPedidoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    @Autowired
    IPedidoService pedidoService;

    //Listar los pedidos
    @GetMapping("/list")
    public List<Pedido> cargarPedido() {
        return pedidoService.getPedidos();
    }

    //Buscar por Id
    @GetMapping("/list/{idPedido}")
    public Pedido buscarPorId(@PathVariable Long idPedido) {
        return pedidoService.buscarPedido(idPedido);
    }

    // Agregar un Pedido
    @PostMapping("/create")
    public ResponseEntity<Pedido> agregar(@RequestBody CrearPedidoDTO dto) {
        Pedido obj = pedidoService.nuevoPedido(dto);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Actualizar el Pedido
    @PutMapping("/update")
    public ResponseEntity<Pedido> editar(@RequestBody Pedido pedido) {
        Pedido obj = pedidoService.buscarPedido(pedido.getIdPedido());
        if (obj != null) {
            obj.setStatusPedido(pedido.getStatusPedido());
            obj.setMesa(pedido.getMesa());
            obj.setItems(pedido.getItems());
//            pedidoService.nuevoPedido(obj);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Eliminar el Pedido
    @DeleteMapping("/delete/{idPedido}")
    public ResponseEntity<Void> eliminar(@PathVariable Long idPedido) {
        pedidoService.borrarPedido(idPedido);
        return ResponseEntity.ok().build();
    }
}
