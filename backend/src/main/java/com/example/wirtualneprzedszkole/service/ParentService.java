package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.Parent;
import com.example.wirtualneprzedszkole.repository.ParentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ParentService {
    private final ParentRepo parentRepo;

    public Parent getParent(Long id) {
        return parentRepo.findById(id).orElseThrow();
    }

    public List<Parent> getParentByLastName(String lastName) {
        return parentRepo.findAllByLastName(lastName);
    }

    public List<Parent> getAllParent() {
        return parentRepo.findAll();
    }

    public Parent addParent(Parent parent) {
        return parentRepo.save(parent);
    }

    public void deleteParent(Long id) {
        parentRepo.deleteById(id);
    }

}
