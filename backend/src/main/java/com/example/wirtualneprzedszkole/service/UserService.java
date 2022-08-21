package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.config.RandomPasswordGenerator;
import com.example.wirtualneprzedszkole.exception.UserAlreadyExistException;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    public static final int PAGE_SIZE = 15;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final RandomPasswordGenerator randomPasswordGenerator;
    private final EmailSenderServiceImpl emailSenderService;

    public User getUser(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public List<User> getUserByLastName(String lastName, int page) {
        return userRepo.findAllByLastName(lastName, PageRequest.of(page, PAGE_SIZE));
    }

    public List<User> getAllUser(int page) {
        return userRepo.findAllUsers(PageRequest.of(page, PAGE_SIZE));
    }

    public User addUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistException(user.getEmail());
        }
        user.setPassword(randomPasswordGenerator.generatePassayPassword());
        emailSenderService.sendEmail(user.getEmail(), "Hasło w serwsisie Wirtualne przedszkole",
                "Twoje Hasło: " + user.getPassword());
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
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
