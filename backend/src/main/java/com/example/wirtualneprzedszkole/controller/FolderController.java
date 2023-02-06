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

import java.util.List;

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

    @GetMapping("{id}")
    public FolderDto getFolder(@PathVariable Long id) {
        return FolderMapper.FolderMapToDto(folderService.getFolder(id));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @GetMapping("/all")
    public List<FolderDto> getAllFolders() {
        return FolderMapper.FolderMapToDto(folderService.getAllFolders());
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN')")
    @Transactional
    @DeleteMapping("{folderId}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long folderId) {
        if (!folderService.deleteFolder(folderId,  false)) {
            throw new RuntimeException("Could not delete the folder");
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("/className/{className}")
    public ResponseEntity<List<FolderDto>> getClassFolders(@PathVariable String className) {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassFolders(className)), HttpStatus.OK);
        else if (user.getRole().getAuthority().equals("TEACHER")) {
            List<Class> teacherClasses = user.getClasses();
            if (teacherClasses.stream().anyMatch(teacherClass -> className.equals(teacherClass.getName())))
                return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassFolders(className)), HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        else {
            List<Child> userChildren = user.getChildren();
            Long childClassId = classService.getClassByName(className).getId();
            if (userChildren.stream().anyMatch(userChild -> childClassId.equals(userChild.getClassId())))
                return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassFolders(className)), HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_PARENT')")
    @GetMapping("/getSubFolders/{className}")
    public ResponseEntity<List<FolderDto>> getClassSubFolders(@PathVariable String className) {
        User user = userService.getCurrentUser();
        if (user.getRole().getAuthority().equals("ADMIN"))
            return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassSubFolders(className)), HttpStatus.OK);
        else if (user.getRole().getAuthority().equals("TEACHER")) {
            List<Class> teacherClasses = user.getClasses();
            if (teacherClasses.stream().anyMatch(teacherClass -> className.equals(teacherClass.getName())))
                return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassSubFolders(className)), HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        else {
            List<Child> userChildren = user.getChildren();
            Long childClassId = classService.getClassByName(className).getId();
            if (userChildren.stream().anyMatch(userChild -> childClassId.equals(userChild.getClassId())))
                return new ResponseEntity<>(FolderMapper.FolderMapToDto(folderService.getClassSubFolders(className)), HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
}
