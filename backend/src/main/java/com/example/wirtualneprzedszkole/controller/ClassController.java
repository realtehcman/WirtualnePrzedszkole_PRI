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
    public Class getClass(@PathVariable Long id) {
        return classService.getClass(id);
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping
    public List<ClassDto> getAllClass() {
        return ClassMapper.mapToGroupDto(classService.getAllClass());
    }

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_TEACHER')")
    @GetMapping("/children")
    public List<Class> getClassesWithChildren() {
        return classService.getClassesWithChildren();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public Class addClass(@Valid @RequestBody ClassDto classDto) {
        return classService.addClass(ClassMapper.mapToGroupDao(classDto));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public Class updateClass(@Valid @RequestBody Class group) {
        return classService.updateClass(group);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{id}")
    public void deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
    }
}
