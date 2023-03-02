package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.model.dto.UserWithChildClassNameDto;
import com.example.wirtualneprzedszkole.service.ClassService;
import com.example.wirtualneprzedszkole.service.UserManagementService;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/users")
public class UserManagementController {
    private final UserManagementService userManagementService;
    private final UserService userService;
    private final ClassService classService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("{id}")
    public ResponseEntity<UserWithChildClassNameDto> getUser(@PathVariable Long id) {
        User user = userService.getCurrentUser();
        UserDto userDto = UserMapper.mapToUserDto(userManagementService.getUser(id));
        List<ChildDto> childrenDto = userDto.getChildren();
        if (user.getRole().getAuthority().equals("ADMIN")) {
            if (childrenDto.size() > 0)
                return new ResponseEntity<>(UserMapper.mapToUserDtoWIthClassName(userDto, getHashMapChildrenWithClassName(childrenDto)),
                        HttpStatus.OK);
            else
                return new ResponseEntity<>(UserMapper.mapToUserDtoWIthClassName(userDto), HttpStatus.OK);
        }
        else if (user.getRole().getAuthority().equals("TEACHER")) {
            Set<User> users = usersAllowedForTeacher(user);
            if (checkParentIsCurrentUser(id, user, users)) {
                if (childrenDto.size() > 0)
                    return new ResponseEntity<>(UserMapper.mapToUserDtoWIthClassName(userDto, getHashMapChildrenWithClassName(childrenDto)),
                            HttpStatus.OK);
                else
                    return new ResponseEntity<>(UserMapper.mapToUserDtoWIthClassName(userDto), HttpStatus.OK);
            }
        }
        else {
            Set<User> users = new HashSet<>(userManagementService.getAllByRole(UserRole.ADMIN));
            //user.getChildren().forEach(child -> users.addAll(classService.getClass(child.getClassId()).getTeachers()));
            users.addAll(userManagementService.getAllByRole(UserRole.TEACHER));
            if (checkParentIsCurrentUser(id, user, users)) {
                if (childrenDto.size() > 0)
                    return new ResponseEntity<>(UserMapper.mapToUserDtoWIthClassName(userDto, getHashMapChildrenWithClassName(childrenDto)),
                            HttpStatus.OK);
                else
                    return new ResponseEntity<>(UserMapper.mapToUserDtoWIthClassName(userDto), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    private boolean checkParentIsCurrentUser(@PathVariable Long id, User user, Set<User> users) {
        user.getChildren().forEach(child -> child.getParents().forEach(parent -> {
            if (!parent.equals(user)) users.add(parent);
        }));
        return users.contains(userManagementService.getUser(id));
    }

    private Set<User> usersAllowedForTeacher(User user) {
        Set<User> users = new HashSet<>();
        user.getClasses().forEach(aClass -> aClass.getChildren().forEach(child -> users.addAll(child.getParents())));
        users.addAll(userManagementService.getAllByRole(UserRole.TEACHER));
        users.addAll(userManagementService.getAllByRole(UserRole.ADMIN));
        return users;
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER')")
    @GetMapping("/search/{lastName}")
    public List<UserDto> getUserByLastName(@PathVariable String lastName) {
        return UserMapper.mapToDto(userManagementService.getUserByLastName(lastName));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping
    public List<UserDto> getAllUser() {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return UserMapper.mapToDto(userManagementService.getAllUser());
        else if (user.getRole().getAuthority().equals("TEACHER")) {
            return UserMapper.mapToDto(new ArrayList<>(usersAllowedForTeacher(user)));
        }
        else {
            Set<User> users = new HashSet<>(userManagementService.getAllByRole(UserRole.ADMIN));
            //user.getChildren().forEach(child -> users.addAll(classService.getClass(child.getClassId()).getTeachers()));
            users.addAll(userManagementService.getAllByRole(UserRole.TEACHER));
            return UserMapper.mapToDto(new ArrayList<>(users));
        }
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
    public List<UserDto> getAllTeachers() {
        return UserMapper.mapToDto(userManagementService.getAllTeachers());
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

    public HashMap<ChildDto, String> getHashMapChildrenWithClassName(List<ChildDto> childDtoList) {
        HashMap<ChildDto, String> childrenWithClassNames = new HashMap<>();
        childDtoList.forEach(childDto -> {
            String className = getClassNameForChild(childDto);
            childrenWithClassNames.put(childDto, className);
        });

        return childrenWithClassNames;
    }

    public String getClassNameForChild(ChildDto childDto) {
        String className = "";
        if (childDto.getClassId() != null)
            className = classService.getClass(childDto.getClassId()).getName();
        return className;
    }
}
