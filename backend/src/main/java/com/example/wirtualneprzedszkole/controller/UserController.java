package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.model.dto.RestartPasswordDto;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UserController {
    private final UserService userService;

    @PatchMapping("/restart")
    public void restartPassword(@RequestBody RestartPasswordDto restartPasswordDto) {
        userService.restartPassword(restartPasswordDto.getEmail());
    }

    @PatchMapping("/change_password")
    public void changePassword(@RequestBody RestartPasswordDto restartPasswordDto) {
        userService.changePassword(restartPasswordDto.getPassword(), restartPasswordDto.getToken());
    }

}
