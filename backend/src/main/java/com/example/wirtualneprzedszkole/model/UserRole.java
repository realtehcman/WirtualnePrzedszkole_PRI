package com.example.wirtualneprzedszkole.model;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    PARENT, TEACHER, ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }
}
