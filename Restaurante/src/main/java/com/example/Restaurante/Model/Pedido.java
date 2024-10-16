package com.example.Restaurante.Model;

import jakarta.persistence.*;
<<<<<<< Updated upstream
import lombok.AllArgsConstructor;
=======
>>>>>>> Stashed changes
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
<<<<<<< Updated upstream
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
    private Mesa idMesa;

    @ManyToOne
    @JoinColumn(name = "idPlato")
    private Plato idPlato;
=======
@NoArgsConstructor
@Entity
@Table(name="Pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPedido;

    @Column(name="statusPedido")
    private Boolean statusPedido;

    @ManyToOne
    @JoinColumn(name="mesa")
    private Mesa mesa;

    @ManyToOne
    @JoinColumn(name="plato")
    private Plato plato;
    
>>>>>>> Stashed changes
}
