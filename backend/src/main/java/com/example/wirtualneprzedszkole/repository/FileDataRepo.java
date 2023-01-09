package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileDataRepo extends JpaRepository<FileData, Long> {
    FileData findByHash(String hash); //https://wesome.org/spring-data-jpa-findby-equals
    FileData findByPath(String filePath);

    List<FileData> deleteAllByFolderId(Long folderId);
}
