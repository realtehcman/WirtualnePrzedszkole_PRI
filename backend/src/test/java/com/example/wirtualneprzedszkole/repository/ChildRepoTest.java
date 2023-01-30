package com.example.wirtualneprzedszkole.repository;

import com.example.wirtualneprzedszkole.model.dao.Child;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@DataJpaTest
class ChildRepoTest {

    @Autowired
    private ChildRepo childRepository;

    @Test
    void testSaveChild() {
        Child child = Child.builder().name("John").lastName("Doe").build();
        childRepository.save(child);
        assertNotNull(childRepository.findById(child.getId()));
    }

    @Test
    void testFindAllChildren() {
        Child child1 = Child.builder().name("John").lastName("Doe").build();
        childRepository.save(child1);
        Child child2 = Child.builder().name("Jane").lastName("Doe").build();
        childRepository.save(child2);
        assertEquals(2, childRepository.findAll().size());
    }

    @Test
    void testDeleteChild() {
        Child child = Child.builder().name("John").lastName("Doe").build();
        childRepository.save(child);
        childRepository.delete(child);
        assertFalse(childRepository.findById(child.getId()).isPresent());
    }


}