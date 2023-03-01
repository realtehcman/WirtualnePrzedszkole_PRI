package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface FolderRepo extends JpaRepository<Folder, Long> {
    Folder findByPath(String path);

    //Optional<Folder> findByClassId(Long classId);

    @Query("select min(f.id) from Folder f where f.className = :className")
    Long findOneByClassName(String className);

    List<Folder> findAllByClassName(String className);

    @Query("select f from Folder f where f.name <> :className and f.className = :className")
    List<Folder> findClassSubFolders(String className);

    @Query("select f from Folder f where f.className in :classes")
    List<Folder> findFolderByClasses(Set<String> classes);
}
