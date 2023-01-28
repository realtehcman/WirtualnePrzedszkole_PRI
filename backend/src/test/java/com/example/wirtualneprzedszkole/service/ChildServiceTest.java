package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.repository.ChildRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ChildServiceTest {

    @Mock
    private ChildRepo childRepo;

    @InjectMocks
    private ChildService childService;

    @Test
    void testGetChild() {
        Child child = Child.builder().id(1L).name("John").lastName("Doe").build();
        when(childRepo.findById(1L)).thenReturn(Optional.of(child));
        Child result = childService.getChild(1L);
        assertEquals(child, result);
    }

    @Test
    void testGetChildren() {
        Child child1 = Child.builder().id(1L).name("John").lastName("Doe").build();
        Child child2 = Child.builder().id(2L).name("Jane").lastName("Doe").build();
        when(childRepo.findAllChildren()).thenReturn(Arrays.asList(child1, child2));
        List<Child> result = childService.getChildren();
        assertEquals(2, result.size());
        assertTrue(result.contains(child1));
        assertTrue(result.contains(child2));
    }

    @Test
    void testAddChild() {
        Child child = Child.builder().name("John").lastName("Doe").build();
        when(childRepo.save(child)).thenReturn(child);
        Child result = childService.addChild(child);
        assertEquals(child, result);
    }

    @Test
    void testUpdateChild() {
        Child child = Child.builder().id(1L).name("John").lastName("Doe").build();
        when(childRepo.findById(1L)).thenReturn(Optional.of(child));
        Child result = childService.updateChild(child);
        assertEquals(child, result);
        verify(childRepo, times(1)).findById(1L);
    }

    @Test
    void testDeleteChild() {
        childService.deleteChild(1L);
        verify(childRepo, times(1)).deleteById(1L);
    }

    @Test
    void testGetChildByClassIn() {
        List<Long> childIds = Arrays.asList(1L, 2L);
        when(childRepo.findAllIdsByClassId(1L)).thenReturn(childIds);
        List<Long> result = childService.getChildByClassIn(1L);
        assertEquals(childIds, result);
    }
}
