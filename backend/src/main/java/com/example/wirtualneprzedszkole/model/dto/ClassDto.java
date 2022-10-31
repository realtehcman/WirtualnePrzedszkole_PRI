package com.example.wirtualneprzedszkole.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ClassDto {
    private Long id;

    @NotEmpty(message = "To pole nie może być puste")
    private String name;

    private String description;

    private List<ChildDto> children;
    private List<UserDto> teachers;
}
