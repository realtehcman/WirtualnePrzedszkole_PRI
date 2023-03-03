package com.example.wirtualneprzedszkole.controller_integration;

import com.example.wirtualneprzedszkole.mapper.FolderMapper;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.model.dto.FolderDto;
import com.example.wirtualneprzedszkole.service.FolderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.NestedServletException;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class FolderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FolderService folderService;

    @Test
    @WithMockUser(roles = "ADMIN")
    void getFolder_ShouldReturnFolderDto_WhenFolderExist() throws Exception {
        Folder folder = Folder.builder().id(1L).name("TestFolder").build();
        FolderDto expected = FolderMapper.FolderMapToDto(folder);

        when(folderService.getFolder(1L)).thenReturn(folder);

        mockMvc.perform(get("/api/folder/1"))
                .andExpect(status().isOk())
                .andExpect(content().json(new ObjectMapper().writeValueAsString(expected)));

        verify(folderService, times(1)).getFolder(1L);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void getAllFolders_ShouldReturnListOfFolderDto_WhenFoldersExist() throws Exception {
        Folder folder1 = new Folder();
        folder1.setName("folder1");
        folder1.setPath("path1");
        Folder folder2 = new Folder();
        folder2.setName("folder2");
        folder2.setPath("path2");
        List<Folder> folders = Arrays.asList(folder1, folder2);

        when(folderService.getAllFolders()).thenReturn(folders);

        mockMvc.perform(get("/api/folder/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("folder1"))
                .andExpect(jsonPath("$[1].path").value("path2"));

        verify(folderService, times(1)).getAllFolders();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void deleteFolder_ShouldReturnBadRequest_WhenFolderIdIsInvalid() throws Exception {
        when(folderService.deleteFolder(anyLong(), anyBoolean())).thenReturn(false);
        assertThrows(NestedServletException.class, () -> mockMvc.perform(delete("/api/folder/1")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void deleteFolder_ShouldReturnBadRequest_WhenFolderIdIsValid() throws Exception {
        when(folderService.deleteFolder(anyLong(), anyBoolean())).thenReturn(true);

        mockMvc.perform(delete("/api/folder/1"))
                .andExpect(status().isOk());
    }
}