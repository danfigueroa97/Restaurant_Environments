package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Categoria;
import com.example.Restaurante.Model.Mesa;

import java.util.List;

public interface ICategoriaService {

    //Listar
    List<Categoria> listarCategoria();

    //Buscar
    Categoria buscarCategoria(Long id);

    //Crear
    Categoria crearCategoria(Categoria categoria);

    //Eliminar
    public int eliminarCategoria(Long id);

}
