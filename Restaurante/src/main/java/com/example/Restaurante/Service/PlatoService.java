package com.example.Restaurante.Service;


import com.example.Restaurante.Model.Plato;
import com.example.Restaurante.Repository.PlatoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class PlatoService implements IPlatoService {

    @Autowired
    PlatoRepository platoRepository;

    @Override
    public List<Plato> listarPlato(){
        return platoRepository.findAll();
    }

    @Override
    public Plato buscarPlato(Long id){
        Plato plato = null;
        plato = platoRepository.findById(id).orElse(null);
        if(plato != null){
            return plato;
        } else {
            return null;
        }
    }

    @Override
    public Plato crearPlato(Plato plato) {
        return platoRepository.save(plato);
    }

    @Override
    public int eliminarPlato(Long id) {
        platoRepository.deleteById(id);
        return 1;
    }
}
