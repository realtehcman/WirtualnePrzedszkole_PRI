package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.ClassMapper;
import com.example.wirtualneprzedszkole.model.Class;
import com.example.wirtualneprzedszkole.model.dto.ClassDto;
import com.example.wirtualneprzedszkole.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/class")
public class ClassController {
    private final ClassService classService;

    @GetMapping("{id}")
    public ClassDto getClass(@PathVariable Long id) {
        return ClassMapper.mapToGroupDto(classService.getClass(id));
    }

    @GetMapping
    public List<ClassDto> getAllClass() {
        return ClassMapper.mapToGroupDto(classService.getAllClass());
    }

    @GetMapping("/children")
    public List<Class> getClassesWithChildren() {
        return classService.getClassesWithChildren();
    }

    @PostMapping
    public Class addClass(@Valid @RequestBody ClassDto classDto) {
        return classService.addClass(ClassMapper.mapToGroupDao(classDto));
    }

    @PutMapping
    public Class updateClass(@Valid @RequestBody Class group) {
        return classService.updateClass(group);
    }

    @DeleteMapping("{id}")
    public void deleteClass(@PathVariable Long id) {
        classService.deleteClass(id);
    }
}
