package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepo extends JpaRepository<Class, Long> {
    @Query("Select c From Class c")
    List<Class> findAllClass();
}
