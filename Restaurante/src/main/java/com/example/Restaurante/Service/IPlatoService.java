package com.example.Restaurante.Service;

import com.example.Restaurante.Model.Plato;

import java.util.List;

public interface IPlatoService {

    //Listar
    public List<Plato> listarPlato();

    //Buscar
    public Plato buscarPlato(Long id);

    //Crear
    public Plato crearPlato(Plato plato);

    //Eliminar
    public int eliminarPlato(Long id);

}
