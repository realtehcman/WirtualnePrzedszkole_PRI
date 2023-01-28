package com.example.wirtualneprzedszkole.controller;

//import com.example.wirtualneprzedszkole.mapper.ChildMapper;

import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.validation.Valid;
import java.util.List;
@EnableWebMvc
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
        return ChildMapper.mapToChildDto(childService.getChildren());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ChildDto addChild(@Valid @RequestBody ChildDto childDto) {
//        childService.getChild();
        if (childDto.getParents() == null)
            return ChildMapper.mapToDto(childService.addChild(ChildMapper.mapToChildDao(childDto)));
        else
            return ChildMapper.mapToChildDto(childService.addChild(ChildMapper.mapToChildDao(childDto)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping
    public ChildDto updateChild(@Valid @RequestBody ChildDto childDto) {
        return ChildMapper.mapToDto(childService.updateChild(ChildMapper.mapToChildDao(childDto)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("{id}")
    public void deleteChild(@PathVariable Long id) {
        childService.deleteChild(id);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/deleteChildFromClass/{childId}")
    public ResponseEntity<ChildDto> deleteTeacherFromClass(@PathVariable Long childId) {
        try{

            return new ResponseEntity<>(ChildMapper.mapToDto(childService.deleteTeacherFromClass(childId))
                    , HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

//  @CrossOrigin(originPatterns = "http://192.168.1.9:3000")


