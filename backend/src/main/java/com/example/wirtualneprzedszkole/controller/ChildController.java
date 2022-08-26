package com.example.wirtualneprzedszkole.controller;

//import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/child")
public class ChildController {
    private final ChildService childService;

    @GetMapping("{id}")
    public ChildDto getChild(@PathVariable Long id) {
        return ChildMapper.mapToChildDto(childService.getChild(id));
    }

    @GetMapping
    public List<ChildDto> getChildren() {
        return ChildMapper.mapToDto(childService.getChildren());
    }

    @PostMapping
    public Child addChild(@Valid @RequestBody ChildDto childDto) {
        return childService.addChild(ChildMapper.mapToChildDao(childDto));
    }
}
