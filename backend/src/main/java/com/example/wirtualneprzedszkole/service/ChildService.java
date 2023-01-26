package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.repository.ChildRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChildService {
    private final ChildRepo childRepo;

    public Child getChild(Long id) {
        return childRepo.findById(id).orElseThrow();
    }

    public List<Child> getChildren() {
        return childRepo.findAllChildren();
    }

    public Child addChild(Child child) {

        return childRepo.save(child);
    }

    @Transactional
    public Child updateChild(Child child) {
        Child childEdited = childRepo.findById(child.getId()).orElseThrow();
        childEdited.setClassId(child.getClassId());
        childEdited.setName(child.getName());
        childEdited.setLastName(child.getLastName());
        return childEdited;
    }

    public void deleteChild(Long id) {
        childRepo.deleteById(id);
    }

    public List<Long> getChildByClassIn(Long classId) {
        return childRepo.findAllIdsByClassId(classId);
    }

    @Transactional
    public Child deleteTeacherFromClass(Long childId) {
        Child child = childRepo.findById(childId).orElseThrow();
        child.setClassId(null);
        return child;
    }
}
