package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChildRepo extends JpaRepository<Child, Long> {
    @Query("Select c From Child c")
    List<Child> findAllChild();

    List<Child> findAllByClassIdIn(List<Long> ids);

    @Query("Select c.id From Child c where c.classId = :classId")
    List<Long> findAllIdsByClassId(Long classId);

}
