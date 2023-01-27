package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.PasswordResetToken;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTestFunctional {
    @Mock
    private UserRepo userRepo;
    @Mock
    private EmailSenderServiceImpl emailSenderService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private PasswordResetTokenService passwordResetTokenService;
    @Mock
    private SecurityContextHolder securityContextHolder;

    @InjectMocks
    private UserService userService;

    @Test
    public void restartPassword_ShouldSendEmailWithLinkToChangePassword() {
        String email = "test@test.com";
        User user = new User();
        user.setEmail(email);
        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));

        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setUser(user);
        when(passwordResetTokenService.saveToken(any())).thenReturn(passwordResetToken);

        userService.restartPassword(email);

        verify(emailSenderService, times(1))
                .sendEmail(eq(user.getEmail()), eq("Wirtualne przedszkole - Reset hasła"), contains("Kliknij w podany link aby dokonać zmiany hasła. http://localhost:3000/change/"));
    }

    @Test
    public void changePassword_ShouldChangePasswordForCurrentUser() {
        String password = "password";
        String token = UUID.randomUUID().toString();
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getPrincipal()).thenReturn("anonymousUser");

        User user = new User();
        PasswordResetToken passwordResetToken = mock(PasswordResetToken.class);
        passwordResetToken.setToken(token);

        when(passwordResetToken.getUser()).thenReturn(user);
        when(passwordResetTokenService.getToken(token)).thenReturn(Optional.of(passwordResetToken));

        userService.changePassword(password, token);

        verify(passwordEncoder, times(1)).encode(eq(password));
        assertEquals(passwordEncoder.encode(password), user.getPassword());
    }

    @Test
    public void changePassword_ShouldChangePasswordForGivenToken() {

        String password = "newPassword";
        String token = "token";
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getPrincipal()).thenReturn("anonymousUser");
        User user = new User();
        PasswordResetToken passwordResetToken = mock(PasswordResetToken.class);
        passwordResetToken.setUser(user);
        when(passwordResetTokenService.getToken(token)).thenReturn(Optional.of(passwordResetToken));
        when(passwordEncoder.encode(password)).thenReturn("encodedPassword");

        // when
        when(passwordResetToken.getUser()).thenReturn(user);
        when(passwordResetTokenService.getToken(token)).thenReturn(Optional.of(passwordResetToken));
        userService.changePassword(password, token);

        verify(passwordResetTokenService, times(1)).getToken(token);
        verify(passwordEncoder, times(1)).encode(password);
        assertEquals("encodedPassword", user.getPassword());
    }

    @Test
    public void changePassword_ShouldChangePasswordForAuthenticatedUser() {

        String password = "newPassword";
        User user = new User();
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(authentication.getPrincipal()).thenReturn("anonymousUser");
        when(passwordEncoder.encode(password)).thenReturn("encodedPassword");
        PasswordResetToken passwordResetToken = mock(PasswordResetToken.class);

        when(passwordResetToken.getUser()).thenReturn(user);
        when(passwordResetTokenService.getToken(any())).thenReturn(Optional.of(passwordResetToken));
        userService.changePassword(password, null);

        verify(passwordEncoder, times(1)).encode(password);
        assertEquals("encodedPassword", user.getPassword());
    }

    @Test
    public void getCurrentUser_ShouldReturnUser() {
        User user = new User();
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
        when(userRepo.findByEmail(any())).thenReturn(Optional.of(user));

        User result = userService.getCurrentUser();

        verify(userRepo, times(1)).findByEmail(any());
        assertEquals(user, result);
    }

    @Test
    public void getCurrentUserByEmail_ShouldReturnUser() {
        String email = "email";
        User user = new User();
        when(userRepo.findByEmail(email)).thenReturn(Optional.of(user));

        User result = userService.getCurrentUser(email);

        verify(userRepo, times(1)).findByEmail(email);
        assertEquals(user, result);

    }
}
