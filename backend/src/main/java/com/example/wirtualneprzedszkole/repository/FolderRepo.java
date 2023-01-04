package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FolderRepo extends JpaRepository<Folder, Long> {
    Folder findByPath(String path);

    //Optional<Folder> findByClassId(Long classId);

    @Query("select min(f.id) from Folder f where f.className = :className")
    Long findOneByClassName(String className);
}
