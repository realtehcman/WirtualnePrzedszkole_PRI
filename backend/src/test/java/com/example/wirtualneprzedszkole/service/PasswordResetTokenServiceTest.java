package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.PasswordResetToken;
import com.example.wirtualneprzedszkole.repository.PasswordResetTokenRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class PasswordResetTokenServiceTest {

    @InjectMocks
    PasswordResetTokenService passwordResetTokenService;

    @Mock
    PasswordResetTokenRepo passwordResetTokenRepo;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void testSaveToken() {
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetTokenService.saveToken(passwordResetToken);
        verify(passwordResetTokenRepo, times(1)).save(passwordResetToken);
    }

    @Test
    void testGetToken() {
        String token = "token";
        Optional<PasswordResetToken> passwordResetToken = Optional.of(new PasswordResetToken());
        when(passwordResetTokenRepo.findByToken(token)).thenReturn(passwordResetToken);
        assertEquals(passwordResetTokenService.getToken(token), passwordResetToken);
    }
}
