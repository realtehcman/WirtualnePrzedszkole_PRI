package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.ClassMapper;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dto.ClassDto;
import com.example.wirtualneprzedszkole.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/class")
public class ClassController {
    private final ClassService classService;

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
        return ClassMapper.mapToDto(classService.addClass(ClassMapper.mapToGroupDao(classDto)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public ClassDto updateClass(@Valid @RequestBody ClassDto classDto) {
        return ClassMapper.mapToDto(classService.updateClass(ClassMapper.mapToGroupDao(classDto)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{id}")
    public void deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
    }
}
