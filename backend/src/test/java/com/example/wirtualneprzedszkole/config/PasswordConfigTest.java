package com.example.wirtualneprzedszkole.config;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class PasswordConfigTest {

    @Test
    public void passwordEncoder_ShouldReturnBCryptPasswordEncoderWithStrengthOf10() {
        PasswordConfig passwordConfig = new PasswordConfig();
        PasswordEncoder encoder = passwordConfig.passwordEncoder();
        assertThat(encoder).isInstanceOf(BCryptPasswordEncoder.class);
    }
}
