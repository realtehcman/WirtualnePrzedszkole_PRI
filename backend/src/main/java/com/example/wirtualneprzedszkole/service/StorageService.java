package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StorageService {

    //void init();

    FileData store(MultipartFile file, Long folderId/*, String folder*/);
    boolean delete(String fileName, Long folderId);
    boolean deleteAllService(Long folderId);


    //Stream<Path> loadAll();

    //Path load(String filename);

    Resource loadAsResource(String filename, Long folderId);

    List<Resource> loadAsResources(Long folderId);

    //void deleteAll();

}