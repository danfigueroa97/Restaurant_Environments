package com.example.Restaurante.Repository;

import com.example.Restaurante.Model.Plato;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlatoRepository extends JpaRepository<Plato, Long> {
  List<Plato> findByIdPlatoIn(List<Long> idPlato);
}
