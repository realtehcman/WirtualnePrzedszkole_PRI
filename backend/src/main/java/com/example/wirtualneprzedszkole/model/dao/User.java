package com.example.wirtualneprzedszkole.model.dao;

import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.validation.ValidPassword;

import lombok.*;

import javax.persistence.*;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ValidPassword
    private String password;
    private String email;
    private String name;
    private String lastName;
    private String picture;
    private String address;
    private String phoneNumber;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    //private String role;

    @ManyToMany
    @JoinTable(
            name = "parent_child",
            joinColumns = @JoinColumn(name = "parentId"),
            inverseJoinColumns = @JoinColumn(name = "childId"))
    private List<Child> children;

    /*@OneToOne(mappedBy = "user")
    private PasswordResetToken passwordResetToken;*/
}
