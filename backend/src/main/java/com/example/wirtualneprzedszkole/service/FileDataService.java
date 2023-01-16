package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.repository.FileDataRepo;
import com.example.wirtualneprzedszkole.repository.FolderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FileDataService {
    private final FileDataRepo fileDataRepo;

    public FileData getFile(String path) {
        return fileDataRepo.findByPath(path);
    }

    public FileData addFileDescription(FileData file) {
        return fileDataRepo.save(file);
    }

    public FileData findById(Long fileId) {
        return fileDataRepo.findById(fileId).orElseThrow();
    }
}
