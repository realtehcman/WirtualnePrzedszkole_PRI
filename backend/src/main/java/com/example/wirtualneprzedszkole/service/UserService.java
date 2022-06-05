package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.User;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;

    public User getUser(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public List<User> getUserByLastName(String lastName) {
        return userRepo.findAllByLastName(lastName);
    }

    public List<User> getAllUser() {
        return userRepo.findAll();
    }

    public User addUser(User user) {
        return userRepo.save(user);
    }

    @Transactional
    public User updateUser(User user) {
        User userEdited = userRepo.findById(user.getId()).orElseThrow();
        userEdited.setEmail(user.getEmail());
        return userEdited;
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

}
