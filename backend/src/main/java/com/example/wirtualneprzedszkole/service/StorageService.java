package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

public interface StorageService {

    //void init();

    FileData store(MultipartFile file, String folder) throws IOException, SQLIntegrityConstraintViolationException;
    boolean delete(String fileName, Long folderId);
    boolean deleteAllRecursivelyService(Long folderId);


    //Stream<Path> loadAll();

    //Path load(String filename);

    Resource loadAsResource(String filename, Long folderId);

    List<Resource> loadAsResources(Long folderId);

    //void deleteAll();

}