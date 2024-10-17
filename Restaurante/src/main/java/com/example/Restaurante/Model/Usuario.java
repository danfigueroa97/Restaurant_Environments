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
@Table(name = "Usuario")
public class Usuario {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idUsuario")
    private Long idUsuario;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "rol")
    private String rol;

    @Column(name = "contraseña")
    private long contraseña;
}
