package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.dto.RestartPasswordDto;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("/current_user")
    public UserDto getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        return UserMapper.mapToUserDto(userService.getCurrentUser(email));
    }

}