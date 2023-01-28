package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.repository.FileDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
