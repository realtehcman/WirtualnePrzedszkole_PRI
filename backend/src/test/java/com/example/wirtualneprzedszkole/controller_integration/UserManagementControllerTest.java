package com.example.wirtualneprzedszkole.controller_integration;

import com.example.wirtualneprzedszkole.mapper.UserMapper;
import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.model.dto.UserDto;
import com.example.wirtualneprzedszkole.service.UserManagementService;
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

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class UserManagementControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserManagementService userManagementService;

    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN", "TEACHER"})
    void getUserByLastName_ShouldReturnListOfUsers_WhenLastNameIsValid() throws Exception {
        //given
        String lastName = "Smith";
        List<UserDto> usersDto = List.of(new UserDto(), new UserDto());
        when(userManagementService.getUserByLastName(lastName, 0)).thenReturn(usersDto.stream().map(UserMapper::mapToDao).collect(Collectors.toList()));

        //when
        mockMvc.perform(get("/api/users/search/{lastName}", lastName)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));

        //then
        verify(userManagementService, times(1)).getUserByLastName(lastName, 0);
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void getAllUser_ShouldReturnListOfUsers_WhenPageIsValid() throws Exception {
        //given
        int page = 0;
        UserDto usersDto = new UserDto();

        when(userManagementService.getAllUser(page)).thenReturn(List.of(UserMapper.mapToDao(usersDto)));

        //when
        mockMvc.perform(get("/api/users")
                        .param("page", String.valueOf(page))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));

        //then
        verify(userManagementService, times(1)).getAllUser(page);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void addUser_ShouldReturnBadRequest_WhenUserDtoIsInvalid() throws Exception {
        UserDto userDto = UserDto.builder().lastName("").build();
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getUser_ShouldReturnNotFound_WhenUserDoesNotExist() throws Exception {
        when(userManagementService.getUser(anyLong())).thenThrow(new NoSuchElementException("User not found"));
        assertThrows(NestedServletException.class, () -> mockMvc.perform(get("/api/users/1")));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void getUserByLastName_ShouldReturnUsers_WhenUsersExist() throws Exception {
        List<User> users = List.of(
                User.builder().id(1L).name("John").lastName("Doe").password("password").email("johndoe@gmail.com").role(UserRole.ADMIN).build(),
                User.builder().id(2L).name("Jane").lastName("Doe").password("password").email("janedoe@gmail.com").role(UserRole.PARENT).build()
        );
        when(userManagementService.getUserByLastName("Doe", 0)).thenReturn(users);

        mockMvc.perform(get("/api/users/search/Doe"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("John"))
                .andExpect(jsonPath("$[0].lastName").value("Doe"))
                .andExpect(jsonPath("$[0].email").value("johndoe@gmail.com"))
                .andExpect(jsonPath("$[0].role").value("ADMIN"))
                .andExpect(jsonPath("$[1].name").value("Jane"))
                .andExpect(jsonPath("$[1].lastName").value("Doe"))
                .andExpect(jsonPath("$[1].email").value("janedoe@gmail.com"))
                .andExpect(jsonPath("$[1].role").value("PARENT"));

        verify(userManagementService, times(1)).getUserByLastName("Doe", 0);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void updateUser_ShouldReturnBadRequest_WhenUserDtoIsInvalid() throws Exception {
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setName("firstName");
        userDto.setLastName("lastName");

        mockMvc.perform(put("/api/users")
                        .content(objectMapper.writeValueAsString(userDto))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
    @Test
    @WithMockUser(roles = "ADMIN")
    public void deleteUser_ShouldReturnNoContent_WhenUserDeleted() throws Exception {
        mockMvc.perform(delete("/api/users/{id}", 1L))
                .andExpect(status().isOk());
    }

}




