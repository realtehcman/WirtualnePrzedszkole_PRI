package com.example.wirtualneprzedszkole.mapper;


import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ChildMapper {

    private ChildMapper(){}

    public static List<ChildDto> mapToChildDto(List<Child> children) {
        return children.stream()
                .map(ChildMapper::mapToChildDto)
                .collect(Collectors.toList());
    }

    public static List<Child> mapToChildDao(List<ChildDto> children) {
        return children.stream()
                .map(ChildMapper::mapToChildDao)
                .collect(Collectors.toList());
    }

    public static List<ChildDto> mapToDto(List<Child> children) {
        return children.stream()
                .map(ChildMapper::mapToDto)
                .collect(Collectors.toList());
    }

    public static ChildDto mapToChildDto(Child child) {
        return ChildDto.builder()
                .id(child.getId())
                .classId(child.getClassId())
                .name(child.getName())
                .lastName(child.getLastName())
                .parents(UserMapper.mapToDto(child.getParents()))
                .build();
    }

    public static ChildDto mapToDto(Child child) {
        return ChildDto.builder()
                .id(child.getId())
                .classId(child.getClassId())
                .name(child.getName())
                .lastName(child.getLastName())
                //.parents(UserMapper.mapToDto(child.getParents()))
                .build();
    }

    public static Child mapToChildDao(ChildDto childDto) {
        return Child.builder()
                .id(childDto.getId())
                .classId(childDto.getClassId())
                .name(childDto.getName())
                .lastName(childDto.getLastName())
                .parents(Optional.of(childDto.getParents()).orElse(Collections.emptyList()).stream().map(UserMapper::mapToDao).collect(Collectors.toList()))
                .build();
    }
}
