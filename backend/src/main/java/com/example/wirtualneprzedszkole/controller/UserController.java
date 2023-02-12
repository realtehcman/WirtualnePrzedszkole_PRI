package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.RestartPasswordDto;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.service.StorageServiceImpl;
import com.example.wirtualneprzedszkole.service.UserManagementService;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UserController {
    private final UserService userService;
    private final UserManagementService userManagementService;
    private final StorageServiceImpl storageService;

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

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER', 'ROLE_PARENT')")
    @PutMapping("/current_user")
    public UserDto updateCurrentUser(@Valid @RequestBody UserDto userDto) {
        return UserMapper.mapToDto(userManagementService.updateUser(UserMapper.mapToDao(userDto)));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER', 'ROLE_PARENT')")
    @PatchMapping("/add_avatar")
    public UserDto addAvatar(@RequestParam("file") MultipartFile file) {
        User currentUser = userService.getCurrentUser();
        String avatarName = storageService.addAvatar(file, currentUser.getEmail());
        return UserMapper.mapToUserDto(userService.addAvatar(currentUser, avatarName));
    }
}
