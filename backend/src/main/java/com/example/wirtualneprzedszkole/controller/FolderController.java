package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.FolderMapper;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.FolderDto;
import com.example.wirtualneprzedszkole.service.ClassService;
import com.example.wirtualneprzedszkole.service.FolderService;
import com.example.wirtualneprzedszkole.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/folder")
public class FolderController {

    private final FolderService folderService;
    private final UserService userService;
    private final ClassService classService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @PostMapping
    public FolderDto createFolder(@RequestBody FolderDto folderDto) {
        return FolderMapper.FolderMapToDto(folderService.createFolder(FolderMapper.FolderDtoMapToFolder(folderDto)));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("{id}")
    public FolderDto getFolder(@PathVariable Long id) {
        return FolderMapper.FolderMapToDto(folderService.getFolder(id));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("/all")
    public ResponseEntity<List<FolderDto>> getAllFolders() {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getAllFolders()), HttpStatus.OK);
        else if (user.getRole().getAuthority().equals("TEACHER")) {
            Set<String> teacherClasses = user.getClasses().stream().map(Class::getName).collect(Collectors.toSet());
            if (user.getChildren() != null) {
                user.getChildren().forEach(child -> teacherClasses.add(classService.getClass(child.getClassId()).getName()));
            }
            return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getFolders(teacherClasses)), HttpStatus.OK);
        }
        else {
            Set<String> childrenClasses = new HashSet<>();
            user.getChildren().forEach(child -> childrenClasses.add(classService.getClass(child.getClassId()).getName()));
            return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getFolders(childrenClasses)), HttpStatus.OK);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @Transactional
    @DeleteMapping("{folderId}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long folderId) {
        if (!folderService.deleteFolder(folderId,  false)) {
            throw new RuntimeException("Could not delete the folder");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping("/className/{className}")
    public ResponseEntity<List<FolderDto>> getClassFolders(@PathVariable String className) {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassFolders(className)), HttpStatus.OK);
        else {
            List<Class> teacherClasses = user.getClasses();
            if (teacherClasses.stream().anyMatch(teacherClass -> className.equals(teacherClass.getName())))
                return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassFolders(className)), HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping("/getSubFolders/{className}")
    public ResponseEntity<List<FolderDto>> getClassSubFolders(@PathVariable String className) {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassSubFolders(className)), HttpStatus.OK);
        else {
            List<Class> teacherClasses = user.getClasses();
            if (teacherClasses.stream().anyMatch(teacherClass -> className.equals(teacherClass.getName())))
                return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassSubFolders(className)), HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
