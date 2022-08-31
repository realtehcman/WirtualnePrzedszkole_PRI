package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import com.example.wirtualneprzedszkole.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/users")
public class UserManagementController {
    private final UserManagementService userManagementService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER')")
    @GetMapping("{id}")
    public UserDto getUser(@PathVariable Long id) {
        return UserMapper.mapToUserDto(userManagementService.getUser(id));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER')")
    @GetMapping("/search/{lastName}")
    public List<UserDto> getUserByLastName(@PathVariable String lastName,
                                           @RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserMapper.mapToUserDto(userManagementService.getUserByLastName(lastName, pageNumber));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping
    public List<UserDto> getAllUser(@RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserMapper.mapToUserDto(userManagementService.getAllUser(pageNumber));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public User addUser(@Valid @RequestBody UserDto userDto) {
        if (userDto.getChildren() == null)
            return userManagementService.addUser(UserMapper.mapToDao(userDto));
        else
            return userManagementService.addUser(UserMapper.mapToUserDao(userDto));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public User updateUser(@Valid @RequestBody User user) {
        return userManagementService.updateUser(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{childId}")
    public User addChildToUser(@PathVariable Long childId, @RequestBody UserDto userDto) {
        return userManagementService.addChildToUser(childId , UserMapper.mapToUserDao(userDto));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Long id) {
        userManagementService.deleteUser(id);
    }
}
