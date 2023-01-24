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
import java.util.List;
import java.util.Set;

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
       /* emailSenderService.sendEmail(user.getEmail(), "Hasło w serwsisie Wirtualne przedszkole",
                "Twoje Hasło: " + user.getPassword()); */
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepo.save(user);
    }

    @Transactional
    public User updateUser(User user) {
        User userEdited = userRepo.findById(user.getId()).orElseThrow();
        userEdited.setEmail(user.getEmail());
        userEdited.setAddress(user.getAddress());
        userEdited.setPhoneNumber(user.getPhoneNumber());
        userEdited.setPicture(user.getPicture());
        userEdited.setLastName(user.getLastName());
        userEdited.setName(user.getName());
        return userEdited;
    }

    @Transactional
    public User addChildToUser(Long userId, Long childId) {
        User userEdited = userRepo.findById(userId).orElseThrow();
        Child child = childService.getChild(childId);
        if (child.getParents().contains(userEdited)) {
            throw new UserAlreadyExistException("Ten rodzic jest już przipsany do tego dziecka");
        }/* else if (child.getParents().size() > 1) {
            throw new TooManyUsersAssignedException("Już przipsano dwa rodzica do tego dziecka");
        }*/
        userEdited.getChildren().add(child);
        return userEdited;
    }

    @Transactional
    public User addClassToTeacher(Long userId, Long classId) {
        User userEdited = userRepo.findById(userId).orElseThrow();
        Class aClass = classService.getClass(classId);
        if (aClass.getTeachers().contains(userEdited)) {
            throw new UserAlreadyExistException("Ten nauczyciel jest już przypisany do tej klasy");
        }
        userEdited.getClasses().add(aClass);
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
}
