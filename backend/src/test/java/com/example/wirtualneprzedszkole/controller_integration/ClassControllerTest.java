package com.example.wirtualneprzedszkole.controller_integration;

import com.example.wirtualneprzedszkole.mapper.ClassMapper;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.Folder;
import com.example.wirtualneprzedszkole.model.dto.ClassDto;
import com.example.wirtualneprzedszkole.service.ClassService;
import com.example.wirtualneprzedszkole.service.FolderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ClassControllerTest {

    @MockBean
    ClassService classService;

    @MockBean
    FolderService folderService;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getClass_ShouldReturnClassDto_WhenClassExist() throws Exception {
        //Arrange
        ClassDto classDto = ClassDto.builder().name("1").children(emptyList()).build();
        when(classService.getClass(1L)).thenReturn(ClassMapper.mapToGroupDao(classDto));

        //Act and Assert
        mockMvc.perform(get("/api/class/1")
                        .with(user("admin").roles("ADMIN"))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("1"));

        verify(classService, times(1)).getClass(1L);
    }

    @Test
    public void getAllClass_ShouldReturnListOfClassDto_WhenClassesExist() throws Exception {
        //Arrange
        List<ClassDto> classDtoList = Arrays.asList(
                ClassDto.builder().name("class1").build(),
                ClassDto.builder().name("class2").build());
        when(classService.getAllClass()).thenReturn(classDtoList.stream().map(ClassMapper::mapToGroupDao).collect(Collectors.toList()));

        //Act and Assert
        mockMvc.perform(get("/api/class")
                        .with(user("admin").roles("ADMIN"))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("class1"))
                .andExpect(jsonPath("$[1].name").value("class2"));
        verify(classService, times(1)).getAllClass();
    }

    @Test
    public void getClassesWithChildren_ShouldReturnListOfClassDto_WhenClassesWithChildrenExist() throws Exception {
        //Arrange
        List<ClassDto> classDtoList = Arrays.asList(
                ClassDto.builder().name("1").children(emptyList()).build(),
                ClassDto.builder().name("2").children(emptyList()).build());
        when(classService.getClassesWithChildren()).thenReturn(classDtoList.stream().map(ClassMapper::mapToGroupDao).collect(Collectors.toList()));

        //Act and Assert
        mockMvc.perform(get("/api/class/children")
                        .with(user("admin").roles("ADMIN"))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void addClass_ShouldReturnClassDto_WhenClassDtoIsValid() throws Exception {
        // arrange
        ClassDto classDto = ClassDto.builder().name("Class 1").build();
        when(classService.addClass(any(Class.class))).thenReturn(ClassMapper.mapToGroupDao(classDto));
        when(folderService.createFolder(any(Folder.class))).thenReturn(new Folder());

        // act
        MvcResult result = mockMvc.perform(post("/api/class")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(classDto))
                        .with(user("admin").roles("ADMIN")))
                .andExpect(status().isOk())
                .andReturn();

        // assert
        verify(classService, times(1)).addClass(any(Class.class));
        verify(folderService, times(3)).createFolder(any(Folder.class));
    }

    @Test
    public void updateClass_ShouldReturnClassDto_WhenClassDtoIsValid() throws Exception {
        // arrange
        ClassDto classDto = ClassDto.builder().name("Class 1").build();
        when(classService.updateClass(any(Class.class))).thenReturn(ClassMapper.mapToGroupDao(classDto));

        // act
        MvcResult result = mockMvc.perform(put("/api/class")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(classDto))
                        .with(user("admin").roles("ADMIN")))
                .andExpect(status().isOk())
                .andReturn();

        // assert
        verify(classService, times(1)).updateClass(any(Class.class));
    }

    @Test
    public void deleteClass_ShouldDeleteClass_WhenClassExists() throws Exception {
        // given
        Class c = Class.builder().name("1").description("Class description").build();
        Class createdClassDto = classService.addClass(c);
        Long classId = 1L;
        Folder folder = new Folder();
        folder.setName(c.getName());
        folder.setPath(c.getName());
        folder.setClassName(c.getName());
        Folder createdFolder = folderService.createFolder(folder);
        when(classService.getClass(any())).thenReturn(c);

        // when
        mockMvc.perform(delete("/api/class/{id}", classId)
                        .with(user("admin").roles("ADMIN"))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

        // then
        assertThat(folderService.getFolderByClassName(c.getName())).isEqualTo(0L);
    }

}