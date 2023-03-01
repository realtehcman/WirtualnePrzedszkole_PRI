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
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserWithChildClassNameDto {
    private Long id;

    private String opis;

    @Email(regexp = ".+@.+\\..+", message = "Nie poprawny format")
    private String email;

    @NotEmpty(message = "To pole nie może być puste")
    private String name;

    @NotEmpty(message = "To pole nie może być puste")
    private String lastName;
    private String picture;

    @NotEmpty(message = "To pole nie może być puste")
    private String address;

    @ValidPhoneNumber
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private List<ChildWithClassNameDto> children;
    private List<ChildDto> childrenWithoutClassName;
    private List<ClassDto> classes;

}
