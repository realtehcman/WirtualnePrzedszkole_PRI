package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.UserRole;
import com.example.wirtualneprzedszkole.model.dao.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    @Query("Select u From User u")
    List<User> findAllUsers(Pageable page);
    List<User> findAllByLastName(String lastName, Pageable page);
    Boolean existsByEmail(String email);
    User findByEmail(String email);
    List<User> findByEmailIn(List<String> emails);

    List<User> findByRole(UserRole parent);
    Set<User> findUsersByChildrenIdIn(List<Long> childrenIds);
}
