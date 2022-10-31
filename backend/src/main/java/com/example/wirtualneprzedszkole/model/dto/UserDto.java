package com.example.wirtualneprzedszkole.model.dto;

import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.validation.ValidPhoneNumber;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.List;


@Getter
@Setter
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
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

    private List<ChildDto> children;
    private List<ClassDto> classes;

}
