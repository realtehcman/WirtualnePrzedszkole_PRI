package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import com.example.wirtualneprzedszkole.filemanagement.StorageException;
import com.example.wirtualneprzedszkole.filemanagement.StorageFileNotFoundException;
import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.repository.FileDataRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {
    private Path fileStorageLocation;
    private final FileStorageProperties fileStorageProperties;
    private final FileDataRepo fileDataRepo;
    private final FolderService folderService;

    // default file path
    /*public StorageServiceImpl(FileStorageProperties fileStorageProperties, FileDataRepo fileDataRepo) {
        this.fileDataRepo = fileDataRepo;
        this.fileStorageProperties = fileStorageProperties;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception exception) {
            throw new StorageException("Could not create the directory where the uploaded files will be stored.", exception);
        }
    }*/

    // path type like default/folder
    // zastanawiam się nad tabelką w bazie danych zawierającą hash,
    // i dostępność pliku (wszyyscy/klasa/user) ->
    // wtedy wszystkie pliki będą mogły być właściwie w jednym folderze (bo hash da unikalne nazwy,
    // a zapytanie najpierw pójdzie do bazy danych)
    /*public Path init (String folder) {
        Path folderPath = Paths.get(fileStorageProperties.getUploadDir() + "/" + folder)
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(folderPath);
            return folderPath;
        } catch (Exception exception) {
            throw new StorageException("Could not create the directory where the uploaded files will be stored.", exception);
        }
    }*/

    public String store(MultipartFile file, String folder) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        Optional<String> fileExtension = Optional.ofNullable(fileName)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(fileName.lastIndexOf(".") + 1));
        fileExtension.ifPresent(System.out::println);
        fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/" + folder)
                .toAbsolutePath().normalize();
        //String fileType = fileName.

        try {
            if (fileName.contains("..")) {
                throw new StorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path targetLocation;
            if (folder == null)
                targetLocation = this.fileStorageLocation.resolve(fileName);
            else {
                targetLocation = fileStorageLocation.resolve(fileName);
            }

            FileData fileData = FileData.builder()
                    .name(fileName)
                    .path(targetLocation.toString())
                    .hash(DigestUtils.md5DigestAsHex(file.getBytes()))
                    .build();

            fileDataRepo.save(fileData);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException exception) {
            throw new StorageException("Could not store file " + fileName + ". Please try again!", exception);
        }
    }

    public Resource loadAsResource(String fileName, Long folderId) {
        try {
            fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/" + folderService.getFolder(folderId).getPath() + "/")
                    .toAbsolutePath().normalize();
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            //System.out.println(filePath);
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("FileData not found " + fileName);
            }

        } catch (MalformedURLException exception) {
            throw new StorageFileNotFoundException("FileData not found " + fileName, exception);
        }
    }
}
