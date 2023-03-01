package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.config.RandomPasswordGenerator;
import com.example.wirtualneprzedszkole.exception.TooManyUsersAssignedException;
import com.example.wirtualneprzedszkole.exception.UserAlreadyExistException;
import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dao.User;
import com.example.wirtualneprzedszkole.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class UserManagementService {
    public static final int PAGE_SIZE = 15;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final RandomPasswordGenerator randomPasswordGenerator;
    private final EmailSenderServiceImpl emailSenderService;
    private final ChildService childService;
    private final ClassService classService;
    private final UserService userService;
    private final StorageServiceImpl storageService;

    public User getUser(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public List<User> getUserByLastName(String lastName, int page) {
        return userRepo.findAllByLastName(lastName, PageRequest.of(page, PAGE_SIZE));
    }

    public List<User> getAllUser(int page) {
        return userRepo.findAllUsers(PageRequest.of(page, PAGE_SIZE));
    }

    public User addUser(User user) {
        if (userRepo.existsByEmail(user.getEmail())) {
            throw new UserAlreadyExistException("Uzytkownik o takim adresie email istnieje");
        }
        user.setPassword(randomPasswordGenerator.generatePassayPassword());
        emailSenderService.sendEmail(user.getEmail(), "Hasło w serwsisie Wirtualne przedszkole",
                "Twoje Hasło: " + user.getPassword());
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepo.save(user);
    }

    @Transactional
    public User updateUser(User user) {
        User userEdited = userRepo.findById(user.getId()).orElseThrow();
        if (userService.getCurrentUser().getRole().getAuthority().equals("ADMIN")) {
            userEdited.setEmail(user.getEmail());
            userEdited.setLastName(user.getLastName());
            userEdited.setName(user.getName());
        }
        userEdited.setAddress(user.getAddress());
        userEdited.setPhoneNumber(user.getPhoneNumber());
        userEdited.setPicture(userEdited.getPicture());
        userEdited.setOpis(user.getOpis());

        return userEdited;
    }

    @Transactional
    public User addChildToUser(Long userId, Long childId) {
        User userEdited = userRepo.findById(userId).orElseThrow();
        Child child = childService.getChild(childId);
        //avoiding null pointer exception. if null, return the empty list
        if (Optional.ofNullable(child.getParents()).orElse(Collections.emptyList()).contains(userEdited)) {
            throw new UserAlreadyExistException("Ten rodzic jest już przipsany do tego dziecka");
        }
        List<Child> childList = new java.util.ArrayList<>(Optional.ofNullable(userEdited.getChildren()).orElse(Collections.emptyList()));
        childList.add(child);
        userEdited.setChildren(childList);
        return userEdited;
    }


    @Transactional
    public User addClassToTeacher(Long userId, Long classId) {
        User userEdited = userRepo.findById(userId).orElseThrow();
        Class aClass = classService.getClass(classId);
        if (Optional.ofNullable(aClass.getTeachers()).orElse(Collections.emptyList()).contains(userEdited)) {
            throw new UserAlreadyExistException("Ten nauczyciel jest już przypisany do tej klasy");
        }
        List<Class> classes = new java.util.ArrayList<>(Optional.ofNullable(userEdited.getClasses()).orElse(Collections.emptyList()));
        classes.add(aClass);
        userEdited.setClasses(classes);
        return userEdited;
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    public List<User> getAllUserByName(List<String> usersName) {
        return userRepo.findUsersIn(usersName);
    }

    public List<User> getAllParents() {
        return userRepo.findByRole(UserRole.PARENT);
    }

    public Set<User> getAllParentsFromClass(List<Long> childrenIds) {
        return userRepo.findUsersByChildrenIdIn(childrenIds);
    }

    public List<User> getAllTeachers(int pageNumber) {
        return userRepo.findAllTeachers(PageRequest.of(pageNumber, PAGE_SIZE));
    }

    @Transactional
    public User deleteTeacherFromClass(Long userId, Long classId) {
        User user = userRepo.findById(userId).orElseThrow();
        Class aClass = classService.getClass(classId);
        user.getClasses().remove(aClass);
        return user;
    }

    @Transactional
    public User addChildrenToUser(Long userId, List<Child> children) {
        User userEdited = userRepo.findById(userId).orElseThrow();
        List<Child> childList = new java.util.ArrayList<>(Optional.ofNullable(userEdited.getChildren()).orElse(Collections.emptyList()));
        for (Child child : children) {
            Child child_ = childService.getChild(child.getId());
            //avoiding null pointer exception. if null, return the empty list
            if (Optional.ofNullable(child_.getParents()).orElse(Collections.emptyList()).contains(userEdited)) {
                throw new UserAlreadyExistException("Ten rodzic jest już przipsany do tego dziecka");
            }
            childList.add(child_);
        }
        userEdited.setChildren(childList);
        return userEdited;
    }

    @Transactional
    public User deleteAvatar(User user) {
        User userEdited = userRepo.findById(user.getId()).orElseThrow();
        storageService.delete(userEdited.getPicture(), -1L);
        userEdited.setPicture(null);
        return userEdited;
    }

    public List<User> getAllByRole(UserRole userRole) {
        return userRepo.findAllByRole(userRole);
    }

    public List<User> getAllUserByEmail(List<String> to) {
        return userRepo.findUsersInEmails(to);
    }
}
