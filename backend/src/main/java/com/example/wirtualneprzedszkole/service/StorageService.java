package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import com.example.wirtualneprzedszkole.model.dao.FileData;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.stream.Stream;

public interface StorageService {

    //void init();

    FileData store(MultipartFile file, String folder);

    //Stream<Path> loadAll();

    //Path load(String filename);

    Resource loadAsResource(String filename, Long folderId);

    List<Resource> loadAsResources(Long folderId);

    //void deleteAll();

}