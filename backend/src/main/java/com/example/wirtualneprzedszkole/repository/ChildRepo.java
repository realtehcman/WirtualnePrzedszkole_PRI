package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepo extends JpaRepository<Child, Long> {
    @Query("Select c From Child c")
    List<Child> findAllChildren();

    List<Child> findAllByClassIdIn(List<Long> ids);

}
