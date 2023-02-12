package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    public List<UserDto> getUserByLastName(@PathVariable String lastName, @RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserMapper.mapToDto(userManagementService.getUserByLastName(lastName, pageNumber));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER')")
    @GetMapping
    public List<UserDto> getAllUser(@RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserMapper.mapToDto(userManagementService.getAllUser(pageNumber));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public UserDto addUser(@Valid @RequestBody UserDto userDto) {
        User user;
        if (userDto.getChildren() == null) {
            user = userManagementService.addUser(UserMapper.mapToDao(userDto));
        }
        else {
            user = userManagementService.addUser(UserMapper.mapToUserDao(userDto));
        }
        return UserMapper.mapToDto(user);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public UserDto updateUser(@Valid @RequestBody UserDto userDto) {
        return UserMapper.mapToDto(userManagementService.updateUser(UserMapper.mapToDao(userDto)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{userId}")
    public UserDto addChildToUser(@PathVariable Long userId, @RequestBody Child child) {
        return UserMapper.mapToUserDto(userManagementService.addChildToUser(userId, child.getId()));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("add_to_class/{classId}")
    public UserDto addClassToTeacher(@PathVariable Long classId, @RequestBody UserDto userDto) {
        return UserMapper.mapToUserDto(userManagementService.addClassToTeacher(userDto.getId(), classId));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable Long id) {
        userManagementService.deleteUser(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/teachers")
    public List<UserDto> getAllTeachers(@RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        return UserMapper.mapToDto(userManagementService.getAllTeachers(pageNumber));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/deleteTeacherFromClass/{teacherId}/{classId}")
    public ResponseEntity<UserDto> deleteTeacherFromClass(@PathVariable Long teacherId, @PathVariable Long classId) {
        try{

            return new ResponseEntity<>(UserMapper.mapToUserDto(userManagementService.deleteTeacherFromClass(teacherId, classId))
                    , HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/addChildrenToUser/{userId}")
    public UserDto addChildrenToUser(@PathVariable Long userId, @RequestBody List<ChildDto> children) {
        return UserMapper.mapToUserDto(userManagementService.addChildrenToUser(userId, ChildMapper.mapToChildDao(children)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/delete_avatar")
    public UserDto deleteAvatar(@RequestBody UserDto userDto) {
        return UserMapper.mapToUserDto(userManagementService.deleteAvatar(UserMapper.mapToDao(userDto)));
    }
}
