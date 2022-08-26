package com.example.wirtualneprzedszkole.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Getter
@Setter
@Builder
public class ClassDto {
    private Long id;

    @NotEmpty(message = "To pole nie może być puste")
    private String name;

    private String description;

    private List<ChildDto> children;
    private List<UserDto> teachers;
}
