package com.example.wirtualneprzedszkole.model.dao;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class PasswordResetToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private String token;

    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "userId")
    private User user;

    private LocalDateTime created;

    private LocalDateTime expired;

    private LocalDateTime confirmed;

    public PasswordResetToken(String token, User user, LocalDateTime created, LocalDateTime expired) {
        this.token = token;
        this.user = user;
        this.created = created;
        this.expired = expired;
    }
}
