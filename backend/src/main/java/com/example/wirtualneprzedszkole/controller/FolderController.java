package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.service.FolderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
}
