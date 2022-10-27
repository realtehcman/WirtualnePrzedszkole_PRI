package com.example.wirtualneprzedszkole.controller;

//import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.validation.Valid;
import java.util.List;
@EnableWebMvc
@RestController
@RequiredArgsConstructor
@RequestMapping("api/child")
@CrossOrigin(originPatterns =  "http://127.0.0.1:8080/api/users")
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
    public ChildDto addChild(@Valid @RequestBody ChildDto childDto) {
//        childService.getChild();
        return ChildMapper.mapToDto(childService.addChild(ChildMapper.mapToChildDao(childDto)));
    }

    @PutMapping
    public ChildDto updateChild(@Valid @RequestBody ChildDto childDto) {
        return ChildMapper.mapToDto(childService.updateChild(ChildMapper.mapToChildDao(childDto)));
    }

    @DeleteMapping("{id}")
    public void deleteChild(@PathVariable Long id) {
        childService.deleteChild(id);
    }
}

//  @CrossOrigin(originPatterns = "http://192.168.1.9:3000")


