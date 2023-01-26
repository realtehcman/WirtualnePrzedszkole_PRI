package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.config.RandomPasswordGenerator;
import com.example.wirtualneprzedszkole.exception.UserAlreadyExistException;
import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static java.util.Collections.emptyList;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserManagementServiceTest {
    @Mock
    private UserRepo userRepo;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private RandomPasswordGenerator randomPasswordGenerator;
    @Mock
    private EmailSenderServiceImpl emailSenderService;
    @Mock
    private ChildService childService;
    @Mock
    private ClassService classService;

    private UserManagementService userManagementService;
    private User user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        userManagementService = new UserManagementService(userRepo, passwordEncoder, randomPasswordGenerator, emailSenderService, childService, classService);
        user = new User();
        user.setId(1L);
        user.setEmail("user@email.com");
        user.setPassword("password");
        user.setName("User");
        user.setLastName("Lastname");
        user.setPhoneNumber("123456789");
        user.setAddress("Address");
        user.setRole(UserRole.PARENT);
    }

    @Test
    public void getUser_ShouldReturnUser() {
        when(userRepo.findById(1L)).thenReturn(Optional.of(user));
        User result = userManagementService.getUser(1L);
        assertEquals(user, result);
    }

    @Test
    public void getUserByLastName_ShouldReturnUserList() {
        List<User> userList = new ArrayList<>();
        userList.add(user);
        when(userRepo.findAllByLastName("Lastname", PageRequest.of(0, UserManagementService.PAGE_SIZE))).thenReturn(userList);
        List<User> result = userManagementService.getUserByLastName("Lastname", 0);
        assertEquals(userList, result);
    }

    @Test
    public void getAllUser_ShouldReturnUserList() {
        List<User> userList = new ArrayList<>();
        userList.add(user);
        when(userRepo.findAllUsers(PageRequest.of(0, UserManagementService.PAGE_SIZE))).thenReturn(userList);
        List<User> result = userManagementService.getAllUser(0);
        assertEquals(userList, result);
    }

    @Test
    public void addUser_ShouldReturnUser() {
        when(randomPasswordGenerator.generatePassayPassword()).thenReturn("randomPassword");
        when(passwordEncoder.encode("randomPassword")).thenReturn("encodedPassword");
        when(userRepo.save(user)).thenReturn(user);
        User result = userManagementService.addUser(user);
        assertEquals(user, result);
    }

    @Test
    public void addUser_ShouldThrowUserAlreadyExistException() {
        when(userRepo.existsByEmail("user@email.com")).thenReturn(true);
        assertThrows(UserAlreadyExistException.class, () -> userManagementService.addUser(user));
    }

    @Test
    void addChildToUserTest() {
        Long userId = 1L;
        Long childId = 1L;
        User user = new User();
        user.setId(userId);
        Child child = new Child();
        child.setId(childId);
        when(userRepo.findById(userId)).thenReturn(Optional.of(user));
        when(childService.getChild(childId)).thenReturn(child);

        userManagementService.addChildToUser(userId, childId);

        verify(userRepo).findById(userId);
        verify(childService).getChild(childId);
        assertEquals(1, user.getChildren().size());
        assertEquals(child, user.getChildren().iterator().next());
    }

    @Test
    void addChildToUserUserAlreadyExistTest() {
        Long userId = 1L;
        Long childId = 1L;
        User user = new User();
        user.setId(userId);
        Child child = Child.builder().parents(List.of(user)).id(childId).build();
        when(userRepo.findById(userId)).thenReturn(Optional.of(user));
        when(childService.getChild(childId)).thenReturn(child);

        assertThrows(UserAlreadyExistException.class, () -> userManagementService.addChildToUser(userId, childId));

        verify(userRepo).findById(userId);
        verify(childService).getChild(childId);
    }

    @Test
    void addChildToUserUserAlreadyExistExceptionTest() {
        Long userId = 2L;
        Long childId = 3L;
        User user = new User();
        user.setId(userId);
        Child child = Child.builder().parents(List.of(user, new User())).id(childId).build();
        when(userRepo.findById(userId)).thenReturn(Optional.of(user));
        when(childService.getChild(childId)).thenReturn(child);

        assertThrows(UserAlreadyExistException.class, () -> userManagementService.addChildToUser(userId, childId));

        verify(userRepo).findById(userId);
        verify(childService).getChild(childId);
    }

    @Test
    void updateUser_validInput_userIsUpdated() {
        User user = User.builder().id(1L).name("John").lastName("Doe").email("johndoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.PARENT).build();
        User updatedUser = User.builder().id(1L).name("Jane").lastName("Doe").email("johndoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.PARENT).build();
        updatedUser.setAddress("123 Main St");
        updatedUser.setPhoneNumber("555-555-5555");
        updatedUser.setPicture("picture.jpg");

        when(userRepo.findById(user.getId())).thenReturn(Optional.of(user));
        addChildToUserUserAlreadyExistExceptionTest();
        User result = userManagementService.updateUser(updatedUser);

        assertEquals(updatedUser.getId(), result.getId());
        verify(userRepo).findById(user.getId());
    }

    @Test
    void updateUser_userDoesNotExist_throwUserNotFoundException() {
        User user = User.builder().id(1L).name("John").lastName("Doe").email("johndoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.PARENT).build();
        when(userRepo.findById(user.getId())).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> userManagementService.updateUser(user));
        verify(userRepo).findById(user.getId());
    }

    @Test
    void whenAddClassToTeacher_thenSuccess() {
        User user = User.builder().id(1L).name("John").lastName("Doe").email("johndoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.TEACHER).build();
        Class aClass = new Class();
        aClass.setId(1L);
        aClass.setName("1");
        when(userRepo.findById(1L)).thenReturn(Optional.of(user));
        when(classService.getClass(1L)).thenReturn(aClass);
        User updatedUser = userManagementService.addClassToTeacher(1L, 1L);
        assertEquals(1, updatedUser.getClasses().size());
        assertTrue(updatedUser.getClasses().contains(aClass));
    }

    @Test
    void whenAddClassToTeacher_thenUserAlreadyExistException() {
        Class aClass = new Class();
        aClass.setId(1L);
        aClass.setName("1");
        User user = User.builder().id(1L).name("John").lastName("Doe").email("johndoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.TEACHER).classes(List.of(aClass)).build();
        when(userRepo.findById(1L)).thenReturn(Optional.of(user));
        when(classService.getClass(1L)).thenReturn(aClass);
        assertNotNull(userManagementService.addClassToTeacher(1L, 1L));
    }

    @Test
    void whenAddClassToTeacher_thenUserNotFoundException() {
        when(userRepo.findById(1L)).thenReturn(Optional.empty());
        assertThrows(NoSuchElementException.class, () -> userManagementService.addClassToTeacher(1L, 1L));
    }

    @Test
    void whenAddClassToTeacher_thenUserNotATeacherException() {
        User user = new User();
        user.setId(1L);
        user.setRole(UserRole.PARENT);
        when(userRepo.findById(1L)).thenReturn(Optional.of(user));
        assertThrows(NullPointerException.class, () -> userManagementService.addClassToTeacher(1L, 1L));
    }

    @Test
    void deleteUser_validInput_shouldDeleteUser() {
        // given
        User user = new User();
        user.setId(1L);

        // when
        userManagementService.deleteUser(user.getId());

        // then
        verify(userRepo, times(1)).deleteById(user.getId());
    }

    @Test
    public void getAllUserByName_shouldReturnUsersWithMatchingNames() {
        List<String> names = Arrays.asList("John Doe");
        User user1 = User.builder().id(1L).name("John").lastName("Doe").email("johndoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.TEACHER).classes(emptyList()).build();
        User user2 = User.builder().id(2L).name("John").lastName("Doe").email("jonedoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.TEACHER).classes(emptyList()).build();
        User user3 = User.builder().id(3L).name("Bob").lastName("Smith").email("bobsmith@email.com").password("AgmedPaS5w0rd!").role(UserRole.TEACHER).classes(emptyList()).build();
        when(userRepo.findUsersIn(any())).thenReturn(List.of(user1, user2));

        List<User> result = userManagementService.getAllUserByName(names);

        assertEquals(2, result.size());
        assertTrue(result.contains(user1));
        assertTrue(result.contains(user2));
    }

    @Test
    public void getAllUserByName_shouldReturnEmptyList_whenNoUsersWithMatchingNamesExist() {
        List<String> names = Arrays.asList("johndoe@email.com");
        User user1 = User.builder().id(1L).name("John").lastName("Doe").email("johndoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.TEACHER).classes(emptyList()).build();
        User user2 = User.builder().id(2L).name("Jane").lastName("Doe").email("janedoe@email.com").password("AgmedPaS5w0rd!").role(UserRole.TEACHER).classes(emptyList()).build();
        when(userRepo.findUsersIn(any())).thenReturn(emptyList());

        List<User> result = userManagementService.getAllUserByName(names);

        assertTrue(result.isEmpty());
    }


}


