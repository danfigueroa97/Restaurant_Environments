package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Mesa;
import com.example.Restaurante.Repository.MesaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class MesaService implements IMesaService {

    @Autowired
    MesaRepository mesaRepository;

    @Override
    public List<Mesa> getMesas() {
        return mesaRepository.findAll();
    }

    @Override
    public Mesa buscarMesa(Long idMesa) {
        Mesa mesa =null;
        mesa=mesaRepository.findById(idMesa).orElse(null);
        if (mesa==null){
            return null;
        }
        return mesa;
    }

    @Override
    public Mesa nuevaMesa(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    @Override
    public int borrarMesa(Long idMesa) {
        mesaRepository.deleteById(idMesa);
        return 1;
    }
}
