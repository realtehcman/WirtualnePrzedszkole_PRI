package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.PasswordResetToken;
import com.example.wirtualneprzedszkole.repository.PasswordResetTokenRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PasswordResetTokenService {
    private final PasswordResetTokenRepo passwordResetTokenRepo;

    public PasswordResetToken saveToken(PasswordResetToken passwordResetToken) {
        return passwordResetTokenRepo.save(passwordResetToken);
    }

    public Optional<PasswordResetToken> getToken(String token) {
        return passwordResetTokenRepo.findByToken(token);
    }
}
