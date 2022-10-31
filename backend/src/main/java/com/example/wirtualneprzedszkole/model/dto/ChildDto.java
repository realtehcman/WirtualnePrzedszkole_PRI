package com.example.wirtualneprzedszkole.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ChildDto {
    private Long id;
    private Long classId;
    @NotEmpty(message = "To pole nie może być puste")
    private String name;
    @NotEmpty(message = "To pole nie może być puste")
    private String lastName;

    private List<UserDto> parents;
}
