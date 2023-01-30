package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.model.dto.LoginDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class LoginController {

    @PostMapping("api/login")
    public void login(@RequestBody LoginDto loginDto) {
    }
}
