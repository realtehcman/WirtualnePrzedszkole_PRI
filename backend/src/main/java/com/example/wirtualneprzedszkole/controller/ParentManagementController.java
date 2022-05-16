package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.model.Parent;
import com.example.wirtualneprzedszkole.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/parents")
public class ParentManagementController {
    private final ParentService parentService;

    @GetMapping("{id}")
    public Parent getParent(@PathVariable Long id) {
        return parentService.getParent(id);
    }

    @GetMapping("/search/{lastName}")
    public List<Parent> getParentByLastName(@PathVariable String lastName) {
        return parentService.getParentByLastName(lastName);
    }

    @GetMapping
    public List<Parent> getAllParent() {
        return parentService.getAllParent();
    }

    @PostMapping
    public Parent addParent(@RequestBody Parent parent) {
        return parentService.addParent(parent);
    }

    @DeleteMapping("{id}")
    public void deleteParent(@PathVariable Long id) {
        parentService.deleteParent(id);
    }
}
