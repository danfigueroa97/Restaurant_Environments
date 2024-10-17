package com.example.Restaurante.Service;


import com.example.Restaurante.Model.Categoria;
import com.example.Restaurante.Model.Plato;
import com.example.Restaurante.Repository.CategoriaRepository;
import com.example.Restaurante.Repository.PlatoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CategoriaService implements ICategoriaService{


    @Autowired
    CategoriaRepository categoriaRepository;

    @Override
    public List<Categoria> listarCategoria(){
        return categoriaRepository.findAll();
    }

    @Override
    public Categoria buscarCategoria(Long id){
        Categoria categoria = null;
        categoria = categoriaRepository.findById(id).orElse(null);
        if(categoria != null){
            return categoria;
        } else {
            return null;
        }
    }

    @Override
    public Categoria crearCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Override
    public int eliminarCategoria(Long id) {
        categoriaRepository.deleteById(id);
        return 1;
    }
}
