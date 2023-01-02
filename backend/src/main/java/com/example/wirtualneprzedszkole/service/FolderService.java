package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.exception.ApiRequestConflictException;
import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import com.example.wirtualneprzedszkole.filemanagement.StorageException;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.repository.FolderRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FolderService {
    private final FolderRepo folderRepo;
    private final FileStorageProperties fileStorageProperties;
    private Path fileStorageLocation;

    public Folder createFolder(Folder folder) {
        try {
            fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/" + folder.getPath())
                    .toAbsolutePath().normalize();
            folder.setPath(String.valueOf(fileStorageLocation));

            System.out.println(fileStorageLocation);

            return folderRepo.save(folder);
        } catch (Exception exception) {
            throw new StorageException("Could not create the directory where the uploaded files will be stored.", exception);
        }
    }

    public Folder getFolder(Long id) {
        return folderRepo.findById(id).orElseThrow();
    }

    public List<Folder> getAllFolders() {
        return folderRepo.findAll();
    }

    public boolean deleteFolder(Long id) {
        folderRepo.deleteById(id);
        return true;
    }
}
