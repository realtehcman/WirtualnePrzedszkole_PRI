package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.Class;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class ClassRepoTest {

    @Autowired
    private ClassRepo classRepository;

    @Test
    void testSaveClass() {
        Class c = Class.builder().name("Test Class").description("Test Description").build();
        classRepository.save(c);
        assertNotNull(classRepository.findById(c.getId()));
    }

    @Test
    void testFindAllClasses() {
        Class class1 = Class.builder().name("Test Class 1").description("Test Description 1").build();
        classRepository.save(class1);
        Class class2 = Class.builder().name("Test Class 2").description("Test Description 2").build();
        classRepository.save(class2);
        assertEquals(2, classRepository.findAll().size());
    }

    @Test
    void testDeleteClass() {
        Class c = Class.builder().name("Test Class").description("Test Description").build();
        classRepository.save(c);
        classRepository.delete(c);
        assertFalse(classRepository.findById(c.getId()).isPresent());
    }

    @Test
    void testUpdateClassDescription() {
        Class c = Class.builder().name("Test Class").description("Test Description").build();
        classRepository.save(c);
        c.setDescription("New Description");
        classRepository.save(c);
        Class updatedClass = classRepository.findById(c.getId()).get();
        assertEquals("New Description", updatedClass.getDescription());
    }
}