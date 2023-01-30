package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.ClassMapper;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.model.dto.ClassDto;
import com.example.wirtualneprzedszkole.service.ClassService;
import com.example.wirtualneprzedszkole.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/class")
public class ClassController {
    private final ClassService classService;
    private final FolderService folderService;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping("{id}")
    public ClassDto getClass(@PathVariable Long id) {
        return ClassMapper.mapToGroupDto(classService.getClass(id));
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping
    public List<ClassDto> getAllClass() {
        return ClassMapper.mapToDto(classService.getAllClass());
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping("/children")
    public List<ClassDto> getClassesWithChildren() {
        return ClassMapper.mapToGroupDto(classService.getClassesWithChildren());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ClassDto addClass(@Valid @RequestBody ClassDto classDto) {
        ClassDto receivedClassDto = ClassMapper.mapToDto(classService.addClass(ClassMapper.mapToGroupDao(classDto)));
        Folder folder = new Folder();
        folder.setName(receivedClassDto.getName());
        folder.setPath(receivedClassDto.getName());
        folder.setClassName(receivedClassDto.getName());
        Folder receivedFolder = folderService.createFolder(folder);
        List<String> subFolderNames = List.of("Photos", "Other");
        for (String subFolderName : subFolderNames) {
            Folder subFolder = new Folder();
            subFolder.setName(subFolderName);
            subFolder.setPath(receivedFolder.getName() + "/" + subFolderName);
            subFolder.setClassName(receivedClassDto.getName());
            folderService.createFolder(subFolder);
        }
        return receivedClassDto;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public ClassDto updateClass(@Valid @RequestBody ClassDto classDto) {
        return ClassMapper.mapToDto(classService.updateClass(ClassMapper.mapToGroupDao(classDto)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{id}")
    public void deleteClass(@PathVariable Long id) {
        String className = classService.getClass(id).getName();
        Long folderId = folderService.getFolderByClassName(className);
        if (folderId != null)
            folderService.deleteFolder(folderId, true);
        classService.deleteClass(id);
    }
}
