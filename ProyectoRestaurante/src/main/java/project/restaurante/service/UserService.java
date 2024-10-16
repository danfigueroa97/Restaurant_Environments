/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project.restaurante.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.restaurante.entity.User;
import project.restaurante.repository.UserRepository;




@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    
    
    public List<User> getUsers(){
        return userRepository.findAll();
    }    
    
    public Optional<User> getUser(Long id){
        return userRepository.findById(id);
    }
    
    public void saveOrUpdateUser(User user){
        userRepository.save(user);
    }
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
