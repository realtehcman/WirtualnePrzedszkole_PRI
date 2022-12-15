package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.AppUserDetails;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepo userRepo;

    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final User user = userRepo.findByEmail(email).orElseThrow();
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }

        return new AppUserDetails(user);
    }

}
