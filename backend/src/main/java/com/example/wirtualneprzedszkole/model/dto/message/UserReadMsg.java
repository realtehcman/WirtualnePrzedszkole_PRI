package com.example.wirtualneprzedszkole.model.dto.message;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserReadMsg {
    private String name;
    private String lastName;
    private String email;
    private Boolean isRead;
}
