package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import com.example.wirtualneprzedszkole.filemanagement.StorageException;
import com.example.wirtualneprzedszkole.filemanagement.StorageFileNotFoundException;
import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.repository.FileDataRepo;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
//@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {
    private Path fileStorageLocation;
    private final FileStorageProperties fileStorageProperties;
    private final FileDataRepo fileDataRepo;
    private final FolderService folderService;
    private ArrayList<Path> filePaths;

    // default file path
    public StorageServiceImpl(FileStorageProperties fileStorageProperties, FileDataRepo fileDataRepo, FolderService folderService, ArrayList<Path> filePaths) {
        this.fileDataRepo = fileDataRepo;
        this.fileStorageProperties = fileStorageProperties;
        this.folderService = folderService;
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        this.filePaths = filePaths;

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception exception) {
            throw new StorageException("Could not create the directory where the uploaded files will be stored.", exception);
        }
    }

    // path type like default/folder
    // zastanawiam się nad tabelką w bazie danych zawierającą hash,
    // i dostępność pliku (wszyyscy/klasa/user) ->
    // wtedy wszystkie pliki będą mogły być właściwie w jednym folderze (bo hash da unikalne nazwy,
    // a zapytanie najpierw pójdzie do bazy danych)
    /*public void init () {
        Path folderPath = Paths.get(fileStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        try {
            Files.createDirectories(folderPath);
        } catch (Exception exception) {
            throw new StorageException("Could not create the directory where the uploaded files will be stored.", exception);
        }
    }*/

    public FileData store(MultipartFile file, String folder) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        Optional<String> fileExtension = Optional.of(fileName)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(fileName.lastIndexOf(".") + 1));
        fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/" + folder)
                .toAbsolutePath().normalize();
        try {
            if (fileName.contains("..")) {
                throw new StorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            Path targetLocation;

            targetLocation = this.fileStorageLocation.resolve(DigestUtils.md5DigestAsHex(file.getBytes()) + "." + fileExtension.get());

            FileData fileData = FileData.builder()
                    .name(fileName)
                    .path(targetLocation.toString())
                    .hash(DigestUtils.md5DigestAsHex(file.getBytes()))
                    .build();

            String selectResponseFromDB = String.valueOf(fileDataRepo.findByPath(fileData.getPath()));
            System.out.println("Response " + selectResponseFromDB);
            if (!selectResponseFromDB.equals("null")) {
                throw new SQLIntegrityConstraintViolationException();
            }
            fileDataRepo.save(fileData);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileData;
        } catch (IOException exception) {
            throw new StorageException("Could not store file " + fileName + ". Please try again!", exception);
        } catch (SQLIntegrityConstraintViolationException e) {
            throw new RuntimeException("Sorry! File data already exists in the DB" + e);
        }
    }

    @Override
    public boolean delete(String fileName, Long folderId) {
        try {
            fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/" + folderService.getFolder(folderId).getPath() + "/")
                    .toAbsolutePath().normalize();
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            System.out.println(filePath);

            Files.delete(filePath);

//            String hashName  = fileName.substring(0, fileName.lastIndexOf("."));
            FileData fileData = fileDataRepo.findByPath(filePath.toString());
            fileDataRepo.delete(fileData);

            return true;
        } catch (MalformedURLException exception) {
            throw new StorageFileNotFoundException("FileData not found " + fileName, exception);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteAllService(Long folderId) {
        fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/" + folderService.getFolder(folderId).getPath() + "/")
                .toAbsolutePath().normalize();
        System.out.println(fileStorageLocation);

        try {
            Files.walk(fileStorageLocation).forEach(path -> saveFileNamesToArray(path.toFile()));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        filePaths.forEach(file -> {
            try {
                Files.delete(file);
                String stringFile = file.toString();
                FileData fileData = fileDataRepo.findByPath(stringFile);
                fileDataRepo.delete(fileData);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        filePaths = new ArrayList<Path>();

        return true;
    }

    //method for a get request
    public Resource loadAsResource(String fileName, Long folderId) {
        try {
            fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir() + "/" + folderService.getFolder(folderId).getPath() + "/")
                    .toAbsolutePath().normalize();
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            System.out.println(filePath);
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

    public List<Resource> loadAsResources(Long folderId) {
        List<Resource> resources = new ArrayList<>();
        try (Stream<Path> paths = Files.walk(Paths.get(fileStorageProperties.getUploadDir() + "/" + folderService.getFolder(folderId).getPath())
                .toAbsolutePath().normalize())) {
            List<Path> files = paths.filter(Files::isRegularFile)
                    .collect(Collectors.toList());
            for (Path file : files) {
                Resource resource = new UrlResource(file.normalize().toUri());
                if (resource.exists()) {
                    resources.add(resource);
                } else {
                    throw new StorageFileNotFoundException("FileData not found " + file);
                }
            }

        } catch (IOException exception) {
            exception.printStackTrace();
        }
        return resources;
    }

    private void saveFileNamesToArray(File file) {
        if (file.isDirectory()) {
            System.out.println("Directory: " + file.getAbsolutePath());
        } else {
            System.out.println("File: " + file.getAbsolutePath());
            Path pathToFile = file.toPath();
            filePaths.add(pathToFile);
        }
    }
}
