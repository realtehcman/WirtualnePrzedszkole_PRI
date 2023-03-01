package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @Query("Select u From User u")
    List<User> findAllUsers(Pageable page);
    List<User> findAllByLastName(String lastName, Pageable page);
    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    @Query("select u from User u where concat(u.name, ' ', u.lastName) IN :userNames")
    List<User> findUsersIn(List<String> userNames);

    List<User> findByRole(UserRole parent);
    Set<User> findUsersByChildrenIdIn(List<Long> childrenIds);

    @Query("select t from User t where t.role = 'TEACHER' ")
    List<User> findAllTeachers(Pageable page);

    @Query("select u from User u where u.role = :userRole")
    List<User> findAllByRole(UserRole userRole);

    @Query("select u from User u where u.email IN :to")
    List<User> findUsersInEmails(List<String> to);
}
