package com.example.wirtualneprzedszkole.mapper;


import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dto.ClassDto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Collections.emptyList;

public class ClassMapper {
    private ClassMapper(){}

    public static List<ClassDto> mapToGroupDto(List<Class> aClasses) {
        return aClasses.stream()
                .map(ClassMapper::mapToGroupDto)
                .collect(Collectors.toList());
    }

    public static List<ClassDto> mapToDto(List<Class> aClasses) {
        return aClasses.stream()
                .map(ClassMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public static List<Class> mapToClassDao(List<ClassDto> aclassesDtos) {
        return aclassesDtos.stream()
                .map(ClassMapper::mapToGroupDao)
                .collect(Collectors.toList());
    }

    public static ClassDto mapToGroupDto(Class aClass) {
        return ClassDto.builder()
                .id(aClass.getId())
                .name(aClass.getName())
                .description(aClass.getDescription())
                .children(ChildMapper.mapToDto(Optional.ofNullable(aClass.getChildren()).orElse(emptyList())))
//                .parents(UserMapper.mapToDto(child.getParents()))
                .teachers(UserMapper.mapToDto(Optional.ofNullable(aClass.getTeachers()).orElse(emptyList())))
                .build();
    }

    public static ClassDto mapToDto(Class aClass) {
        return ClassDto.builder()
                .id(aClass.getId())
                .name(aClass.getName())
                .description(aClass.getDescription())
                .build();
    }

    public static Class mapToGroupDao(ClassDto classDto) {
        return Class.builder()
                .id(classDto.getId())
                .name(classDto.getName())
                .description(classDto.getDescription())
                .build();
    }
}
