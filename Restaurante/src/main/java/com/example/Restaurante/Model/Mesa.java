package com.example.Restaurante.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Mesa")
public class Mesa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idMesa")
    private Long idMesa;

    @Column(name = "statusMesa")
    private Boolean statusMesa;
}
