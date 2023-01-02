package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/folder")
public class FolderController {

    private final FolderService folderService;

    @PostMapping
    public Folder createFolder(@RequestBody Folder folder) {
        return folderService.createFolder(folder);
    }

    @GetMapping("{id}")
    public Folder getFolder(@PathVariable Long id) {
        return folderService.getFolder(id);
    }

    @GetMapping("/all")
    public List<Folder> getAllFolders() {
        return folderService.getAllFolders();
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteFolder(@PathVariable Long id) {
        if (!folderService.deleteFolder(id)) {
            throw new RuntimeException("Could not delete the folder");
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
