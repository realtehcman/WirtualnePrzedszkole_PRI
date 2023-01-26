package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.filemanagement.FileStorageProperties;
import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.repository.FileDataRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

class StorageServiceImplTest {

    @Mock
    private FileStorageProperties fileStorageProperties;

    @Mock
    private FileDataRepo fileDataRepo;

    @Mock
    private FolderService folderService;

    @Mock
    private ArrayList<Path> filePaths;

    @InjectMocks
    private StorageServiceImpl storageService;

    @Mock
    private MultipartFile file;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void store_ShouldThrowApiRequestConflictException_WhenFileDataAlreadyExistsInDB() throws IOException {
        // Given
        Long folderId = 1L;
        when(file.getOriginalFilename()).thenReturn("test.txt");
        when(file.getBytes()).thenReturn("file content".getBytes());
        when(folderService.getFolder(folderId)).thenReturn(Folder.builder().name("test").id(folderId).build());
        FileData expectedFileData = FileData.builder()
                .name("test.txt")
                .path("test/test.txt")
                .hash("hash")
                .folderId(folderId)
                .dateAdded(new Timestamp(Calendar.getInstance().getTimeInMillis()))
                .build();

        when(fileDataRepo.findByPath(expectedFileData.getPath())).thenReturn(expectedFileData);

        // When
        // Then
        assertThrows(RuntimeException.class, () -> storageService.store(file, folderId));
    }

    @Test
    public void store_ShouldThrowApiRequestNotFoundException_WhenFolderDoesNotExist() throws IOException {
        // Given
        Long folderId = 2L;
        when(file.getOriginalFilename()).thenReturn("test.txt");
        when(file.getBytes()).thenReturn("file content".getBytes());
        when(folderService.getFolder(folderId)).thenReturn(null);

        assertThrows(NullPointerException.class, () -> storageService.store(file, folderId));
    }

}



