package com.example.wirtualneprzedszkole.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RestartPasswordDto {
    private String email;
    private String password;
    private String token;
}
