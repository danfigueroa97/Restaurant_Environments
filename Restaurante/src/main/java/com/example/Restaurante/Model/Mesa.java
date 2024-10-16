package com.example.Restaurante.Model;

<<<<<<< Updated upstream
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
=======
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table (name="Mesa")
public class Mesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMesa;

    @Column(name="statusMesa")
>>>>>>> Stashed changes
    private Boolean statusMesa;
}
