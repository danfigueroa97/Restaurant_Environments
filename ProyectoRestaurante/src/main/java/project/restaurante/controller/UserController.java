/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project.restaurante.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.restaurante.entity.User;
import project.restaurante.service.UserService;


@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getAll(){
        return userService.getUsers();
    }
    
    @GetMapping("/{id}")
    public Optional<User> getById(@PathVariable("id") Long id){
        return userService.getUser(id);
    }
    @PostMapping
    public void saveUpdate(@RequestBody User user){
        userService.saveOrUpdateUser(user);
    }
    
    @DeleteMapping("/{id}")
    public void deleteUpdate(@PathVariable("id") Long id){
        userService.deleteUser(id);
    }
}
