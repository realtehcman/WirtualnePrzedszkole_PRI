package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.PasswordResetToken;
import com.example.wirtualneprzedszkole.model.dao.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class PasswordResetTokenRepoTest {

    @Autowired
    private PasswordResetTokenRepo passwordResetTokenRepo;

    @Autowired
    UserRepo userRepo;


    @Test
    void testSavePasswordResetToken() {
        User u = new User();
        u.setPassword("kollZulBlZulBta3oell@anama3ndymrra");
        userRepo.save(u);
        PasswordResetToken token = PasswordResetToken.builder().token("abc123").user(u).build();
        passwordResetTokenRepo.save(token);
        assertNotNull(passwordResetTokenRepo.findById(token.getId()));
    }

    @Test
    void testFindByToken() {
        User u = new User();
        u.setPassword("kollZulBlZulBta3oell@anama3ndymrra");
        userRepo.save(u);
        PasswordResetToken token = PasswordResetToken.builder().token("abc123").user(u).build();
        passwordResetTokenRepo.save(token);
        PasswordResetToken foundToken = passwordResetTokenRepo.findByToken(token.getToken()).get();
        assertEquals(token, foundToken);
    }

    @Test
    void testDeleteByToken() {
        User u = new User();
        u.setPassword("kollZulBlZulBta3oell@anama3ndymrra");
        userRepo.save(u);
        PasswordResetToken token = PasswordResetToken.builder().token("abc123").user(u).build();
        passwordResetTokenRepo.save(token);
        passwordResetTokenRepo.delete(token);
        assertFalse(passwordResetTokenRepo.findById(token.getId()).isPresent());
    }

}