package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.config.RandomPasswordGenerator;
import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.User;
import com.example.wirtualneprzedszkole.model.UserDto;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/users")
public class UserManagementController {
    private final UserService userService;
    /*private final PasswordEncoder passwordEncoder;
    private final RandomPasswordGenerator randomPasswordGenerator;*/


    @GetMapping("{id}")
    public UserDto getUser(@PathVariable Long id) {
        return UserMapper.mapToUserDto(userService.getUser(id));
    }

    @GetMapping("/search/{lastName}")
    public List<UserDto> getUserByLastName(@PathVariable String lastName,
                                           @RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserMapper.mapToUserDto(userService.getUserByLastName(lastName, pageNumber));
    }

    @GetMapping
    public List<UserDto> getAllUser(@RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserMapper.mapToUserDto(userService.getAllUser(pageNumber));
    }

    @PostMapping
    public User addUser(@Valid @RequestBody UserDto userDto) {
        User user = UserMapper.mapToUserDao(userDto);
        /*user.setPassword(randomPasswordGenerator.generatePassayPassword());
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);*/
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
