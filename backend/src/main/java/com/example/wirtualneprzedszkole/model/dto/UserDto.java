package com.example.wirtualneprzedszkole.model.dto;

import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.validation.ValidPhoneNumber;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;


@Getter
@Setter
@Builder
public class UserDto {
    private final Long id;

    @Email(regexp = ".+@.+\\..+", message = "Nie poprawny format")
    private final String email;

    @NotEmpty(message = "To pole nie może być puste")
    private final String name;

    @NotEmpty(message = "To pole nie może być puste")
    private final String lastName;
    private final String picture;

    @NotEmpty(message = "To pole nie może być puste")
    private final String address;

    @ValidPhoneNumber
    private final String phoneNumber;

    /*@NotEmpty(message = "To pole nie może być puste")*/
    @Enumerated(EnumType.STRING)
    private UserRole role;

    //private String role;
}
