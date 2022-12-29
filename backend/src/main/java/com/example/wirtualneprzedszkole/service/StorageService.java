package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {

    //Path init(String folder);

    String store(MultipartFile file, String folder);

    //Stream<Path> loadAll();

    //Path load(String filename);

    Resource loadAsResource(String filename, Long folderId);

    //void deleteAll();

}