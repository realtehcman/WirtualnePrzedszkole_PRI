package com.example.wirtualneprzedszkole.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginDto {
    private String email;
    private String password;
}
