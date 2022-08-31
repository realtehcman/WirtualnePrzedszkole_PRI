package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.repository.ChildRepo;
import com.example.wirtualneprzedszkole.repository.ClassRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClassService {
    private final ClassRepo classRepo;
    private final ChildRepo childRepo;

    public Class getClass(Long id) {
        return classRepo.findById(id).orElseThrow();
    }

    public List<Class> getAllClass() {
        return classRepo.findAllClass();
    }

    public List<Class> getClassesWithChildren() {
        List<Class> classes = classRepo.findAllClass();
        List<Long> ids = classes.stream()
                .map(Class::getId)
                .collect(Collectors.toList());
        List<Child> children = childRepo.findAllByClassIdIn(ids);
        classes.forEach(aclass -> aclass.setChildren(exctractChildren(children, aclass.getId())));
        return classes;
    }

    private List<Child> exctractChildren(List<Child> children, Long id) {
        return children.stream()
                .filter(child -> child.getClassId() == id)
                .collect(Collectors.toList());
    }

    public Class addClass(Class aClass) {
        return classRepo.save(aClass);
    }

    @Transactional
    public Class updateClass(Class aClass) {
        Class classEdited = classRepo.findById(aClass.getId()).orElseThrow();
        classEdited.setName(aClass.getName());
        classEdited.setDescription(aClass.getDescription());
        return classEdited;
    }

    public void deleteClass(Long id) {
        classRepo.deleteById(id);
    }

}
