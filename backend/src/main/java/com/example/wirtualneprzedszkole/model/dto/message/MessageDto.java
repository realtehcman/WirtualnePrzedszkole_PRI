package com.example.wirtualneprzedszkole.model.dto.message;

import com.example.wirtualneprzedszkole.model.dto.UserDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
@Builder
public class MessageDto {
    private Long id;
    private String author;
    private List<UserDto> to;
    private String subject;
    private String content;
    private Timestamp sentDate;
}
