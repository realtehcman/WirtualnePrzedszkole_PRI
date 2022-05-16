package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepo extends JpaRepository<Parent, Long> {
}
