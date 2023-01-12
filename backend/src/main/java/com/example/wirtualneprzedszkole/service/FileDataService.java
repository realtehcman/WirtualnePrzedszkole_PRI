package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.repository.FileDataRepo;
import com.example.wirtualneprzedszkole.repository.FolderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FileDataService {
    private final FileDataRepo fileDataRepo;

    public FileData getFile(String path) {
        return fileDataRepo.findByPath(path);
    }
}
