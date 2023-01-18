package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.FolderMapper;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.model.dto.FolderDto;
import com.example.wirtualneprzedszkole.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/folder")
public class FolderController {

    private final FolderService folderService;

    @PostMapping
    public FolderDto createFolder(@RequestBody FolderDto folderDto) {
        return FolderMapper.FolderMapToDto(folderService.createFolder(FolderMapper.FolderDtoMapToFolder(folderDto)));
    }

    @GetMapping("{id}")
    public FolderDto getFolder(@PathVariable Long id) {
        return FolderMapper.FolderMapToDto(folderService.getFolder(id));
    }

    @GetMapping("/all")
    public List<FolderDto> getAllFolders() {
        return FolderMapper.FolderMapToDto(folderService.getAllFolders());
    }

    @Transactional
    @DeleteMapping("{folderId}")
    public ResponseEntity deleteFolder(@PathVariable Long folderId) {
        if (!folderService.deleteFolder(folderId,  false)) {
            throw new RuntimeException("Could not delete the folder");
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @GetMapping("/className/{className}")
    public List<FolderDto> getClassFolders(@PathVariable String className) {
        return FolderMapper.FolderMapToDto(folderService.getClassFolders(className));
    }

    @GetMapping("/getSubFolders/{className}")
    public List<FolderDto> getClassSubFolders(@PathVariable String className) {
        return FolderMapper.FolderMapToDto(folderService.getClassSubFolders(className));
    }
}
