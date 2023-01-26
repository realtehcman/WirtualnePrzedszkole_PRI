package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import com.example.wirtualneprzedszkole.filemanagement.StorageException;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.repository.FolderRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FolderServiceTest {

    private FolderService folderService;

    @Mock
    private FolderRepo folderRepo;

    @Mock
    private FileStorageProperties fileStorageProperties;

    private Folder folder;

    @BeforeEach
    public void setUp() {
        folderService = new FolderService(folderRepo, fileStorageProperties);
        folder = Folder.builder().id(1L).path("/folder/test").build();
    }

    @Test
    public void createFolder_validInput_folderCreated() throws IOException {
        Folder f = Folder.builder().id(1L).build();
        when(fileStorageProperties.getUploadDir()).thenReturn("src/test/resources/folder");
        when(folderRepo.findByPath(any())).thenReturn(f);
        when(folderRepo.save(folder)).thenReturn(folder);
        Folder result = folderService.createFolder(folder);
        assertEquals(folder, result);
        verify(folderRepo, times(1)).save(folder);
    }

    @Test
    public void createFolder_invalidInput_folderNotCreated() {
        when(fileStorageProperties.getUploadDir()).thenReturn("src/test/resources/folder");
        assertThrows(StorageException.class, () -> folderService.createFolder(folder));
    }

    @Test
    public void getFolder_validInput_folderReturned() {
        when(folderRepo.findById(folder.getId())).thenReturn(Optional.of(folder));
        Folder result = folderService.getFolder(folder.getId());
        assertEquals(folder, result);
        verify(folderRepo, times(1)).findById(folder.getId());
    }

    @Test
    public void getFolder_invalidInput_folderNotFound() {
        when(folderRepo.findById(folder.getId())).thenReturn(Optional.empty());
        assertThrows(Exception.class, () -> folderService.getFolder(folder.getId()));
    }
}

