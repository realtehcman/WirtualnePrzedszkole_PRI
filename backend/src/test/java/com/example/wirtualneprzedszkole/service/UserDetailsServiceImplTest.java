package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.AppUserDetails;
import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.NoSuchElementException;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserDetailsServiceImplTest {
    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private UserDetailsServiceImpl userDetailsService;

    @Test
    public void loadUserByUsername_ShouldReturnUserDetails_WhenUserExists() {
        User user = new User();
        user.setEmail("test@email.com");
        user.setPassword("password");
        user.setRole(UserRole.PARENT);
        when(userRepo.findByEmail("test@email.com")).thenReturn(Optional.of(user));

        UserDetails userDetails = userDetailsService.loadUserByUsername("test@email.com");

        assertThat(userDetails).isInstanceOf(AppUserDetails.class);
        assertThat(userDetails.getUsername()).isEqualTo("test@email.com");
        assertThat(userDetails.getPassword()).isEqualTo("password");
        assertThat(userDetails.getAuthorities()).hasSize(1);
    }

    @Test
    public void loadUserByUsername_ShouldThrowUsernameNotFoundException_WhenUserNotExists() {
        when(userRepo.findByEmail("test@email.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userDetailsService.loadUserByUsername("test@email.com"))
                .isInstanceOf(NoSuchElementException.class);
    }
}
