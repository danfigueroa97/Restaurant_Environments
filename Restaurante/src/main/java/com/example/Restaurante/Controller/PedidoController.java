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
    public ResponseEntity<Pedido> buscarPorId(@PathVariable Long idPedido) {
        Pedido pedido = pedidoService.buscarPedido(idPedido);
        if (pedido != null) {
            return new ResponseEntity<>(pedido, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
        try {
            Pedido obj = pedidoService.buscarPedido(pedido.getIdPedido());
            if (obj != null) {
                obj.setMesa(pedido.getMesa());
                pedidoService.editarPedido(obj);
                return new ResponseEntity<>(obj, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Imprimir el error en la consola
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Eliminar el Pedido
    @DeleteMapping("/delete/{idPedido}")
    public ResponseEntity<Void> eliminar(@PathVariable Long idPedido) {
        pedidoService.borrarPedido(idPedido);
        return ResponseEntity.ok().build();
    }
}
