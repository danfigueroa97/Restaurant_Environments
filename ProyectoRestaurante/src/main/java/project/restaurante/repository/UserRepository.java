/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project.restaurante.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.restaurante.entity.User;

/**
 *
 * @author Cristian
 */@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
}
