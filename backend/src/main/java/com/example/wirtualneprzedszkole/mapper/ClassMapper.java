package com.example.wirtualneprzedszkole.mapper;


import com.example.wirtualneprzedszkole.model.dao.Class;
import com.example.wirtualneprzedszkole.model.dto.ClassDto;

import java.util.List;
import java.util.stream.Collectors;

public class ClassMapper {
    private ClassMapper(){}

    public static List<ClassDto> mapToGroupDto(List<Class> aClasses) {
        return aClasses.stream()
                .map(ClassMapper::mapToGroupDto)
                .collect(Collectors.toList());
    }

    public static ClassDto mapToGroupDto(Class aClass) {
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
                //.teachers(classDto.getTeachers())
                .build();
    }
}
