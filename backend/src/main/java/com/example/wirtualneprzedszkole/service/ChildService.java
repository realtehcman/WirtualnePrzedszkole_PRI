package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.repository.ChildRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChildService {
    private final ChildRepo childRepo;

    public Child getChild(Long id) {
        return childRepo.findById(id).orElseThrow();
    }

    public List<Child> getChildren() {
        return childRepo.findAllChild();
    }

    public Child addChild(Child child) {
        return childRepo.save(child);
    }
}
