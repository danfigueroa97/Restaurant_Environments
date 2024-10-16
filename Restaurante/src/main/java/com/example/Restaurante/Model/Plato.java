package com.example.Restaurante.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Plato")
public class Plato {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPlato")
    private long idPlato;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio")
    private long precio;

    @Column(name = "imagen")
    private String imagen;

    @ManyToOne
    @JoinColumn(name = "categoria")
    private Categoria categoria;
}
