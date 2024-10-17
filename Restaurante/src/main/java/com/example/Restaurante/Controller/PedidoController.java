package com.example.Restaurante.Controller;

import com.example.Restaurante.Model.Pedido;
import com.example.Restaurante.Service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    PedidoService pedidoService;

    //Listar los pedidos
    @GetMapping("/list")
    public List<Pedido> cargarPedido(){
        return pedidoService.getPedidos();
    }

    //Buscar por Id
    @GetMapping("/list/{id}")
    public Pedido buscarPorId (@PathVariable Long idPedido){
        return pedidoService.buscarPedido(idPedido);
    }

    // Agregar un Pedido
    @PostMapping("/create")
    public ResponseEntity<Pedido> agregar(@RequestBody Pedido pedido){
        Pedido obj= pedidoService.nuevoPedido(pedido);
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }

    //Actualizar el Pedido
    @PutMapping("/update")
    public ResponseEntity<Pedido> editar (@RequestBody Pedido pedido){
        Pedido obj=pedidoService.buscarPedido(pedido.getIdPedido());
        if(obj != null){
            obj.setStatusPedido(pedido.getStatusPedido());
            obj.setIdMesa(pedido.getIdMesa());
            obj.setIdPlato(pedido.getIdPlato());
            pedidoService.nuevoPedido(obj);
        } else {
            return new ResponseEntity<>(obj,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj,HttpStatus.OK);
    }

    //Eliminar el Pedido
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Pedido> eliminar (@PathVariable Long idPedido){
        Pedido obj= pedidoService.buscarPedido(idPedido);
        if(obj != null){
            pedidoService.borrarPedido(idPedido);
        } else {
            return new ResponseEntity<>(obj, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
}
