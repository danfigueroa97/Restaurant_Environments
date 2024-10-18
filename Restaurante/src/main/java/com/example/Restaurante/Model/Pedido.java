package com.example.Restaurante.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPedido")
    private Long idPedido;

    @Column(name = "statusPedido")
    private Boolean statusPedido;

    @ManyToOne
    @JoinColumn(name = "idMesa")
    private Mesa mesa;

    @OneToMany
    private List<Item> items;
}
