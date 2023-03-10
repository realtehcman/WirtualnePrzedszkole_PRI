package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import com.example.wirtualneprzedszkole.filemanagement.StorageException;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.repository.FolderRepo;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Set;

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
            //folder.setPath(String.valueOf(fileStorageLocation));

            File directory = new File(fileStorageLocation.toUri());
            if (!directory.exists()) {
                directory.mkdir();
                System.out.println("created folder at" + fileStorageLocation);
                if (StringUtils.countOccurrencesOf(folder.getPath(), "/") > 0) {
                    String pathBeforeLatSlash = folder.getPath().substring(0, folder.getPath().lastIndexOf("/"));
                    Long parentIndex = folderRepo.findByPath(pathBeforeLatSlash).getId();
                    System.out.println("Parent Index: " + parentIndex);
                    folder.setParent(folderRepo.findByPath(pathBeforeLatSlash));
                }
                return folderRepo.save(folder);
            }
            throw new StorageException("Could not create the directory where the uploaded files will be stored.");
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

    public Long getFolderByClassName(String className) {
        return folderRepo.findOneByClassName(className);
    }

    public boolean deleteFolder(Long folderId, boolean isDeleteClass) {
        Folder folder = folderRepo.findById(folderId).orElseThrow();
        fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/" + folder.getPath())
                .toAbsolutePath().normalize();

        System.out.println("Deleting folder at " + fileStorageLocation);

        try {
            FileUtils.deleteDirectory(new File(fileStorageLocation.toUri()));
        } catch (IOException e) {
            throw new RuntimeException("Could not delete the folder" + e);
        }

        if (!isDeleteClass) {
            folderRepo.deleteById(folderId);
        }

        return true;
    }

    public List<Folder> getClassFolders(String className) {
        return folderRepo.findAllByClassName(className);
    }

    public List<Folder> getClassSubFolders(String className) {
        return folderRepo.findClassSubFolders(className);
    }

    public List<Folder> getFolders(Set<String> classes) {
        return folderRepo.findFolderByClasses(classes);
    }
}
