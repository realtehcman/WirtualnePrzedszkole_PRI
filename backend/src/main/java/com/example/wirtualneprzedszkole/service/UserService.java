package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.PasswordResetToken;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.repository.PasswordResetTokenRepo;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final EmailSenderServiceImpl emailSenderService;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetTokenService passwordResetTokenService;


    public void restartPassword(String email) {
        User user = userRepo.findByEmail(email);

        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken(token, user, LocalDateTime.now(),
                 LocalDateTime.now().plusMinutes(15));
        passwordResetTokenService.saveToken(passwordResetToken);
        emailSenderService.sendEmail(user.getEmail(), "Wirtualne przedszkole - Reset hasła",
                "Kliknij w podany link aby dokonać zmiany hasła. http://localhost:8080/api/user/restart?token=" + token);
    }

    @Transactional
    public void changePassword(String password, String token) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PasswordResetToken passwordResetToken = passwordResetTokenService.getToken(token).orElseThrow();
        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(password));
        passwordResetToken.setConfirmed(LocalDateTime.now());
    }

    public User getCurrentUser(String email) {
        return userRepo.findByEmail(email);
    }
}
