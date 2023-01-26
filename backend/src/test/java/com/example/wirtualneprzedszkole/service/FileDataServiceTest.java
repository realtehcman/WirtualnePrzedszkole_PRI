package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.FileData;
import com.example.wirtualneprzedszkole.repository.FileDataRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FileDataServiceTest {

    @Mock
    private FileDataRepo fileDataRepo;

    @InjectMocks
    private FileDataService fileDataService;

    @Test
    void testGetFile() {
        FileData expectedFile = new FileData();
        when(fileDataRepo.findByPath(any(String.class))).thenReturn(expectedFile);

        FileData actualFile = fileDataService.getFile("test/path");

        assertEquals(expectedFile, actualFile);
    }

    @Test
    void testAddFileDescription() {
        FileData file = new FileData();
        when(fileDataRepo.save(any(FileData.class))).thenReturn(file);

        FileData addedFile = fileDataService.addFileDescription(file);

        assertEquals(file, addedFile);
    }

    @Test
    void testFindById() {
        FileData file = new FileData();
        when(fileDataRepo.findById(any(Long.class))).thenReturn(Optional.of(file));

        FileData foundFile = fileDataService.findById(1L);

        assertEquals(file, foundFile);
    }
}
