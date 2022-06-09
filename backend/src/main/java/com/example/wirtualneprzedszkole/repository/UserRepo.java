package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    List<User> findAllByLastName(String lastName);
}
