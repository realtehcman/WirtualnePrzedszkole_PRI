package com.example.wirtualneprzedszkole.controller;

//import com.example.wirtualneprzedszkole.mapper.ChildMapper;

import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.model.dto.ChildWithClassNameDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import com.example.wirtualneprzedszkole.service.ClassService;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@EnableWebMvc
@RestController
@RequiredArgsConstructor
@RequestMapping("api/child")
public class ChildController {
    private final ChildService childService;
    private final UserService userService;
    private final ClassService classService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("{id}")
    public ResponseEntity<ChildWithClassNameDto> getChild(@PathVariable Long id) {
        User user = userService.getCurrentUser();
        Child child = childService.getChild(id);
        ChildDto childDto =  ChildMapper.mapToChildDto(child);

        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(ChildMapper.mapToChildWithClassNameDto(childDto, getClassNameForChild(childDto)),
                    HttpStatus.OK);
        else if (user.getRole().getAuthority().equals("TEACHER")) {
            Set<Child> teachingChildren = new HashSet<>();
            user.getClasses().forEach(aClass -> teachingChildren.addAll(aClass.getChildren()));
            teachingChildren.addAll(user.getChildren());
            if (teachingChildren.contains(child)) {
                return new ResponseEntity<>(ChildMapper.mapToChildWithClassNameDto(childDto, getClassNameForChild(childDto)),
                        HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        } else {
            if (user.getChildren().contains(child)) {
                return new ResponseEntity<>(ChildMapper.mapToChildWithClassNameDto(childDto, getClassNameForChild(childDto)),
                        HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping
    public ResponseEntity<List<ChildWithClassNameDto>> getChildren() {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(ChildMapper.mapToChildrenWithClassName(getHashMapChildrenWithClassName(ChildMapper
                    .mapToChildDto(childService.getChildren()))), HttpStatus.OK);
        else {
            List<Child> teachingChildren = new ArrayList<>();
            user.getClasses().forEach(aClass -> teachingChildren.addAll(aClass.getChildren()));
            return new ResponseEntity<>(ChildMapper.mapToChildrenWithClassName(getHashMapChildrenWithClassName(ChildMapper
                    .mapToChildDto(teachingChildren))), HttpStatus.OK);
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

//  @CrossOrigin(originPatterns = "http://192.168.1.9:3000")


