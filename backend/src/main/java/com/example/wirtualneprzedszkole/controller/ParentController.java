package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.model.Parent;
import com.example.wirtualneprzedszkole.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/parents")
public class ParentController {
    private final ParentService parentService;

    @GetMapping("{id}")
    public Parent getParent(@PathVariable Long id) {
        return parentService.getParent(id);
    }
}
