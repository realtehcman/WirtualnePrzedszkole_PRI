package com.example.wirtualneprzedszkole.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChildWithClassNameDto {
    private Long id;
    private Long classId;
    private String className;
    private String name;
    private String lastName;

    private List<UserDto> parents;

}
