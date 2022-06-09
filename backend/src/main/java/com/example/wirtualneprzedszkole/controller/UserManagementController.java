package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.UserDtoMapper;
import com.example.wirtualneprzedszkole.model.User;
import com.example.wirtualneprzedszkole.model.UserDto;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/users")
public class UserManagementController {
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    @GetMapping("{id}")
    public UserDto getUser(@PathVariable Long id) {
        return UserDtoMapper.mapToUserDto(userService.getUser(id));
    }

    @GetMapping("/search/{lastName}")
    public List<UserDto> getUserByLastName(@PathVariable String lastName,
                                           @RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserDtoMapper.mapToUserDto(userService.getUserByLastName(lastName, pageNumber));
    }

    @GetMapping
    public List<UserDto> getAllUser(@RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserDtoMapper.mapToUserDto(userService.getAllUser(pageNumber));
    }

    @PostMapping
    public User addUser(@Valid @RequestBody User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userService.addUser(user);
    }

    @PutMapping
    public User updateUser(@Valid @RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
