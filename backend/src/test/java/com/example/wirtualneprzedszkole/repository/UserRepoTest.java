package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class UserRepoTest {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ChildRepo childRepo;

    @Test
    void testSaveUser() {
        User user = User.builder().email("test@example.com").password("AgMeDPaSsOwd1").build();
        userRepo.save(user);
        assertNotNull(userRepo.findById(user.getId()));
    }

    @Test
    void testFindAllUsers() {
        User user1 = User.builder().email("test1@example.com").password("AgMeDPaSsOwd1").build();
        userRepo.save(user1);
        User user2 = User.builder().email("test2@example.com").password("AgMeDPaSsOwd1").build();
        userRepo.save(user2);
        Pageable page = PageRequest.of(0, 10);
        List<User> users = userRepo.findAllUsers();
        assertEquals(2, users.size());
    }

    @Test
    void testFindAllByLastName() {
        User user1 = User.builder().email("test1@example.com").password("AgMeDPaSsOwd1!").lastName("Doe").build();
        userRepo.save(user1);
        User user2 = User.builder().email("test2@example.com").password("AgMeDPaSsOwd1").lastName("Doe").build();
        userRepo.save(user2);
        Pageable page = PageRequest.of(0, 10);
        List<User> users = userRepo.findAllByLastName("Doe");
        assertEquals(2, users.size());
    }

    @Test
    void testExistsByEmail() {
        User user = User.builder().email("test@example.com").password("AgMeDPaSsOwd1").build();
        userRepo.save(user);
        assertTrue(userRepo.existsByEmail(user.getEmail()));
    }

    @Test
    void testFindByEmail() {
        User user = User.builder().email("test@example.com").password("AgMeDPaSsOwd1").build();
        userRepo.save(user);
        Optional<User> foundUser = userRepo.findByEmail(user.getEmail());
        assertEquals(user, foundUser.get());
    }

    @Test
    void testFindUsersIn() {
        User user1 = User.builder().name("John").lastName("Doe").email("johndoe@example.com").password("AgMeDPaSsOwd1").build();
        userRepo.save(user1);
        User user2 = User.builder().name("Jane").lastName("Doe").email("janedoe@example.com").password("AgMeDPaSsOwd1").build();
        userRepo.save(user2);
        List<String> userNames = Arrays.asList("John Doe", "Jane Doe");
        List<User> users = userRepo.findUsersIn(userNames);
        assertEquals(2, users.size());
    }


    @Test
    void testFindByRole() {
        User parent = User.builder().email("parent@example.com").password("AgMeDPaSsOwd1").role(UserRole.PARENT).build();
        userRepo.save(parent);
        User teacher = User.builder().email("teacher@example.com").password("AgMeDPaSsOwd1").role(UserRole.TEACHER).build();
        userRepo.save(teacher);
        List<User> parents = userRepo.findByRole(UserRole.PARENT);
        assertEquals(1, parents.size());
        assertEquals(parent, parents.get(0));
    }

    @Test
    void testFindUsersByChildrenIdIn() {
        User parent = User.builder().email("parent@example.com").password("AgMeDPaSsOwd1").role(UserRole.PARENT).build();
        userRepo.save(parent);
        Child child1 = Child.builder().name("Child1").lastName("Doe").build();
        childRepo.save(child1);
        Child child2 = Child.builder().name("Child2").lastName("Doe").build();
        childRepo.save(child2);
        parent.setChildren(Arrays.asList(child1, child2));
        List<Long> childrenIds = Arrays.asList(child1.getId(), child2.getId());
        Set<User> parents = userRepo.findUsersByChildrenIdIn(childrenIds);
        assertEquals(1, parents.size());
    }

    @Test
    void testDeleteUser() {
        User user = User.builder().email("test@example.com").password("AgMeDPaSsOwd1").build();
        userRepo.save(user);
        userRepo.delete(user);
        assertFalse(userRepo.findById(user.getId()).isPresent());
    }

}