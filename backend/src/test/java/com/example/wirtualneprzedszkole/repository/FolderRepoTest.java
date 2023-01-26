package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class FolderRepoTest {

    @Autowired
    private FolderRepo folderRepo;

    @Autowired
    private ClassRepo classRepo;

    @Test
    void testSaveFolder() {
        Long id = classRepo.save(new Class()).getId();
        Folder folder = Folder.builder().path("/path/to/folder").className(Long.toString(id)).build();
        folderRepo.save(folder);
        assertNotNull(folderRepo.findById(folder.getId()));
    }

    @Test
    void testFindByPath() {
        Long id = classRepo.save(new Class()).getId();
        Folder folder = Folder.builder().path("/path/to/folder").className(Long.toString(id)).build();
        folderRepo.save(folder);
        Folder foundFolder = folderRepo.findByPath(folder.getPath());
        assertEquals(folder, foundFolder);
    }

    @Test
    void testFindOneByClassName() {
        Long cid = classRepo.save(new Class()).getId();
        Folder folder = Folder.builder().path("/path/to/folder").className(Long.toString(cid)).build();
        folderRepo.save(folder);
        Long id = folderRepo.findOneByClassName(folder.getClassName());
        assertEquals(folder.getId(), id);
    }

    @Test
    void testDeleteByPath() {
        Long id = classRepo.save(new Class()).getId();
        Folder folder = Folder.builder().path("/path/to/folder").className(Long.toString(id)).build();
        folderRepo.save(folder);
        folderRepo.delete(folder);
        assertFalse(folderRepo.findById(folder.getId()).isPresent());
    }

    @Test
    void testUpdateFolderPath() {
        Long id = classRepo.save(new Class()).getId();
        Folder folder = Folder.builder().path("/path/to/folder").className(Long.toString(id)).build();
        folderRepo.save(folder);
        folder.setPath("/new/path/to/folder");
        folderRepo.save(folder);
        Folder updatedFolder = folderRepo.findById(folder.getId()).get();
        assertEquals("/new/path/to/folder", updatedFolder.getPath());
    }

}