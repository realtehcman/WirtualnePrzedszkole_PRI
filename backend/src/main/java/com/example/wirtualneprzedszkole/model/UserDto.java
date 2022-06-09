package com.example.wirtualneprzedszkole.model;

import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class UserDto {
    private final Long id;
    private final String email;
    private final String name;
    private final String lastName;
    private final String picture;
    private final String address;
    private final String phoneNumber;
    private final String role;
}
