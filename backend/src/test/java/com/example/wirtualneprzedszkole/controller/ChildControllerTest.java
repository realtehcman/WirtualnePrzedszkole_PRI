package com.example.wirtualneprzedszkole.controller;

import com.example.wirtualneprzedszkole.mapper.ChildMapper;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;
import com.example.wirtualneprzedszkole.service.ChildService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static java.util.Collections.emptyList;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ChildControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ChildService childService;

    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @WithMockUser(roles = "ADMIN")
    void getChild_ShouldReturnChild() throws Exception {
        // Given
        Child child = Child.builder().id(1L).name("John").lastName("Doe").parents(emptyList()).build();
        when(childService.getChild(1L)).thenReturn(child);

        // When & Then
        mockMvc.perform(get("/api/child/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getChildren_ShouldReturnChildren() throws Exception {
        // Given
        List<Child> children = Arrays.asList(
                Child.builder().id(1L).name("John").lastName("Doe").parents(emptyList()).build(),
                Child.builder().id(2L).name("Jane").lastName("Doe").parents(emptyList()).build());
        when(childService.getChildren()).thenReturn(children);

        // When & Then
        mockMvc.perform(get("/api/child"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("John"))
                .andExpect(jsonPath("$[0].lastName").value("Doe"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].name").value("Jane"))
                .andExpect(jsonPath("$[1].lastName").value("Doe"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void addChild_ShouldAddChild() throws Exception {
        ChildDto childDto = ChildDto.builder().name("John").lastName("Doe").classId(5L).parents(emptyList()).build();
        String childDtoJson = new ObjectMapper().writeValueAsString(childDto);
        when(childService.addChild(any())).thenReturn(ChildMapper.mapToChildDao(childDto));

        mockMvc.perform(post("/api/child")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(childDtoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.classId").value(5));

        verify(childService, times(1)).addChild(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void addChild_ShouldReturnBadRequest_WhenChildDtoIsInvalid() throws Exception {
        ChildDto childDto = ChildDto.builder().name("").lastName("").classId(1L).parents(null).build();
        String childDtoJson = objectMapper.writeValueAsString(childDto);

        mockMvc.perform(post("/api/child")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(childDtoJson))
                .andExpect(status().isBadRequest());

        verify(childService, times(0)).addChild(ArgumentMatchers.any());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void updateChild_ShouldUpdateChild() throws Exception {
        ChildDto childDto = ChildDto.builder().id(1L).name("Jane").lastName("Doe").classId(1L).parents(emptyList()).build();
        String childDtoJson = objectMapper.writeValueAsString(childDto);
        when(childService.updateChild(any())).thenReturn(ChildMapper.mapToChildDao(childDto));

        mockMvc.perform(put("/api/child")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(childDtoJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Jane"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.classId").value(1))
                .andExpect(jsonPath("$.parents").doesNotExist());

        verify(childService, times(1)).updateChild(ArgumentMatchers.any());
    }

}