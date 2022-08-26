package com.example.wirtualneprzedszkole.model.dto;

import com.example.wirtualneprzedszkole.model.dao.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Getter
@Setter
@Builder
public class ChildDto {
    private Long id;
    private Long classId;
    @NotEmpty(message = "To pole nie może być puste")
    private String name;
    @NotEmpty(message = "To pole nie może być puste")
    private String lastName;

    //private List<User> parents;
}
