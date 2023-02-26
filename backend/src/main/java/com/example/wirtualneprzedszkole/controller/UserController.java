package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.*;
import com.example.wirtualneprzedszkole.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UserController {
    private final UserService userService;
    private final UserManagementService userManagementService;
    private final StorageServiceImpl storageService;
    private final ClassService classService;

    @PatchMapping("/restart")
    public void restartPassword(@RequestBody RestartPasswordDto restartPasswordDto, HttpServletRequest request) {
        System.out.println(request.getRequestURL());
        userService.restartPassword(restartPasswordDto.getEmail(), request.getRequestURL().toString());
    }

    @PatchMapping("/change_password")
    public void changePassword(@RequestBody RestartPasswordDto restartPasswordDto) {
        userService.changePassword(restartPasswordDto.getPassword(), restartPasswordDto.getToken());
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("/current_user")
    public UserWithChildClassNameDto getCurrentUser(Authentication authentication) {
        String email = authentication.getName();
        UserDto userDto = UserMapper.mapToUserDto(userService.getCurrentUser(email));
        List<ChildDto> childrenDto = userDto.getChildren();
        HashMap<ChildDto, String> childrenWithClassNames = new HashMap<>();
        for (ChildDto child : childrenDto) {
            String className = "";
            if (child.getClassId() != null)
                className = classService.getClass(child.getClassId()).getName();
            childrenWithClassNames.put(child, className);
        }
        if (childrenDto.size() > 0)
            return UserMapper.mapToUserDtoWIthClassName(userDto, childrenWithClassNames);
        else {
            return UserMapper.mapToUserDtoWIthClassName(userDto);
        }
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

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER', 'ROLE_PARENT')")
    @PatchMapping("/delete_avatar")
    public UserDto deleteAvatar() {
        User currentUser = userService.getCurrentUser();
        return UserMapper.mapToUserDto(userManagementService.deleteAvatar(currentUser));
    }
}
