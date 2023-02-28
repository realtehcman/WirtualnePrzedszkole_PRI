package com.example.wirtualneprzedszkole.controller;

//import com.example.wirtualneprzedszkole.mapper.ChildMapper;

import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@EnableWebMvc
@RestController
@RequiredArgsConstructor
@RequestMapping("api/child")
public class ChildController {
    private final ChildService childService;
    private final UserService userService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("{id}")
    public ResponseEntity<ChildDto> getChild(@PathVariable Long id) {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(ChildMapper.mapToChildDto(childService.getChild(id)), HttpStatus.OK);
        else if (user.getRole().getAuthority().equals("TEACHER")) {
            Child child = childService.getChild(id);
            Set<Child> teachingChildren = new HashSet<>();
            user.getClasses().forEach(aClass -> teachingChildren.addAll(aClass.getChildren()));
            teachingChildren.addAll(user.getChildren());
            if (teachingChildren.contains(child)) {
                return new ResponseEntity<>(ChildMapper.mapToChildDto(child), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            Child child = childService.getChild(id);
            if (user.getChildren().contains(child)) {
                return new ResponseEntity<>(ChildMapper.mapToChildDto(child), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping
    public ResponseEntity<List<ChildDto>> getChildren() {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(ChildMapper.mapToChildDto(childService.getChildren()), HttpStatus.OK);
        else {
            List<Child> teachingChildren = new ArrayList<>();
            user.getClasses().forEach(aClass -> teachingChildren.addAll(aClass.getChildren()));
            return new ResponseEntity<>(ChildMapper.mapToChildDto(teachingChildren), HttpStatus.OK);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ChildDto addChild(@Valid @RequestBody ChildDto childDto) {
//        childService.getChild();
        if (childDto.getParents() == null)
            return ChildMapper.mapToDto(childService.addChild(ChildMapper.mapToChildDao(childDto)));
        else
            return ChildMapper.mapToChildDto(childService.addChild(ChildMapper.mapToChildDao(childDto)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public ChildDto updateChild(@Valid @RequestBody ChildDto childDto) {
        return ChildMapper.mapToDto(childService.updateChild(ChildMapper.mapToChildDao(childDto)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{id}")
    public void deleteChild(@PathVariable Long id) {
        childService.deleteChild(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/deleteChildFromClass/{childId}")
    public ResponseEntity<ChildDto> deleteTeacherFromClass(@PathVariable Long childId) {
        try{

            return new ResponseEntity<>(ChildMapper.mapToDto(childService.deleteTeacherFromClass(childId))
                    , HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

//  @CrossOrigin(originPatterns = "http://192.168.1.9:3000")


