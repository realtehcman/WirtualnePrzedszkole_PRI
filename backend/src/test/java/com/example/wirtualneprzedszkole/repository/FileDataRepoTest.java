package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class FileDataRepoTest {

    @Autowired
    private FileDataRepo fileDataRepository;

    @Autowired
    private FolderRepo folderRepo;

    @Test
    void testSaveFileData() {
        FileData fileData = FileData.builder().name("Test File").build();
        fileDataRepository.save(fileData);
        assertNotNull(fileDataRepository.findById(fileData.getId()));
    }

    @Test
    void testFindAllFileData() {
        FileData fileData1 = FileData.builder().name("Test File 1").build();
        fileDataRepository.save(fileData1);
        FileData fileData2 = FileData.builder().name("Test File 2").build();
        fileDataRepository.save(fileData2);
        assertEquals(2, fileDataRepository.findAll().size());
    }

    @Test
    void testDeleteFileData() {
        FileData fileData = FileData.builder().name("Test File").build();
        fileDataRepository.save(fileData);
        fileDataRepository.delete(fileData);
        assertFalse(fileDataRepository.findById(fileData.getId()).isPresent());
    }

    @Test
    void testFindByHash() {
        FileData fileData = FileData.builder().name("Test File").hash("abcd123").build();
        fileDataRepository.save(fileData);
        FileData foundFileData = fileDataRepository.findByHash(fileData.getHash());
        assertEquals(fileData, foundFileData);
    }

    @Test
    void testFindByPath() {
        FileData fileData = FileData.builder().name("Test File").path("/path/to/file").build();
        fileDataRepository.save(fileData);
        FileData foundFileData = fileDataRepository.findByPath(fileData.getPath());
        assertEquals(fileData, foundFileData);
    }

    @Test
    void testDeleteAllByFolderId() {
        Folder folder = Folder.builder().id(100L).build();
        Long id = folderRepo.save(folder).getId();
        FileData fileData1 = FileData.builder().name("Test File 1").folderId(id).build();
        fileDataRepository.save(fileData1);
        FileData fileData2 = FileData.builder().name("Test File 2").folderId(id).build();
        fileDataRepository.save(fileData2);
        fileDataRepository.deleteAllByFolderId(id);
        assertEquals(0, fileDataRepository.findAll().size());
    }


}