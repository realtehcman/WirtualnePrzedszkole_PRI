package com.example.wirtualneprzedszkole.service;

import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.repository.ChildRepo;
import com.example.wirtualneprzedszkole.repository.ClassRepo;
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
public class ClassServiceTest {

    @Mock
    private ClassRepo classRepo;

    @Mock
    private ChildRepo childRepo;

    @InjectMocks
    private ClassService classService;

    @Test
    void testGetClass() {
        Class aclass = Class.builder().id(1L).name("1st grade").description("First grade class").build();
        when(classRepo.findById(1L)).thenReturn(Optional.of(aclass));
        Class result = classService.getClass(1L);
        assertEquals(aclass, result);
    }

    @Test
    void testGetAllClass() {
        Class class1 = Class.builder().id(1L).name("1st grade").description("First grade class").build();
        Class class2 = Class.builder().id(2L).name("2nd grade").description("Second grade class").build();
        when(classRepo.findAllClass()).thenReturn(Arrays.asList(class1, class2));
        List<Class> result = classService.getAllClass();
        assertEquals(2, result.size());
        assertTrue(result.contains(class1));
        assertTrue(result.contains(class2));
    }

//    @Test
//    void testGetClassesWithChildren() {
//        Class class1 = Class.builder().id(1L).name("1st grade").description("First grade class").build();
//        Class class2 = Class.builder().id(2L).name("2nd grade").description("Second grade class").build();
//        Child child1 = Child.builder().id(1L).name("John").lastName("Doe").classId(1L).build();
//        Child child2 = Child.builder().id(2L).name("Jane").lastName("Doe").classId(1L).build();
//        Child child3 = Child.builder().id(3L).name("Bob").lastName("Smith").classId(2L).build();
//        when(classRepo.findAllClass()).thenReturn(Arrays.asList(class1, class2));
//        when(childRepo.findAllByClassIdIn(Arrays.asList(1L, 2L))).thenReturn(Arrays.asList(child1, child2, child3));
//        List<Class> result = classService.getClassesWithChildren();
//        assertEquals(2, result.size());
//        assertTrue(result.contains(class1));
//        assertTrue(result.contains(class2));
//        assertEquals(2, result.get(0).getChildren().size());
//        assertEquals(1, result.get(1).getChildren().size());
//    }

    @Test
    void testAddClass() {
        Class aclass = Class.builder().id(1L).name("1st grade").description("First grade class").build();
        when(classRepo.save(aclass)).thenReturn(aclass);
        Class result = classService.addClass(aclass);
        assertEquals(aclass, result);
    }

    @Test
    void testUpdateClass() {
        Class aclass = Class.builder().id(1L).name("1st grade").description("First grade class").build();
        Class updatedClass = Class.builder().id(1L).name("Kindergarten").description("First grade class").build();
        when(classRepo.findById(1L)).thenReturn(Optional.of(aclass));
        Class result = classService.updateClass(updatedClass);
        assertEquals(updatedClass.getId(), result.getId());
    }

    @Test
    void testDeleteClass() {
        classService.deleteClass(1L);
        verify(classRepo, times(1)).deleteById(1L);
    }


}