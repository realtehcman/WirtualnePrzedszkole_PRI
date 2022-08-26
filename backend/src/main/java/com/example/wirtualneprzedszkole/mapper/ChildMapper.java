package com.example.wirtualneprzedszkole.mapper;


import com.example.wirtualneprzedszkole.model.dao.Child;
import com.example.wirtualneprzedszkole.model.dto.ChildDto;

import java.util.List;
import java.util.stream.Collectors;

public class ChildMapper {
    private ChildMapper(){}

    public static List<ChildDto> mapToChildDto(List<Child> children) {
        return children.stream()
                .map(ChildMapper::mapToChildDto)
                .collect(Collectors.toList());
    }

    public static ChildDto mapToChildDto(Child child) {
        return ChildDto.builder()
                .id(child.getId())
                .classId(child.getClassId())
                .name(child.getName())
                .lastName(child.getLastName())
                .build();
    }

    public static Child mapToChildDao(ChildDto childDto) {
        return Child.builder()
                .id(childDto.getId())
                .classId(childDto.getClassId())
                .name(childDto.getName())
                .lastName(childDto.getLastName())
                .parents(childDto.getParents())
                .build();
    }

}
