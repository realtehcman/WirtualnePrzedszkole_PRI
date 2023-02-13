package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.PasswordResetToken;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final EmailSenderServiceImpl emailSenderService;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenService passwordResetTokenService;
    private final ClassService classService;


    public void restartPassword(String email) {
        User user = userRepo.findByEmail(email).orElseThrow();

        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user, LocalDateTime.now(),
                 LocalDateTime.now().plusMinutes(15));
        passwordResetTokenService.saveToken(passwordResetToken);
       /* emailSenderService.sendEmail(user.getEmail(), "Wirtualne przedszkole - Reset hasła",
                "Kliknij w podany link aby dokonać zmiany hasła. http://localhost:8080/api/user/restart?token=" + token);*/
        emailSenderService.sendEmail(user.getEmail(), "Wirtualne przedszkole - Reset hasła",
                "Kliknij w podany link aby dokonać zmiany hasła. http://localhost:3000/change/" + passwordResetToken.getToken());
    }

    @Transactional
    public void changePassword(String password, String token) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication.getPrincipal() != "anonymousUser") {
            User user = getCurrentUser();
            user.setPassword(passwordEncoder.encode(password));
            return;
        }

        PasswordResetToken passwordResetToken = passwordResetTokenService.getToken(token).orElseThrow();
        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(password));
        passwordResetToken.setConfirmed(LocalDateTime.now());
    }

    public User getCurrentUser(String email) {
        return userRepo.findByEmail(email).orElseThrow();
    }

    public User getCurrentUser() {
        return userRepo.findByEmail(SecurityContextHolder.getContext().getAuthentication().getName()).orElseThrow();
    }

    @Transactional
    public User addAvatar(User user, String avatarName) {
        User userEdited = userRepo.findById(user.getId()).orElseThrow();
        userEdited.setPicture(avatarName);
        return userEdited;
    }
}
