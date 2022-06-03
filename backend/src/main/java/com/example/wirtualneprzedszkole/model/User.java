package com.example.wirtualneprzedszkole.model;

import com.example.wirtualneprzedszkole.validation.ValidPhoneNumber;
import lombok.Getter;
import lombok.Setter;

import com.example.wirtualneprzedszkole.validation.ValidPassword;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.sql.Date;

@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ValidPassword
    private String password;

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

    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date dateOfBirth;

    @NotEmpty(message = "To pole nie może być puste")
    private String role;
}
